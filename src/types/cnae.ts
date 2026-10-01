export type SetorEconomico = 'Serviços' | 'Comércio' | 'Indústria' | 'Construção Civil' | 'Agronegócio';

export type AnexoSimples = 'Anexo I' | 'Anexo II' | 'Anexo III' | 'Anexo IV' | 'Anexo V' | 'Não Optante';

export type GrauRisco = 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)' | 'Médio (Risco B)' | 'Alto (Risco C)';

export interface CnaeItem {
  codigo: string;              // Ex: "6201-5/01"
  codigoPuro: string;          // Ex: "6201501"
  denominacao: string;         // Ex: "Desenvolvimento de programas de computador sob encomenda"
  setor: SetorEconomico;
  permiteMei: boolean;
  ocupacaoMei?: string;        // Ex: "Comerciante...", ou undefined se vedado
  anexoSimples: AnexoSimples;
  aliquotaInicial: number;     // Ex: 6.0
  sujeitoFatorR: boolean;      // Verdadeiro se tributado no Anexo V mas pode migrar pro Anexo III
  grauRisco: GrauRisco;
  orgaoFiscalizador: string;   // Ex: "Prefeitura / ISS", "Receita Estadual / ICMS", "CRA"
  exigeInscricaoEstadual: boolean;
  exigeInscricaoMunicipal: boolean;
  palavrasChave: string[];
  atividadesCompreende: string[];
  atividadesNaoCompreende: string[];
  alertaTributario: string;
  cnaesSecundariosRecomendados: string[];
}

export interface FunilRespostas {
  porteDesejado?: 'MEI' | 'ME' | 'EPP' | 'A Definir';
  faturamentoEstimadoAnual: number; // Em R$
  possuiSocios: boolean;
  quantidadeFuncionarios: number;
  macroSetor: SetorEconomico | 'Misto';
  tipoOperacao: 'digital' | 'loja_fisica' | 'atendimento_externo' | 'prestacao_intelectual' | 'hibrido';
  nichoAtividade: string;
  necessitaLocalProprio: boolean;
}

export interface FunilResultado {
  porteRecomendado: 'MEI' | 'ME (Microempresa)' | 'EPP (Empresa de Pequeno Porte)';
  motivoPorte: string;
  regimeSugerido: 'Simples Nacional' | 'Simples Nacional (MEI)' | 'Lucro Presumido';
  cnaePrincipal: CnaeItem;
  cnaesSecundarios: CnaeItem[];
  sujeitoFatorR: boolean;
  aliquotaEstimada: number;
  anexoPrincipal: AnexoSimples;
  dispensadoAlvara: boolean;
  observacoesFiscais: string[];
  checklistAbertura: string[];
}

export interface BasketItem {
  cnae: CnaeItem;
  tipo: 'principal' | 'secundario';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  modelUsed?: string;
  provider?: 'groq' | 'gemini' | 'local_expert';
}
