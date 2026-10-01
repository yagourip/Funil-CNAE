import { CNAE_DATABASE } from '../data/cnaeDatabase';
import { CnaeItem, FunilRespostas, FunilResultado } from '../types/cnae';

export function processarFunil(respostas: FunilRespostas): FunilResultado {
  const {
    faturamentoEstimadoAnual,
    possuiSocios,
    quantidadeFuncionarios,
    macroSetor,
    tipoOperacao,
    nichoAtividade
  } = respostas;

  // 1. Busca os CNAEs candidatos com base no nicho e palavras-chave
  const query = nichoAtividade.toLowerCase().trim();
  
  let matchingCnaes = CNAE_DATABASE.filter(item => {
    const matchName = item.denominacao.toLowerCase().includes(query);
    const matchKeywords = item.palavrasChave.some(kw => query.includes(kw.toLowerCase()) || kw.toLowerCase().includes(query));
    const matchSector = macroSetor === 'Misto' || item.setor === macroSetor;
    return (matchName || matchKeywords) && (matchSector || query.length > 3);
  });

  // Fallback se nada direto for encontrado
  if (matchingCnaes.length === 0) {
    if (macroSetor === 'Comércio' || tipoOperacao === 'loja_fisica') {
      matchingCnaes = CNAE_DATABASE.filter(c => c.setor === 'Comércio');
    } else if (tipoOperacao === 'digital' || query.includes('software') || query.includes('app') || query.includes('web')) {
      matchingCnaes = CNAE_DATABASE.filter(c => c.codigo.startsWith('62') || c.codigo.startsWith('63'));
    } else {
      matchingCnaes = CNAE_DATABASE.filter(c => c.setor === 'Serviços');
    }
  }

  // Ordena por relevância (se houver correspondência exata de palavra-chave)
  matchingCnaes.sort((a, b) => {
    const aMatch = a.palavrasChave.some(k => query.includes(k.toLowerCase())) ? 1 : 0;
    const bMatch = b.palavrasChave.some(k => query.includes(k.toLowerCase())) ? 1 : 0;
    return bMatch - aMatch;
  });

  const cnaePrincipal: CnaeItem = matchingCnaes[0] || CNAE_DATABASE[0];

  // 2. Busca secundários recomendados
  const secundarioCodigos = cnaePrincipal.cnaesSecundariosRecomendados || [];
  const cnaesSecundarios: CnaeItem[] = CNAE_DATABASE.filter(
    item => secundarioCodigos.includes(item.codigo) && item.codigo !== cnaePrincipal.codigo
  );

  // 3. Avaliação de Porte (MEI vs ME vs EPP)
  const TETO_MEI = 81000;
  const TETO_ME = 360000;
  let porteRecomendado: 'MEI' | 'ME (Microempresa)' | 'EPP (Empresa de Pequeno Porte)' = 'ME (Microempresa)';
  let motivoPorte = '';

  if (faturamentoEstimadoAnual > TETO_ME) {
    porteRecomendado = 'EPP (Empresa de Pequeno Porte)';
    motivoPorte = `Faturamento anual estimado (R$ ${faturamentoEstimadoAnual.toLocaleString('pt-BR')}) superior ao teto de ME (R$ 360.000), enquadrando-se até o teto de R$ 4,8 milhões.`;
  } else if (faturamentoEstimadoAnual > TETO_MEI) {
    porteRecomendado = 'ME (Microempresa)';
    motivoPorte = `Faturamento estimado ultrapassa o limite legal anual do MEI (R$ 81.000). A opção ideal é Microempresa (ME) no Simples Nacional.`;
  } else if (possuiSocios) {
    porteRecomendado = 'ME (Microempresa)';
    motivoPorte = `O MEI não permite ter sócios (deve ser 100% individual). Como haverá sócios, a empresa deve ser constituída como Sociedade Limitada (LTDA) no porte ME.`;
  } else if (quantidadeFuncionarios > 1) {
    porteRecomendado = 'ME (Microempresa)';
    motivoPorte = `O MEI permite contratar no máximo 1 único funcionário recebendo o piso da categoria ou salário mínimo. Com mais colaboradores, deve-se optar por ME.`;
  } else if (!cnaePrincipal.permiteMei) {
    porteRecomendado = 'ME (Microempresa)';
    motivoPorte = `A atividade principal (${cnaePrincipal.codigo} - ${cnaePrincipal.denominacao}) é vedada ao MEI por ser atividade regulamentada ou intelectual. Recomenda-se abrir como SLU (Sociedade Limitada Unipessoal) ou ME.`;
  } else {
    porteRecomendado = 'MEI';
    motivoPorte = `Atividade permitida no MEI, faturamento compatível (< R$ 81.000/ano), sem sócios e com até 1 funcionário. Menor custo tributário e sem burocracia contábil obrigatória.`;
  }

  // 4. Regime e Fator R
  const regimeSugerido = porteRecomendado === 'MEI' 
    ? 'Simples Nacional (MEI)' 
    : (faturamentoEstimadoAnual > 4800000 ? 'Lucro Presumido' : 'Simples Nacional');

  const sujeitoFatorR = cnaePrincipal.sujeitoFatorR;
  const aliquotaEstimada = porteRecomendado === 'MEI' 
    ? 0 // Paga taxa fixa mensal DAS-MEI
    : cnaePrincipal.aliquotaInicial;

  const dispensadoAlvara = cnaePrincipal.grauRisco.includes('Baixo');

  // Observações fiscais detalhadas
  const observacoesFiscais: string[] = [];

  if (porteRecomendado === 'MEI') {
    observacoesFiscais.push(`Taxa mensal fixa DAS-MEI unificada (~R$ 75 a R$ 81/mês) com cobertura previdenciária (INSS do titular) e isenção de IRPJ, CSLL, PIS, COFINS.`);
    if (cnaePrincipal.ocupacaoMei) {
      observacoesFiscais.push(`Ocupação oficial no Portal do Empreendedor: "${cnaePrincipal.ocupacaoMei}".`);
    }
  } else {
    observacoesFiscais.push(`Tributação pelo Simples Nacional no ${cnaePrincipal.anexoSimples} com alíquota inicial de ${cnaePrincipal.aliquotaInicial.toFixed(1)}%.`);
    if (sujeitoFatorR) {
      observacoesFiscais.push(`ALERTA DE FATOR R: Esta atividade pode migrar do Anexo V (15,5%) para o Anexo III (6,0%) caso a despesa com pró-labore e folha de pagamento atinja 28% ou mais do faturamento bruto.`);
    }
  }

  if (cnaePrincipal.exigeInscricaoEstadual) {
    observacoesFiscais.push(`Exige Inscrição Estadual (SEFAZ) para emissão de NF-e e recolhimento de ICMS.`);
  } else {
    observacoesFiscais.push(`Exige apenas Inscrição Municipal (CCM) junto à Prefeitura para emissão de Nota Fiscal de Serviços Eletrônica (NFS-e Nacional).`);
  }

  if (dispensadoAlvara) {
    observacoesFiscais.push(`Atividade classificada como Baixo Risco (Risco A / Nível 1): Isenta de alvará de funcionamento e licenças prévias conforme a Lei da Liberdade Econômica (Lei nº 13.874/2019).`);
  }

  // Checklist de abertura
  const checklistAbertura: string[] = [
    'Consulta Prévia de Viabilidade de Endereço na Prefeitura / Redesim',
    porteRecomendado === 'MEI' 
      ? 'Formalização gratuita e imediata no Portal do Empreendedor (gov.br)' 
      : 'Elaboração do Contrato Social (LTDA ou SLU)',
    cnaePrincipal.exigeInscricaoEstadual ? 'Inscrição Estadual na Secretaria de Fazenda (SEFAZ)' : 'Cadastro de Contribuinte Mobiliário (CCM) na Prefeitura',
    'Emissão de Certificado Digital e-CNPJ (A1)',
    'Adesão e credenciamento no Emissor Nacional de Nota Fiscal de Serviços (NFS-e) ou SEFAZ',
    'Abertura de Conta Bancária Pessoa Jurídica (PJ) separada'
  ];

  return {
    porteRecomendado,
    motivoPorte,
    regimeSugerido,
    cnaePrincipal,
    cnaesSecundarios,
    sujeitoFatorR,
    aliquotaEstimada,
    anexoPrincipal: cnaePrincipal.anexoSimples,
    dispensadoAlvara,
    observacoesFiscais,
    checklistAbertura
  };
}
