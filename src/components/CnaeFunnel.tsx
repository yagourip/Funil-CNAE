import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  Sparkles, 
  Plus, 
  Calculator, 
  Check, 
  Info,
  DollarSign,
  Users,
  Briefcase
} from 'lucide-react';
import { CnaeItem, FunilRespostas, FunilResultado, SetorEconomico } from '../types/cnae';
import { processarFunil } from '../services/cnaeFunnelLogic';

interface CnaeFunnelProps {
  onAddToBasket: (cnae: CnaeItem, tipo: 'principal' | 'secundario') => void;
  basketCnaes: { cnae: CnaeItem; tipo: 'principal' | 'secundario' }[];
  onOpenFactorR: () => void;
  onAskChatbot: (prompt: string) => void;
}

export const CnaeFunnel: React.FC<CnaeFunnelProps> = ({
  onAddToBasket,
  basketCnaes,
  onOpenFactorR,
  onAskChatbot
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Respostas do formulário
  const [respostas, setRespostas] = useState<FunilRespostas>({
    porteDesejado: 'A Definir',
    faturamentoEstimadoAnual: 75000,
    possuiSocios: false,
    quantidadeFuncionarios: 0,
    macroSetor: 'Serviços',
    tipoOperacao: 'digital',
    nichoAtividade: 'Desenvolvimento de software e aplicativos',
    necessitaLocalProprio: false
  });

  const [resultado, setResultado] = useState<FunilResultado | null>(null);

  // Sugestões rápidas de nichos
  const quickNichedSuggestions = [
    { label: 'Programador / Software / App', setor: 'Serviços' as SetorEconomico, operacao: 'digital' as const, query: 'desenvolvimento de software' },
    { label: 'E-commerce de Roupas / Acessórios', setor: 'Comércio' as SetorEconomico, operacao: 'digital' as const, query: 'comércio de roupas vestuário' },
    { label: 'Afiliado / Venda de Infoproduto', setor: 'Serviços' as SetorEconomico, operacao: 'digital' as const, query: 'promoção de vendas cursos' },
    { label: 'Agência de Marketing / Tráfego Pago', setor: 'Serviços' as SetorEconomico, operacao: 'digital' as const, query: 'agência de publicidade marketing' },
    { label: 'Consultoria Empresarial / Financeira', setor: 'Serviços' as SetorEconomico, operacao: 'prestacao_intelectual' as const, query: 'consultoria em gestão empresarial' },
    { label: 'Restaurante / Hamburgueria / Delivery', setor: 'Serviços' as SetorEconomico, operacao: 'loja_fisica' as const, query: 'restaurante lanchonete refeição' },
    { label: 'Salão de Beleza / Estética', setor: 'Serviços' as SetorEconomico, operacao: 'loja_fisica' as const, query: 'cabeleireiro manicure estética' },
    { label: 'Assistente Virtual / BPO Administrativo', setor: 'Serviços' as SetorEconomico, operacao: 'digital' as const, query: 'apoio administrativo secretaria' },
    { label: 'Eletricista / Encanador / Manutenção', setor: 'Construção Civil' as SetorEconomico, operacao: 'atendimento_externo' as const, query: 'instalação elétrica hidráulica' },
    { label: 'Oficina Mecânica / Manutenção de Carro', setor: 'Serviços' as SetorEconomico, operacao: 'loja_fisica' as const, query: 'mecânica automotiva veículos' },
  ];

  const handleSelectQuickSuggestion = (item: typeof quickNichedSuggestions[0]) => {
    setRespostas(prev => ({
      ...prev,
      macroSetor: item.setor,
      tipoOperacao: item.operacao,
      nichoAtividade: item.label
    }));
  };

  const handleRunDiagnosis = () => {
    const res = processarFunil(respostas);
    setResultado(res);
    setCurrentStep(4);
  };

  const handleReset = () => {
    setResultado(null);
    setCurrentStep(1);
  };

  const isCnaeInBasket = (codigo: string) => {
    return basketCnaes.some(b => b.cnae.codigo === codigo);
  };

  return (
    <div className="space-y-8">
      {/* Header editorial */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Funil de Classificação e CNAE para Pequenas Empresas
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              Diagnóstico fiscal automatizado para definir o enquadramento ideal (MEI, ME ou EPP), selecionar CNAE Principal e Secundários, e evitar bitributação no Simples Nacional.
            </p>
          </div>
          {currentStep === 4 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors w-fit"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Novo Diagnóstico
            </button>
          )}
        </div>

        {/* Stepper tabs */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { num: 1, title: 'Porte & Faturamento', desc: 'Capacidade e limites' },
            { num: 2, title: 'Setor & Operação', desc: 'Canais e modelo' },
            { num: 3, title: 'Atividade Central', desc: 'Nicho e escopo' },
            { num: 4, title: 'Diagnóstico & CNAEs', desc: 'Enquadramento final' },
          ].map((step) => (
            <button
              key={step.num}
              onClick={() => {
                if (step.num < currentStep || (step.num === 4 && resultado)) {
                  setCurrentStep(step.num);
                }
              }}
              disabled={step.num > currentStep && !(step.num === 4 && resultado)}
              className={`text-left p-3 rounded-lg border transition-all ${
                currentStep === step.num
                  ? 'bg-emerald-50/80 border-emerald-500 shadow-2xs'
                  : currentStep > step.num
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  : 'bg-slate-50/50 border-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center font-mono ${
                    currentStep === step.num
                      ? 'bg-emerald-600 text-white'
                      : currentStep > step.num
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {currentStep > step.num ? '✓' : step.num}
                </span>
                <span className="text-xs font-bold font-display text-slate-900 block truncate">
                  {step.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 pl-7 hidden sm:block truncate">
                {step.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ETAPA 1: Porte, Faturamento e Estrutura */}
      {currentStep === 1 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              1. Qual o faturamento previsto e estrutura de sócios?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              O limite do MEI é de R$ 81.000/ano (ou ~R$ 6.750/mês). Acima disso ou com sócios, a empresa deve ser Microempresa (ME).
            </p>
          </div>

          {/* Faturamento Anual Estimado */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                Faturamento Bruto Anual Estimado:
              </label>
              <span className="text-sm font-bold text-emerald-700 font-mono tabular-nums bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                R$ {respostas.faturamentoEstimadoAnual.toLocaleString('pt-BR')} / ano
                <span className="text-[10px] text-slate-500 font-normal ml-1">
                  (~R$ {Math.round(respostas.faturamentoEstimadoAnual / 12).toLocaleString('pt-BR')}/mês)
                </span>
              </span>
            </div>

            <input
              type="range"
              min={20000}
              max={1500000}
              step={5000}
              value={respostas.faturamentoEstimadoAnual}
              onChange={(e) =>
                setRespostas({
                  ...respostas,
                  faturamentoEstimadoAnual: Number(e.target.value)
                })
              }
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            {/* Presets rápidos */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: 'Até R$ 81k (MEI Ideal)', valor: 75000 },
                { label: 'R$ 150k / ano (ME Simples)', valor: 150000 },
                { label: 'R$ 300k / ano (ME)', valor: 300000 },
                { label: 'R$ 600k / ano (EPP)', valor: 600000 },
                { label: 'R$ 1.2M / ano (EPP)', valor: 1200000 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() =>
                    setRespostas({ ...respostas, faturamentoEstimadoAnual: preset.valor })
                  }
                  className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                    respostas.faturamentoEstimadoAnual === preset.valor
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sócios e Funcionários */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                Terá sócios no negócio?
              </label>
              <p className="text-[11px] text-slate-500">
                O MEI não admite sócios. Se houver sócios, o formato será Sociedade Limitada (LTDA).
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setRespostas({ ...respostas, possuiSocios: false })}
                  className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md border text-center transition-colors ${
                    !respostas.possuiSocios
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Não, sou único titular
                </button>
                <button
                  type="button"
                  onClick={() => setRespostas({ ...respostas, possuiSocios: true })}
                  className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md border text-center transition-colors ${
                    respostas.possuiSocios
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Sim, terei 1 ou mais sócios
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
              <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Quantos funcionários pretende contratar?
              </label>
              <p className="text-[11px] text-slate-500">
                O MEI permite no máximo 1 empregado. Acima disso, enquadra-se como ME.
              </p>
              <div className="flex gap-2 pt-1">
                {[
                  { label: 'Nenhum (só eu)', val: 0 },
                  { label: '1 funcionário', val: 1 },
                  { label: '2 ou mais', val: 3 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setRespostas({ ...respostas, quantidadeFuncionarios: item.val })}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md border text-center transition-colors ${
                      respostas.quantidadeFuncionarios === item.val
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Avançar para Setor & Operação
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ETAPA 2: Setor e Modelo Operacional */}
      {currentStep === 2 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              2. Qual o macro-setor e onde a operação acontece?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Isso define se sua empresa precisa de Inscrição Estadual (SEFAZ para mercadorias) ou Inscrição Municipal (Prefeitura para serviços).
            </p>
          </div>

          {/* Macro-setor */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-800 block">
              Macro-Setor da Atividade:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'Serviços', label: 'Prestação de Serviços', desc: 'TI, consultoria, beleza, etc.' },
                { id: 'Comércio', label: 'Comércio & Varejo', desc: 'Venda de produtos físicos' },
                { id: 'Indústria', label: 'Indústria & Fabricação', desc: 'Produção própria de itens' },
                { id: 'Construção Civil', label: 'Construção & Reparos', desc: 'Obras, elétrica, hidráulica' },
                { id: 'Misto', label: 'Misto / Ambos', desc: 'Comércio + Serviços' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRespostas({ ...respostas, macroSetor: item.id as any })}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    respostas.macroSetor === item.id
                      ? 'bg-emerald-50 border-emerald-600 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block font-display">
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Formato Operacional */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-slate-800 block">
              Formato e Canal de Operação:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  id: 'digital',
                  title: '100% Digital / Internet',
                  desc: 'Home office, SaaS, e-commerce, afiliados, infoprodutos.'
                },
                {
                  id: 'loja_fisica',
                  title: 'Estabelecimento Físico',
                  desc: 'Loja aberta ao público, restaurante, salão, oficina.'
                },
                {
                  id: 'atendimento_externo',
                  title: 'Atendimento no Cliente',
                  desc: 'Instalações, visitas técnicas, manutenções, fretes.'
                },
                {
                  id: 'prestacao_intelectual',
                  title: 'Serviços Intelectuais',
                  desc: 'Consultoria, arquitetura, contabilidade, gestão.'
                },
              ].map((canal) => (
                <button
                  key={canal.id}
                  type="button"
                  onClick={() => setRespostas({ ...respostas, tipoOperacao: canal.id as any })}
                  className={`p-3.5 rounded-lg border text-left transition-all ${
                    respostas.tipoOperacao === canal.id
                      ? 'bg-emerald-50 border-emerald-600 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block font-display">
                    {canal.title}
                  </span>
                  <span className="text-[11px] text-slate-500 block mt-1 leading-snug">
                    {canal.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Voltar
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Avançar para Atividade Central
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ETAPA 3: Atividade Específica & Nicho */}
      {currentStep === 3 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">
              3. O que exatamente a sua empresa vai vender ou executar?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Digite a atividade com suas palavras ou escolha uma das atividades populares abaixo para o funil cruzar com a tabela oficial de CNAEs.
            </p>
          </div>

          {/* Campo de descrição */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-800 block">
              Descreva a atividade principal:
            </label>
            <input
              type="text"
              value={respostas.nichoAtividade}
              onChange={(e) => setRespostas({ ...respostas, nichoAtividade: e.target.value })}
              placeholder="Ex: Desenvolvimento de software e aplicativos mobile, Loja virtual de roupas, Consultoria financeira..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Sugestões populares para 1 clique */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-600 block">
              Ou selecione um modelo comum para pequenas empresas:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickNichedSuggestions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSelectQuickSuggestion(item)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left ${
                    respostas.nichoAtividade === item.label
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Voltar
            </button>
            <button
              onClick={handleRunDiagnosis}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Executar Classificação do Funil
            </button>
          </div>
        </div>
      )}

      {/* ETAPA 4: Diagnóstico Tributário Completo & Recomendações */}
      {currentStep === 4 && resultado && (
        <div className="space-y-6">
          {/* Card Resumo do Porte & Regime */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                    Resultado do Enquadramento
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500 font-mono">
                    LC nº 123/2006 & Resoluções CGSN
                  </span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mt-1 font-display">
                  Porte Indicado: {resultado.porteRecomendado}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Regime Tributário Recomendado:{' '}
                  <strong className="text-slate-900">{resultado.regimeSugerido}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 text-xs font-bold rounded-md border ${
                  resultado.porteRecomendado.includes('MEI')
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  {resultado.porteRecomendado.includes('MEI') ? 'MEI Aprovado' : 'Simples Nacional (ME/EPP)'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-100 leading-relaxed">
              <strong>Justificativa do Funil:</strong> {resultado.motivoPorte}
            </p>
          </div>

          {/* Card CNAE Principal em Destaque */}
          <div className="bg-white border-2 border-emerald-500/80 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-emerald-700 uppercase">CNAE Principal Recomendado</span>
                  <span>·</span>
                  <span>Setor: {resultado.cnaePrincipal.setor}</span>
                  <span>·</span>
                  <span>{resultado.cnaePrincipal.anexoSimples}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1 font-display">
                  <span className="font-mono text-emerald-700 mr-2">{resultado.cnaePrincipal.codigo}</span>
                  {resultado.cnaePrincipal.denominacao}
                </h3>
              </div>

              <button
                onClick={() => onAddToBasket(resultado.cnaePrincipal, 'principal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors shrink-0 ${
                  isCnaeInBasket(resultado.cnaePrincipal.codigo)
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
                }`}
              >
                {isCnaeInBasket(resultado.cnaePrincipal.codigo) ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Na Cesta do CNPJ
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" /> Adicionar como Principal
                  </>
                )}
              </button>
            </div>

            {/* Metadados sem pills estilo unboxed */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-slate-100 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block">Permite MEI?</span>
                <span className={`font-semibold ${resultado.cnaePrincipal.permiteMei ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {resultado.cnaePrincipal.permiteMei ? 'Sim (Permitido)' : 'Não (Vedado ao MEI)'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Alíquota Inicial</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {resultado.cnaePrincipal.aliquotaInicial.toFixed(1)}% ({resultado.cnaePrincipal.anexoSimples})
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Sujeito ao Fator R?</span>
                <span className={`font-semibold ${resultado.cnaePrincipal.sujeitoFatorR ? 'text-amber-700' : 'text-slate-700'}`}>
                  {resultado.cnaePrincipal.sujeitoFatorR ? 'Sim (Pode cair p/ 6%)' : 'Não (Tributo Direto)'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Grau de Risco</span>
                <span className="font-semibold text-slate-900 truncate block">
                  {resultado.cnaePrincipal.grauRisco.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Alerta tributário e Fator R */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-950">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Alerta Tributário & Estratégia Fiscal:
              </div>
              <p className="leading-relaxed">
                {resultado.cnaePrincipal.alertaTributario}
              </p>
              {resultado.cnaePrincipal.sujeitoFatorR && (
                <div className="pt-1">
                  <button
                    onClick={onOpenFactorR}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    Abrir Simulador de Fator R e calcular pró-labore ideal
                  </button>
                </div>
              )}
            </div>

            {/* Atividades compreendidas */}
            <div className="text-xs text-slate-600 space-y-1.5 pt-1">
              <span className="font-semibold text-slate-800 block">
                O que esta atividade engloba oficialmente:
              </span>
              <ul className="list-disc pl-4 space-y-0.5">
                {resultado.cnaePrincipal.atividadesCompreende.map((ativ, i) => (
                  <li key={i}>{ativ}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* CNAEs Secundários Recomendados */}
          {resultado.cnaesSecundarios.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  CNAEs Secundários Complementares Recomendados
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adicionar atividades secundárias no CNPJ evita alterações contratuais no futuro e permite emitir notas fiscais de diferentes serviços ou vendas.
                </p>
              </div>

              <div className="space-y-3">
                {resultado.cnaesSecundarios.map((sec) => (
                  <div
                    key={sec.codigo}
                    className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-semibold text-slate-900">{sec.codigo}</span>
                        <span>·</span>
                        <span>{sec.anexoSimples} ({sec.aliquotaInicial.toFixed(1)}%)</span>
                        <span>·</span>
                        <span className={sec.permiteMei ? 'text-emerald-700' : 'text-slate-500'}>
                          {sec.permiteMei ? 'MEI Permitido' : 'Vedado ao MEI'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {sec.denominacao}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        {sec.alertaTributario}
                      </p>
                    </div>

                    <button
                      onClick={() => onAddToBasket(sec, 'secundario')}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors shrink-0 ${
                        isCnaeInBasket(sec.codigo)
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isCnaeInBasket(sec.codigo) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Na Cesta
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-slate-500" /> + Adicionar Secundário
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist de Abertura & Licenciamento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-display">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Checklist Legal de Abertura
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {resultado.checklistAbertura.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-display">
                <Info className="w-4 h-4 text-emerald-600" />
                Observações de Conformidade
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {resultado.observacoesFiscais.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ações finais */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-xl">
            <div>
              <span className="text-xs font-bold block">
                Ficou com alguma dúvida sobre o CNAE {resultado.cnaePrincipal.codigo}?
              </span>
              <span className="text-[11px] text-slate-400 block">
                Nosso assistente com Groq API pode responder sobre regras de faturamento, sócios e tributos em segundos.
              </span>
            </div>
            <button
              onClick={() => onAskChatbot(`Gostaria de saber detalhes fiscais sobre o CNAE ${resultado.cnaePrincipal.codigo} - ${resultado.cnaePrincipal.denominacao}. Quais os principais cuidados que devo ter na abertura da minha empresa?`)}
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors whitespace-nowrap"
            >
              Consultar Chatbot Groq
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
