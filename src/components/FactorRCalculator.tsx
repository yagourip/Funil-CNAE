import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface FactorRCalculatorProps {
  onAskChatbot: (prompt: string) => void;
}

export const FactorRCalculator: React.FC<FactorRCalculatorProps> = ({ onAskChatbot }) => {
  const [faturamentoMensal, setFaturamentoMensal] = useState<number>(20000);
  const [folhaMensal, setFolhaMensal] = useState<number>(6000);

  // Cálculos baseados nos 12 meses
  const rbt12 = faturamentoMensal * 12;
  const folha12 = folhaMensal * 12;

  const fatorRPercent = useMemo(() => {
    if (rbt12 <= 0) return 0;
    return (folha12 / rbt12) * 100;
  }, [folha12, rbt12]);

  const atingeFatorR = fatorRPercent >= 28;

  // Alíquotas estimadas para primeira faixa (até R$ 180k/ano)
  // Anexo III = 6,00%
  // Anexo V = 15,50%
  const aliquotaAnexo3 = 0.06;
  const aliquotaAnexo5 = 0.155;

  const impostoAnexo3Mensal = faturamentoMensal * aliquotaAnexo3;
  const impostoAnexo5Mensal = faturamentoMensal * aliquotaAnexo5;
  const economiaMensal = impostoAnexo5Mensal - impostoAnexo3Mensal;
  const economiaAnual = economiaMensal * 12;

  // Pró-labore necessário para atingir exatamente 28%
  const folhaNecessariaMensal = Math.ceil(faturamentoMensal * 0.28);
  const diferencaFolha = Math.max(0, folhaNecessariaMensal - folhaMensal);

  return (
    <div className="space-y-6">
      {/* Header editorial */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
          Simulador de Fator R & Redução de Impostos
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl">
          Descubra se sua empresa de serviços intelectuais (TI, consultoria, marketing, engenharia) pode migrar do Anexo V (15,5%) para o Anexo III (6,00%) através da gestão estratégica do pró-labore.
        </p>
      </div>

      {/* Grid de Entradas e Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Painel de Entradas (5 colunas) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Valores da sua Empresa
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Insira o faturamento médio e despesas de pessoal (salários + pró-labore).
            </p>
          </div>

          {/* Faturamento Mensal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800">
                Faturamento Bruto Mensal:
              </label>
              <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                R$ {faturamentoMensal.toLocaleString('pt-BR')}
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={100000}
              step={1000}
              value={faturamentoMensal}
              onChange={(e) => setFaturamentoMensal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>R$ 2.000</span>
              <span>R$ 50.000</span>
              <span>R$ 100.000</span>
            </div>
          </div>

          {/* Folha / Pró-labore Mensal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800">
                Folha Salarial + Pró-labore Mensal:
              </label>
              <span className="text-xs font-bold text-slate-900 font-mono tabular-nums">
                R$ {folhaMensal.toLocaleString('pt-BR')}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={faturamentoMensal}
              step={500}
              value={folhaMensal}
              onChange={(e) => setFolhaMensal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>R$ 0</span>
              <span>R$ {(faturamentoMensal / 2).toLocaleString('pt-BR')}</span>
              <span>R$ {faturamentoMensal.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          {/* Atalho inteligente: Ajustar automaticamente para 28% */}
          <button
            type="button"
            onClick={() => setFolhaMensal(folhaNecessariaMensal)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Ajustar Pró-labore para exatamente 28% (R$ {folhaNecessariaMensal.toLocaleString('pt-BR')})
          </button>

          {/* Explicação breve */}
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600 space-y-1">
            <span className="font-semibold text-slate-800 block">Como funciona a fórmula:</span>
            <p>
              O Fator R é apurado dividindo o total gasto com folha de salários e pró-labore dos últimos 12 meses pela receita bruta total dos últimos 12 meses.
            </p>
          </div>
        </div>

        {/* Painel de Diagnóstico & Economia (7 colunas) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card Indicador Principal */}
          <div className={`border rounded-xl p-6 shadow-2xs transition-all ${
            atingeFatorR 
              ? 'bg-emerald-50/60 border-emerald-300' 
              : 'bg-amber-50/60 border-amber-300'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Índice Atual do Fator R
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className={`text-4xl font-extrabold font-mono tabular-nums ${
                    atingeFatorR ? 'text-emerald-700' : 'text-amber-800'
                  }`}>
                    {fatorRPercent.toFixed(1)}%
                  </span>
                  <span className="text-xs text-slate-600">
                    (Meta mínima legal: <strong>28,0%</strong>)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                  atingeFatorR
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {atingeFatorR ? 'Enquadrado no Anexo III (6%)' : 'Tributado no Anexo V (15,5%)'}
                </span>
              </div>
            </div>

            {/* Barra de Progresso Visual */}
            <div className="mt-4 space-y-1">
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
                {/* Linha de corte 28% */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                  style={{ left: '56%' }} // 28% mapeado em escala de 0 a 50%
                  title="Meta de 28%"
                />
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    atingeFatorR ? 'bg-emerald-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, (fatorRPercent / 50) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0%</span>
                <span className="font-bold text-slate-900">| 28% (Meta do Anexo III)</span>
                <span>50%+</span>
              </div>
            </div>

            {/* Mensagem de Diagnóstico */}
            <div className="mt-4 pt-4 border-t border-slate-200/60 text-xs">
              {atingeFatorR ? (
                <div className="flex items-start gap-2 text-emerald-950">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Parabéns!</strong> Com sua folha de <strong>R$ {folhaMensal.toLocaleString('pt-BR')}/mês</strong>, sua empresa atingiu o Fator R de {fatorRPercent.toFixed(1)}% e será tributada no <strong>Anexo III (6,00%)</strong> em vez de 15,50%.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-amber-950">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong>Atenção:</strong> Sua folha atual representa apenas {fatorRPercent.toFixed(1)}% do faturamento. Faltam <strong>R$ {diferencaFolha.toLocaleString('pt-BR')}/mês</strong> em pró-labore para atingir os 28% e migrar para a alíquota menor de 6%.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Comparativo Financeiro de Imposto */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Comparativo de Imposto Simples Nacional
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
                <span className="text-[11px] text-slate-500 block">Sem atingir o Fator R (Anexo V - 15,5%)</span>
                <span className="text-lg font-bold text-slate-900 font-mono tabular-nums block mt-1">
                  R$ {impostoAnexo5Mensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-500">/mês</span>
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  R$ {(impostoAnexo5Mensal * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /ano
                </span>
              </div>

              <div className="p-3.5 rounded-lg border border-emerald-200 bg-emerald-50/40">
                <span className="text-[11px] text-emerald-800 font-semibold block">Com Fator R $\ge$ 28% (Anexo III - 6,0%)</span>
                <span className="text-lg font-bold text-emerald-800 font-mono tabular-nums block mt-1">
                  R$ {impostoAnexo3Mensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-emerald-600">/mês</span>
                </span>
                <span className="text-[11px] text-emerald-700 block mt-0.5">
                  R$ {(impostoAnexo3Mensal * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /ano
                </span>
              </div>
            </div>

            {/* Destaque da Economia */}
            <div className="p-4 bg-slate-900 text-white rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Economia Tributária Anual Potencial:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  R$ {economiaAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <button
                onClick={() => onAskChatbot(`Gostaria de saber detalhadamente como estruturar o pró-labore da minha empresa para pagar 6% no Simples Nacional com o Fator R faturando R$ ${faturamentoMensal}/mês.`)}
                className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors whitespace-nowrap"
              >
                Consultar Contador IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
