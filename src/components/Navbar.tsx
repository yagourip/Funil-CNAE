import React from 'react';
import { Layers, Search, Calculator, FileCheck, Bot, Building2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'funil' | 'catalogo' | 'fatorR' | 'cesta' | 'chat';
  setActiveTab: (tab: 'funil' | 'catalogo' | 'fatorR' | 'cesta' | 'chat') => void;
  basketCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, basketCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div 
            onClick={() => setActiveTab('funil')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block font-display">
                Funil CNAE
              </span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider block -mt-1">
                Pequenas Empresas
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Clean single line typography) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('funil')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'funil'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              Funil de Enquadramento
            </button>

            <button
              onClick={() => setActiveTab('catalogo')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'catalogo'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Search className="w-4 h-4 text-emerald-600" />
              Consulta & Tabela
            </button>

            <button
              onClick={() => setActiveTab('fatorR')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'fatorR'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              Simulador Fator R
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              Chatbot Fiscal Groq
            </button>
          </nav>

          {/* Zone 3: Primary Action / Basket */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('cesta')}
              className={`relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                activeTab === 'cesta'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <FileCheck className="w-4 h-4 text-emerald-500" />
              <span className="hidden sm:inline font-medium">Cesta CNPJ</span>
              {basketCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-600 text-white font-mono tabular-nums">
                  {basketCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-100 bg-slate-50/90 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('funil')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${activeTab === 'funil' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
        >
          Funil
        </button>
        <button
          onClick={() => setActiveTab('catalogo')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${activeTab === 'catalogo' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
        >
          Catálogo
        </button>
        <button
          onClick={() => setActiveTab('fatorR')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${activeTab === 'fatorR' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
        >
          Fator R
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-2.5 py-1 rounded font-medium whitespace-nowrap ${activeTab === 'chat' ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
        >
          Chatbot
        </button>
      </div>
    </header>
  );
};
