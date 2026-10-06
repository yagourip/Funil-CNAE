import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles, 
  Cpu, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { ChatMessage } from '../types/cnae';

interface GroqChatbotProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const GroqChatbot: React.FC<GroqChatbotProps> = ({
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Olá! Sou o **Assistente Fiscal e Tributário com Groq API** especializado em enquadramento de pequenas empresas no Brasil.\n\nPosso te ajudar com:\n- Escolha dos **códigos CNAE** ideais para seu modelo de negócio;\n- Validação de permissão ou vedação para o **MEI (Microempreendedor Individual)**;\n- Planejamento do **Fator R** para economizar impostos no Simples Nacional (pagando 6% em vez de 15,5%);\n- Regras de **Inscrição Estadual (SEFAZ)** e **Inscrição Municipal (Prefeitura)**.\n\nComo posso ajudar você hoje?`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'llama-3.1-8b-instant',
      provider: 'groq'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeModel, setActiveModel] = useState<string>('llama-3.1-8b-instant');
  const [activeProvider, setActiveProvider] = useState<'groq' | 'gemini' | 'local_expert'>('groq');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Se houver prompt vindo de outro componente (ex: do Funil ou do Catálogo)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim().length > 0) {
      setInputMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/groq/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, content: m.content })),
          userQuestion: text.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API (${response.status})`);
      }

      const data = await response.json();
      const assistantReply = data.reply || 'Desculpe, não consegui processar a resposta no momento.';
      
      if (data.model) setActiveModel(data.model);
      if (data.provider) setActiveProvider(data.provider);

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantReply,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          modelUsed: data.model || 'llama-3.3-70b-versatile',
          provider: data.provider || 'groq'
        }
      ]);
    } catch (err: any) {
      console.error('Erro ao enviar mensagem:', err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `Tive uma dificuldade temporária de conexão com o serviço de IA. Mas você pode reformular sua pergunta ou consultar o catálogo e simulador de Fator R enquanto restabelecemos a comunicação.`,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          modelUsed: 'Falha de Conexão',
          provider: 'local_expert'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome_new',
        role: 'assistant',
        content: 'Histórico reiniciado. Como posso te orientar sobre CNAEs e enquadramento tributário para seu negócio?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        modelUsed: activeModel,
        provider: activeProvider
      }
    ]);
  };

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickQuestions = [
    'Programador de software pode ser MEI?',
    'Como calcular o pró-labore para pagar 6% com o Fator R?',
    'Qual o CNAE correto para afiliados e infoprodutos?',
    'O que acontece se o MEI faturar mais de R$ 81 mil no ano?',
    'Qual a diferença entre CNAE Principal e Secundário?',
    'Posso vender roupas e prestar consultoria no mesmo CNPJ?'
  ];

  return (
    <div className="space-y-6">
      {/* Header editorial */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-display">
              Chatbot Fiscal Groq para Pequenas Empresas
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-3xl">
              Assistente inteligente alimentado pela API de ultra-alta velocidade da <strong>Groq</strong> (Llama 3.3 70B Versatile), treinado em legislação tributária brasileira, Simples Nacional, MEI e CNAEs.
            </p>
          </div>

          {/* Status do Provedor de IA */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
              <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              Groq API · {activeModel}
            </span>
            <button
              onClick={handleClearHistory}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              title="Limpar histórico"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Caixa do Chatbot */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col h-[600px]">
        {/* Barra superior de status da conversa */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="font-medium text-slate-700">Consultor Fiscal Online</span>
            <span>·</span>
            <span>Respostas em tempo real</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Base: LC 123/2006 & IBGE Concla
          </span>
        </div>

        {/* Área de Mensagens com Scroll */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-4 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800'
                }`}
              >
                {/* Cabeçalho da Mensagem */}
                <div className="flex items-center justify-between gap-2 mb-1.5 text-[10px] opacity-70">
                  <span className="font-semibold">
                    {msg.role === 'user' ? 'Você' : 'Consultor Fiscal Groq'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Conteúdo formatado da mensagem */}
                <div className="space-y-2 whitespace-pre-line">
                  {msg.content}
                </div>

                {/* Footer da Mensagem com Ação de Copiar */}
                {msg.role === 'assistant' && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="font-mono">
                      {msg.modelUsed}
                    </span>
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="flex items-center gap-1 hover:text-slate-900 transition-colors"
                      title="Copiar resposta"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Copiar
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="ml-1 text-[11px] font-medium text-slate-600">
                  Groq processando parecer tributário...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugestões Rápidas de Perguntas */}
        <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Perguntas Rápidas:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-800 text-slate-600 whitespace-nowrap transition-colors shrink-0 shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Formulário de Envio */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isLoading}
            placeholder="Pergunte sobre CNAEs, Simples Nacional, MEI, Fator R ou emissão de notas..."
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all disabled:opacity-50 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-40 shadow-2xs"
          >
            <span>Enviar</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
