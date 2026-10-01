import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Check, 
  Info, 
  AlertTriangle, 
  ChevronRight, 
  X, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { CNAE_DATABASE } from '../data/cnaeDatabase';
import { CnaeItem } from '../types/cnae';

interface CnaeCatalogProps {
  onAddToBasket: (cnae: CnaeItem, tipo: 'principal' | 'secundario') => void;
  basketCnaes: { cnae: CnaeItem; tipo: 'principal' | 'secundario' }[];
  onAskChatbot: (prompt: string) => void;
}

export const CnaeCatalog: React.FC<CnaeCatalogProps> = ({
  onAddToBasket,
  basketCnaes,
  onAskChatbot
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<string>('all');
  const [selectedCnae, setSelectedCnae] = useState<CnaeItem | null>(null);

  // Filtros combinados
  const filteredCnaes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return CNAE_DATABASE.filter(item => {
      // Filtro de texto
      const matchesText = !q || (
        item.codigo.toLowerCase().includes(q) ||
        item.codigoPuro.includes(q.replace(/\D/g, '')) ||
        item.denominacao.toLowerCase().includes(q) ||
        item.palavrasChave.some(kw => kw.toLowerCase().includes(q)) ||
        (item.ocupacaoMei && item.ocupacaoMei.toLowerCase().includes(q))
      );

      if (!matchesText) return false;

      // Filtro de categoria / modo
      if (filterMode === 'all') return true;
      if (filterMode === 'mei') return item.permiteMei;
      if (filterMode === 'anexo1') return item.anexoSimples === 'Anexo I';
      if (filterMode === 'anexo3') return item.anexoSimples === 'Anexo III';
      if (filterMode === 'anexo5') return item.anexoSimples === 'Anexo V' || item.sujeitoFatorR;
      if (filterMode === 'baixoRisco') return item.grauRisco.includes('Baixo');

      return true;
    });
  }, [searchQuery, filterMode]);

  const isCnaeInBasket = (codigo: string) => {
    return basketCnaes.some(b => b.cnae.codigo === codigo);
  };

  return (
    <div className="space-y-6">
      {/* Header editorial */}
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
          Catálogo & Consulta de CNAEs para Pequenas Empresas
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-3xl">
          Pesquise por código, denominação oficial ou termos populares (ex: "programador", "afiliado", "marmita", "personal trainer") para verificar permissão no MEI, alíquotas do Simples Nacional e Fator R.
        </p>
      </div>

      {/* Controles de Busca e Filtros */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Input de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por código (ex: 6201-5), palavra-chave (ex: software, roupas, restaurante)..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Interactive Segmented Control (Allowed functional buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'mei', label: 'Permitidos no MEI' },
            { id: 'anexo1', label: 'Anexo I (Comércio)' },
            { id: 'anexo3', label: 'Anexo III (6%)' },
            { id: 'anexo5', label: 'Fator R / Anexo V' },
            { id: 'baixoRisco', label: 'Baixo Risco' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterMode(tab.id)}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                filterMode === tab.id
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Resultados & Contador */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Exibindo <strong className="text-slate-900 font-mono tabular-nums">{filteredCnaes.length}</strong> atividades econômicas mapeadas
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-emerald-700 hover:underline"
          >
            Limpar busca
          </button>
        )}
      </div>

      {/* Tabela de Dados de Alta Densidade (Single elevation, tabular numerals) */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4 w-32">Código</th>
                <th className="py-3 px-4">Denominação & Atividade</th>
                <th className="py-3 px-4 w-28 text-center">Permite MEI?</th>
                <th className="py-3 px-4 w-32">Simples Nacional</th>
                <th className="py-3 px-4 w-28 text-center">Fator R</th>
                <th className="py-3 px-4 w-24 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCnaes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <p className="text-sm font-medium">Nenhum CNAE encontrado para "{searchQuery}".</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Tente termos como "comércio", "software", "beleza", "consultoria" ou pergunte ao Chatbot Fiscal Groq.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCnaes.map((item) => {
                  const inBasket = isCnaeInBasket(item.codigo);
                  return (
                    <tr
                      key={item.codigo}
                      onClick={() => setSelectedCnae(item)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-800 whitespace-nowrap">
                        {item.codigo}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">
                          {item.denominacao}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                          <span>{item.setor}</span>
                          <span>·</span>
                          <span className="truncate max-w-xs">{item.grauRisco.split('(')[0]}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {item.permiteMei ? (
                          <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Sim
                          </span>
                        ) : (
                          <span className="text-slate-400 font-medium inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            Não
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-slate-800">
                          {item.anexoSimples}
                        </span>
                        <span className="text-slate-500 font-mono tabular-nums text-[11px] ml-1.5">
                          ({item.aliquotaInicial.toFixed(1)}%)
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {item.sujeitoFatorR ? (
                          <span className="text-amber-700 font-medium inline-flex items-center gap-1 text-[11px]">
                            Sim (Anexo V ➔ III)
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">
                            Não
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => onAddToBasket(item, 'secundario')}
                          className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors ${
                            inBasket
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {inBasket ? 'Na Cesta' : '+ Adicionar'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer / Modal de Detalhes do CNAE Selecionado */}
      {selectedCnae && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-xl p-6 space-y-5">
            {/* Header do Modal */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-mono font-bold text-emerald-700">{selectedCnae.codigo}</span>
                  <span>·</span>
                  <span>{selectedCnae.setor}</span>
                  <span>·</span>
                  <span>{selectedCnae.anexoSimples} ({selectedCnae.aliquotaInicial.toFixed(1)}%)</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1 font-display">
                  {selectedCnae.denominacao}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCnae(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metadados Regulatórios */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block">Enquadramento MEI</span>
                <span className={`font-semibold ${selectedCnae.permiteMei ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {selectedCnae.permiteMei ? 'Permitido no MEI' : 'Vedado no MEI'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Alíquota Inicial</span>
                <span className="font-semibold text-slate-900 font-mono tabular-nums">
                  {selectedCnae.aliquotaInicial.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Fator R</span>
                <span className={`font-semibold ${selectedCnae.sujeitoFatorR ? 'text-amber-700' : 'text-slate-700'}`}>
                  {selectedCnae.sujeitoFatorR ? 'Sujeito (Folha >= 28%)' : 'Não se aplica'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">Órgão Regulador</span>
                <span className="font-semibold text-slate-900 truncate block">
                  {selectedCnae.orgaoFiscalizador}
                </span>
              </div>
            </div>

            {/* Ocupação MEI se aplicável */}
            {selectedCnae.ocupacaoMei && (
              <div className="text-xs text-slate-700 bg-emerald-50/70 border border-emerald-100 p-3 rounded-lg">
                <span className="font-semibold text-emerald-900 block">Ocupação Oficial para o MEI:</span>
                <span>{selectedCnae.ocupacaoMei}</span>
              </div>
            )}

            {/* Alerta Tributário */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-3 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1 text-amber-950">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Parecer Fiscal e Cuidados:
              </span>
              <p className="leading-relaxed">
                {selectedCnae.alertaTributario}
              </p>
            </div>

            {/* Atividades que compreende */}
            <div className="space-y-1.5 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">Atividades Compreendidas:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                {selectedCnae.atividadesCompreende.map((ativ, i) => (
                  <li key={i}>{ativ}</li>
                ))}
              </ul>
            </div>

            {/* Atividades que NÃO compreende */}
            {selectedCnae.atividadesNaoCompreende.length > 0 && (
              <div className="space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">Atividades Não Compreendidas:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-500">
                  {selectedCnae.atividadesNaoCompreende.map((ativ, i) => (
                    <li key={i}>{ativ}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ações do Modal */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  onAskChatbot(`Olá! Gostaria de tirar dúvidas específicas sobre o CNAE ${selectedCnae.codigo} (${selectedCnae.denominacao}). Quais os impostos que incidem e como devo emitir notas fiscais?`);
                  setSelectedCnae(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
              >
                <Bot className="w-4 h-4 text-emerald-600" />
                Perguntar ao Chatbot Groq
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onAddToBasket(selectedCnae, 'principal');
                    setSelectedCnae(null);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Definir como CNAE Principal
                </button>
                <button
                  onClick={() => {
                    onAddToBasket(selectedCnae, 'secundario');
                    setSelectedCnae(null);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
                >
                  + Adicionar como Secundário
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
