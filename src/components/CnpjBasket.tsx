import React, { useState } from 'react';
import { 
  Building2, 
  Trash2, 
  Copy, 
  Check, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  ShieldCheck,
  Printer
} from 'lucide-react';
import { BasketItem, CnaeItem } from '../types/cnae';
import { CNAE_DATABASE } from '../data/cnaeDatabase';

interface CnpjBasketProps {
  basket: BasketItem[];
  onRemoveItem: (codigo: string) => void;
  onSetPrimary: (codigo: string) => void;
  onClearBasket: () => void;
  onLoadPreset: (presetKey: string) => void;
  onAskChatbot: (prompt: string) => void;
}

export const CnpjBasket: React.FC<CnpjBasketProps> = ({
  basket,
  onRemoveItem,
  onSetPrimary,
  onClearBasket,
  onLoadPreset,
  onAskChatbot
}) => {
  const [copied, setCopied] = useState(false);

  const primaryItem = basket.find(b => b.tipo === 'principal');
  const secondaryItems = basket.filter(b => b.tipo === 'secundario');

  // Validação MEI: Se qualquer CNAE for vedado, não pode ser MEI
  const hasIncompatibleMei = basket.some(b => !b.cnae.permiteMei);
  const incompatibleMeiCnaes = basket.filter(b => !b.cnae.permiteMei);

  // Exigência de Inscrição Estadual
  const requiresIE = basket.some(b => b.cnae.exigeInscricaoEstadual);

  // Sujeito ao Fator R
  const hasFactorR = basket.some(b => b.cnae.sujeitoFatorR);

  // Gera texto formatado para envio ao contador ou contrato social
  const generateDossierText = () => {
    let text = `=== DOSSIÊ DE ENQUADRAMENTO CNAE PARA O CNPJ ===\n`;
    text += `Data da Consulta: ${new Date().toLocaleDateString('pt-BR')}\n\n`;

    if (primaryItem) {
      text += `[CNAE PRINCIPAL]\n`;
      text += `Código: ${primaryItem.cnae.codigo}\n`;
      text += `Denominação: ${primaryItem.cnae.denominacao}\n`;
      text += `Setor: ${primaryItem.cnae.setor}\n`;
      text += `Simples Nacional: ${primaryItem.cnae.anexoSimples} (${primaryItem.cnae.aliquotaInicial.toFixed(1)}% inicial)\n`;
      text += `Permite MEI: ${primaryItem.cnae.permiteMei ? 'SIM' : 'NÃO'}\n`;
      if (primaryItem.cnae.ocupacaoMei) text += `Ocupação MEI: ${primaryItem.cnae.ocupacaoMei}\n`;
      text += `\n`;
    }

    if (secondaryItems.length > 0) {
      text += `[CNAES SECUNDÁRIOS (${secondaryItems.length})]\n`;
      secondaryItems.forEach((sec, idx) => {
        text += `${idx + 1}. ${sec.cnae.codigo} - ${sec.cnae.denominacao} (${sec.cnae.anexoSimples})\n`;
      });
      text += `\n`;
    }

    text += `[PARECER DE VIABILIDADE TRIBUTÁRIA]\n`;
    text += `- Porte Sugerido: ${hasIncompatibleMei ? 'ME (Microempresa) - Vedado ao MEI' : 'MEI ou ME'}\n`;
    text += `- Inscrição Estadual (SEFAZ): ${requiresIE ? 'SIM (Obrigatória p/ comércio/indústria)' : 'NÃO (Apenas Inscrição Municipal)'}\n`;
    text += `- Fator R Aplicável: ${hasFactorR ? 'SIM (Acompanhar despesa de folha >= 28%)' : 'NÃO'}\n`;
    text += `\nGerado via Funil CNAE Inteligente.`;

    return text;
  };

  const handleCopy = () => {
    const text = generateDossierText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header editorial */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Cesta de CNAEs do CNPJ
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              Monte a estrutura societária oficial da sua empresa com 1 atividade principal e até várias secundárias. Valide permissão no MEI e copie o dossiê pronto para seu contador.
            </p>
          </div>

          {basket.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado!' : 'Copiar Dossiê'}
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Imprimir
              </button>
              <button
                onClick={onClearBasket}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar Cesta
              </button>
            </div>
          )}
        </div>
      </div>

      {basket.length === 0 ? (
        /* Estado Vazio com Presets Rápidos */
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center shadow-2xs space-y-5">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Sua cesta de CNAEs está vazia
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Use o <strong>Funil de Enquadramento</strong> ou o <strong>Catálogo de CNAEs</strong> para adicionar a atividade principal e atividades secundárias do seu CNPJ.
            </p>
          </div>

          {/* Presets de 1 clique para agilizar */}
          <div className="pt-2 max-w-2xl mx-auto text-left">
            <span className="text-xs font-semibold text-slate-700 block mb-2 text-center">
              Ou carregue um conjunto pré-configurado de sucesso:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'dev_saas',
                  title: 'Dev / SaaS / Tech',
                  desc: '6201-5/01 + 6202-3 + 6209-1',
                  action: () => onLoadPreset('dev_saas')
                },
                {
                  id: 'ecommerce_moda',
                  title: 'E-commerce & Roupas',
                  desc: '4781-0/00 + 4789-0 + 7319-0',
                  action: () => onLoadPreset('ecommerce_moda')
                },
                {
                  id: 'marketing_afiliados',
                  title: 'Infoprodutor & Afiliado',
                  desc: '7319-0/02 + 8599-6 + 7311-4',
                  action: () => onLoadPreset('marketing_afiliados')
                },
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={preset.action}
                  className="p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
                >
                  <span className="text-xs font-bold text-slate-900 block group-hover:text-emerald-700">
                    {preset.title}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5 font-mono">
                    {preset.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Conteúdo Populado da Cesta */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lista de CNAEs (8 colunas) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Card CNAE Principal */}
            <div className="bg-white border-2 border-emerald-600 rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  CNAE Principal (Maior Faturamento)
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {primaryItem ? primaryItem.cnae.anexoSimples : 'Não selecionado'}
                </span>
              </div>

              {primaryItem ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block font-display">
                      <span className="font-mono text-emerald-700 mr-2">{primaryItem.cnae.codigo}</span>
                      {primaryItem.cnae.denominacao}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{primaryItem.cnae.setor}</span>
                      <span>·</span>
                      <span className={primaryItem.cnae.permiteMei ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                        {primaryItem.cnae.permiteMei ? 'Permite MEI' : 'Vedado no MEI'}
                      </span>
                      <span>·</span>
                      <span>Alíquota inicial: {primaryItem.cnae.aliquotaInicial.toFixed(1)}%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(primaryItem.cnae.codigo)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors self-start sm:self-auto"
                    title="Remover da cesta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic py-2">
                  Nenhum CNAE principal definido. Clique em "Definir como Principal" em um dos secundários abaixo.
                </p>
              )}
            </div>

            {/* CNAEs Secundários */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  CNAEs Secundários ({secondaryItems.length})
                </span>
                <span className="text-xs text-slate-500">
                  Atividades complementares no CNPJ
                </span>
              </div>

              {secondaryItems.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">
                  Nenhum CNAE secundário adicionado ainda.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {secondaryItems.map((item) => (
                    <div
                      key={item.cnae.codigo}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 first:pt-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono font-semibold text-slate-800">{item.cnae.codigo}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-600">{item.cnae.anexoSimples}</span>
                          <span className="text-slate-400">·</span>
                          <span className={item.cnae.permiteMei ? 'text-emerald-700' : 'text-slate-500'}>
                            {item.cnae.permiteMei ? 'Permite MEI' : 'Vedado no MEI'}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-900">
                          {item.cnae.denominacao}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => onSetPrimary(item.cnae.codigo)}
                          className="px-2.5 py-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                        >
                          Definir como Principal
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.cnae.codigo)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Resumo do Enquadramento do CNPJ (4 colunas) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Parecer de Viabilidade do CNPJ
              </h3>

              {/* Status do MEI */}
              <div className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                hasIncompatibleMei
                  ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                  : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
              }`}>
                <div className="flex items-center gap-1.5 font-bold">
                  {hasIncompatibleMei ? (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <span>
                    {hasIncompatibleMei ? 'Enquadramento: Microempresa (ME)' : 'Compatível com MEI'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {hasIncompatibleMei ? (
                    <>
                      Atenção: Você incluiu atividade(s) não permitida(s) no MEI ({incompatibleMeiCnaes.map(c => c.cnae.codigo).join(', ')}). Pela legislação tributária brasileira, bastando um único CNAE vedado para a empresa ter que ser aberta como <strong>Microempresa (ME)</strong> no Simples Nacional.
                    </>
                  ) : (
                    <>
                      Todas as atividades selecionadas são permitidas para o Microempreendedor Individual (MEI), desde que o faturamento respeite o teto de R$ 81.000/ano.
                    </>
                  )}
                </p>
              </div>

              {/* Inscrição Estadual vs Municipal */}
              <div className="text-xs space-y-2 border-t border-slate-100 pt-3">
                <span className="font-semibold text-slate-800 block">Exigências Cadastrais:</span>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Inscrição Estadual (SEFAZ/ICMS):</span>
                  <span className={`font-semibold ${requiresIE ? 'text-blue-700' : 'text-slate-700'}`}>
                    {requiresIE ? 'Obrigatória' : 'Dispensada'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Inscrição Municipal (Prefeitura/ISS):</span>
                  <span className="font-semibold text-emerald-700">Obrigatória</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Sujeito ao Fator R:</span>
                  <span className={`font-semibold ${hasFactorR ? 'text-amber-700' : 'text-slate-700'}`}>
                    {hasFactorR ? 'Sim (Monitorar 28%)' : 'Não'}
                  </span>
                </div>
              </div>

              {/* Ação de tirar dúvidas no Chatbot */}
              <div className="pt-2">
                <button
                  onClick={() => onAskChatbot(`Olá! Montei a seguinte lista de CNAEs para minha empresa: Principal (${primaryItem?.cnae.codigo || 'não definido'}) e Secundários (${secondaryItems.map(s => s.cnae.codigo).join(', ')}). Gostaria de saber se há algum conflito fiscal entre eles e como emitir notas fiscais sem erro.`)}
                  className="w-full py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors text-center"
                >
                  Validar Cesta com Chatbot Groq
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
