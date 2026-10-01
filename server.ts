import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const SYSTEM_INSTRUCTION_CNAE = `Você é o "Consultor Fiscal CNAE Especialista", um contador e tributarista sênior brasileiro com profundo conhecimento em:
- Classificação Nacional de Atividades Econômicas (CNAE 2.3 IBGE / CONCLA).
- Simples Nacional (Lei Complementar nº 123/2006, Anexos I, II, III, IV e V).
- Regras de enquadramento e desenquadramento de MEI (Microempreendedor Individual, teto de R$ 81.000, ocupações permitidas pelo CGSN).
- Mecânica do Fator R: cálculo detalhado (Folha de Pagamento em 12 meses / Receita Bruta em 12 meses >= 28%), migração de Anexo V (15,5%) para Anexo III (6,00%) e pro-labore ideal.
- Diferença entre CNAE Principal (atividade de maior faturamento) e CNAEs Secundários (atividades acessórias no CNPJ).
- Lei da Liberdade Econômica (Lei nº 13.874/2019) e dispensa de alvará para atividades de Baixo Risco (Nível A).
- Inscrição Estadual (SEFAZ/ICMS) vs Inscrição Municipal (ISS/CCM).

Diretrizes de Resposta:
1. Seja sempre claro, objetivo, didático e profissional.
2. Destaque códigos CNAE formatados (ex: 6201-5/01) e indique se a atividade PERMITE MEI ou NÃO.
3. Se for atividade de serviços intelectuais (TI, consultoria, marketing, engenharia, saúde), explique detalhadamente a regra do Fator R.
4. Use formatação limpa com tópicos pontuados. Evite jargões excessivos sem explicação prévia.
5. Sempre recomende a validação final com o contador responsável pela empresa.`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    groqConfigured: Boolean(process.env.GROQ_API_KEY),
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Chatbot proxy endpoint using Groq API (with Gemini fallback & expert offline backup)
app.post('/api/groq/chat', async (req, res) => {
  try {
    const { messages, userQuestion } = req.body;

    const chatHistory = Array.isArray(messages) && messages.length > 0 
      ? messages 
      : [{ role: 'user', content: userQuestion || 'Olá! Gostaria de ajuda para escolher os melhores CNAEs para minha empresa.' }];

    const groqKey = process.env.GROQ_API_KEY?.trim();
    const geminiKey = process.env.GEMINI_API_KEY?.trim();

    // 1. Prioridade: Groq API (Llama 3.3 70B Versatile)
    if (groqKey) {
      try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: SYSTEM_INSTRUCTION_CNAE },
              ...chatHistory.map((m: any) => ({
                role: m.role === 'assistant' ? 'assistant' : 'user',
                content: m.content
              }))
            ],
            temperature: 0.3,
            max_tokens: 1500
          })
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const assistantReply = data.choices?.[0]?.message?.content;
          if (assistantReply) {
            return res.json({
              reply: assistantReply,
              provider: 'groq',
              model: 'llama-3.3-70b-versatile'
            });
          }
        } else {
          const errorText = await groqResponse.text();
          console.warn('Groq API error:', errorText);
        }
      } catch (err) {
        console.warn('Falha na requisição Groq, testando contingência:', err);
      }
    }

    // 2. Contingência: Gemini API (se configurado)
    if (geminiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const lastUserMsg = chatHistory[chatHistory.length - 1]?.content || userQuestion;
        
        // Contextual prompt with system instruction
        const promptContent = `${SYSTEM_INSTRUCTION_CNAE}\n\nHistórico recente da conversa:\n${chatHistory.map((m: any) => `${m.role === 'user' ? 'Usuário' : 'Consultor'}: ${m.content}`).join('\n')}\n\nResponda ao usuário com foco no enquadramento de pequenas empresas no Brasil:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptContent
        });

        if (response && response.text) {
          return res.json({
            reply: response.text,
            provider: 'gemini',
            model: 'gemini-2.5-flash'
          });
        }
      } catch (err) {
        console.warn('Falha na contingência Gemini:', err);
      }
    }

    // 3. Fallback inteligente especialista local (garante que o usuário nunca fique sem resposta mesmo se não houver chave no momento)
    const questionLower = (chatHistory[chatHistory.length - 1]?.content || userQuestion || '').toLowerCase();
    let expertResponse = '';

    if (questionLower.includes('programador') || questionLower.includes('desenvolvedor') || questionLower.includes('software')) {
      expertResponse = `**Enquadramento para Programador / Desenvolvedor de Software:**\n\n` +
        `1. **Pode ser MEI?**\n` +
        `Não. A atividade de desenvolvimento de programas (CNAE 6201-5/01) é considerada atividade intelectual regulamentada e está expressamente vedada no MEI pela Resolução CGSN nº 140.\n\n` +
        `2. **CNAE Principal Recomendado:**\n` +
        `- **6201-5/01**: Desenvolvimento de programas de computador sob encomenda.\n\n` +
        `3. **CNAEs Secundários Úteis:**\n` +
        `- **6202-3/00**: Desenvolvimento e licenciamento de programas customizáveis (para SaaS e assinaturas).\n` +
        `- **6204-0/00**: Consultoria em tecnologia da informação.\n` +
        `- **6209-1/00**: Suporte técnico em TI (tributa direto no Anexo III a 6%).\n\n` +
        `4. **Regra do FATOR R (Economia Tributária):**\n` +
        `O CNAE 6201-5/01 fica no **Anexo V (15,50%)**. Contudo, ao retirar um pró-labore igual ou superior a 28% do seu faturamento mensal, sua tributação cai para o **Anexo III (6,00%)**! Uma economia de 9,5% do seu faturamento bruto.`;
    } else if (questionLower.includes('fator r') || questionLower.includes('anexo v') || questionLower.includes('anexo iii')) {
      expertResponse = `**Como funciona o FATOR R no Simples Nacional:**\n\n` +
        `O Fator R é a proporção entre a sua folha de salários (incluindo pró-labore dos sócios e encargos) dos últimos 12 meses e a sua receita bruta dos últimos 12 meses:\n\n` +
        `$$\\text{Fator R} = \\frac{\\text{Folha de Salários (12 meses)}}{\\text{Receita Bruta (12 meses)}}$$\n\n` +
        `- **Se o Fator R for $\\ge$ 0,28 (28%):** A empresa é tributada no **Anexo III** (alíquota inicial de **6,00%**).\n` +
        `- **Se o Fator R for < 0,28 (menor que 28%):** A empresa é tributada no **Anexo V** (alíquota inicial pesada de **15,50%**).\n\n` +
        `**Dica de ouro:** Pequenos prestadores de serviços de TI, consultoria, engenharia e arquitetura utilizam a calculadora de pró-labore para ajustar o valor da retirada mensal a exatamente 28% do faturamento, economizando até R$ 950 a cada R$ 10.000 faturados!`;
    } else if (questionLower.includes('afiliado') || questionLower.includes('infoprodut') || questionLower.includes('dropshipping')) {
      expertResponse = `**Enquadramento para Afiliados, Infoprodutores e Negócios Digitais:**\n\n` +
        `1. **Afiliados de plataformas (Hotmart, Kiwify, Eduzz):**\n` +
        `- **CNAE 7319-0/02**: Promoção de vendas (Permite MEI! Tributa no Anexo III a 6% se for ME).\n\n` +
        `2. **Infoprodutores (Cursos online e mentorias):**\n` +
        `- **CNAE 8599-6/04**: Treinamento em desenvolvimento profissional e gerencial (Permite MEI como instrutor! Anexo III a 6%).\n` +
        `- **CNAE 5811-5/00**: Edição de livros (para e-books, permite imunidade de ICMS/ISS).\n\n` +
        `3. **Dropshipping:**\n` +
        `- Não é compra e venda tradicional de estoque local. Geralmente usa **CNAE 7490-1/04** (Intermediação de negócios) combinado com **CNAE 7319-0/02** (Promoção de vendas). Não é recomendado como MEI se a receita superar as regras de intermediação.`;
    } else if (questionLower.includes('mei') || questionLower.includes('limite') || questionLower.includes('81')) {
      expertResponse = `**Regras Essenciais do MEI (Microempreendedor Individual):**\n\n` +
        `- **Teto de faturamento:** R$ 81.000,00 por ano (média de R$ 6.750,00 por mês no ano civil proporcional).\n` +
        `- **Sócios:** O titular não pode ter sócios e nem participar como sócio ou administrador em outra empresa.\n` +
        `- **Funcionários:** Permite contratar no máximo 1 empregado recebendo o piso da categoria ou 1 salário mínimo.\n` +
        `- **Tributação:** Valor fixo mensal do DAS-MEI (~R$ 75 a R$ 81), cobrindo INSS previdenciário e R$ 1 de ICMS (comércio) ou R$ 5 de ISS (serviço).\n` +
        `- **Atenção aos CNAEs:** Nem todas as atividades são permitidas no MEI. Se qualquer um dos seus CNAEs (principal ou secundário) for vedado, a empresa precisa ser aberta como ME.`;
    } else {
      expertResponse = `Olá! Sou seu **Consultor Fiscal CNAE** especializado em pequenas empresas (MEI, ME e EPP).\n\n` +
        `Posso te orientar em:\n` +
        `- Escolha do **CNAE Principal e Secundários** perfeitos para o seu ramo de atuação.\n` +
        `- Verificação se sua atividade **pode ou não ser MEI** de acordo com a Receita Federal.\n` +
        `- Cálculo e planejamento do **Fator R** para economizar impostos pagando 6% (Anexo III) em vez de 15,5% (Anexo V).\n` +
        `- Obrigações com **Inscrição Estadual (SEFAZ)** e **Inscrição Municipal (CCM/Prefeitura)**.\n\n` +
        `*Você pode me perguntar: "Qual CNAE devo usar para minha loja virtual?", "Programador pode ser MEI?", ou "Como não pagar 15,5% de imposto?"*`;
    }

    return res.json({
      reply: expertResponse,
      provider: 'local_expert',
      model: 'CNAE-Tax-Advisor-Engine'
    });

  } catch (error: any) {
    console.error('Erro na rota de chat:', error);
    res.status(500).json({
      error: 'Erro interno ao processar resposta do assistente fiscal.',
      details: error.message
    });
  }
});

// Vite middleware in dev or static files in production
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Funil CNAE] Servidor ativo em http://0.0.0.0:${PORT}`);
  });
}

startServer();
