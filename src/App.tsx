/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CnaeFunnel } from './components/CnaeFunnel';
import { CnaeCatalog } from './components/CnaeCatalog';
import { FactorRCalculator } from './components/FactorRCalculator';
import { CnpjBasket } from './components/CnpjBasket';
import { GroqChatbot } from './components/GroqChatbot';
import { BasketItem, CnaeItem } from './types/cnae';
import { CNAE_DATABASE } from './data/cnaeDatabase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'funil' | 'catalogo' | 'fatorR' | 'cesta' | 'chat'>('funil');
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');

  // Persistência da Cesta do CNPJ no localStorage
  const [basket, setBasket] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem('funil_cnae_basket');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Erro ao carregar cesta do localStorage:', e);
    }
    // Inicialização padrão com 1 atividade de exemplo
    const defaultItem = CNAE_DATABASE.find(c => c.codigo === '6201-5/01') || CNAE_DATABASE[0];
    return [{ cnae: defaultItem, tipo: 'principal' }];
  });

  useEffect(() => {
    try {
      localStorage.setItem('funil_cnae_basket', JSON.stringify(basket));
    } catch (e) {
      console.warn('Erro ao salvar cesta no localStorage:', e);
    }
  }, [basket]);

  const handleAddToBasket = (cnae: CnaeItem, tipo: 'principal' | 'secundario') => {
    setBasket(prev => {
      // Se for adicionar como principal, converte o antigo principal em secundário
      if (tipo === 'principal') {
        const updated = prev.map(item => ({
          ...item,
          tipo: 'secundario' as const
        }));
        // Remove duplicata se já existia
        const withoutTarget = updated.filter(item => item.cnae.codigo !== cnae.codigo);
        return [{ cnae, tipo: 'principal' }, ...withoutTarget];
      } else {
        // Se for secundário, verifica se já existe
        if (prev.some(item => item.cnae.codigo === cnae.codigo)) {
          return prev;
        }
        return [...prev, { cnae, tipo: 'secundario' }];
      }
    });
  };

  const handleRemoveFromBasket = (codigo: string) => {
    setBasket(prev => prev.filter(item => item.cnae.codigo !== codigo));
  };

  const handleSetPrimary = (codigo: string) => {
    setBasket(prev => {
      const target = prev.find(item => item.cnae.codigo === codigo);
      if (!target) return prev;
      return prev.map(item => {
        if (item.cnae.codigo === codigo) {
          return { ...item, tipo: 'principal' as const };
        }
        return { ...item, tipo: 'secundario' as const };
      });
    });
  };

  const handleClearBasket = () => {
    setBasket([]);
  };

  const handleLoadPreset = (presetKey: string) => {
    if (presetKey === 'dev_saas') {
      const p = CNAE_DATABASE.find(c => c.codigo === '6201-5/01')!;
      const s1 = CNAE_DATABASE.find(c => c.codigo === '6202-3/00')!;
      const s2 = CNAE_DATABASE.find(c => c.codigo === '6209-1/00')!;
      setBasket([
        { cnae: p, tipo: 'principal' },
        { cnae: s1, tipo: 'secundario' },
        { cnae: s2, tipo: 'secundario' },
      ]);
    } else if (presetKey === 'ecommerce_moda') {
      const p = CNAE_DATABASE.find(c => c.codigo === '4781-0/00')!;
      const s1 = CNAE_DATABASE.find(c => c.codigo === '4789-0/99')!;
      const s2 = CNAE_DATABASE.find(c => c.codigo === '7319-0/02')!;
      setBasket([
        { cnae: p, tipo: 'principal' },
        { cnae: s1, tipo: 'secundario' },
        { cnae: s2, tipo: 'secundario' },
      ]);
    } else if (presetKey === 'marketing_afiliados') {
      const p = CNAE_DATABASE.find(c => c.codigo === '7319-0/02')!;
      const s1 = CNAE_DATABASE.find(c => c.codigo === '8599-6/04')!;
      const s2 = CNAE_DATABASE.find(c => c.codigo === '7311-4/00')!;
      setBasket([
        { cnae: p, tipo: 'principal' },
        { cnae: s1, tipo: 'secundario' },
        { cnae: s2, tipo: 'secundario' },
      ]);
    }
    setActiveTab('cesta');
  };

  const handleAskChatbot = (prompt: string) => {
    setChatInitialPrompt(prompt);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar com 3 Zonas Estritas */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        basketCount={basket.length}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'funil' && (
          <CnaeFunnel
            onAddToBasket={handleAddToBasket}
            basketCnaes={basket}
            onOpenFactorR={() => setActiveTab('fatorR')}
            onAskChatbot={handleAskChatbot}
          />
        )}

        {activeTab === 'catalogo' && (
          <CnaeCatalog
            onAddToBasket={handleAddToBasket}
            basketCnaes={basket}
            onAskChatbot={handleAskChatbot}
          />
        )}

        {activeTab === 'fatorR' && (
          <FactorRCalculator
            onAskChatbot={handleAskChatbot}
          />
        )}

        {activeTab === 'cesta' && (
          <CnpjBasket
            basket={basket}
            onRemoveItem={handleRemoveFromBasket}
            onSetPrimary={handleSetPrimary}
            onClearBasket={handleClearBasket}
            onLoadPreset={handleLoadPreset}
            onAskChatbot={handleAskChatbot}
          />
        )}

        {activeTab === 'chat' && (
          <GroqChatbot
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt('')}
          />
        )}
      </main>

      {/* Footer Editorial Limpo (Sem telemetry fake ou botões de status) */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Funil CNAE Inteligente</span>
            <span>·</span>
            <span>Classificação e Consulta Tributária para Pequenas Empresas</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Legislação: LC 123/2006</span>
            <span>·</span>
            <span>Tabela IBGE Concla CNAE 2.3</span>
            <span>·</span>
            <span>Chatbot via Groq API (Llama 3.3 70B)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
