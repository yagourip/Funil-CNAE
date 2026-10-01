import { CnaeItem } from '../types/cnae';

export const CNAE_DATABASE: CnaeItem[] = [
  // ==================== TECNOLOGIA & DIGITAL ====================
  {
    codigo: '6201-5/01',
    codigoPuro: '6201501',
    denominacao: 'Desenvolvimento de programas de computador sob encomenda',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['programador', 'software', 'desenvolvedor', 'app', 'aplicativo', 'backend', 'frontend', 'fullstack', 'engenheiro de software', 'api', 'saas', 'dev', 'codigo'],
    atividadesCompreende: [
      'Desenvolvimento de programas de informática sob encomenda',
      'Elaboração de programas customizados de computador',
      'Criação de aplicativos para smartphones e tablets',
      'Programação de sistemas de informação'
    ],
    atividadesNaoCompreende: [
      'Desenvolvimento e licenciamento de programas customizáveis (6202-3/00)',
      'Desenvolvimento e licenciamento de programas não-customizáveis (6203-1/00)',
      'Manutenção física de computadores (9511-8/00)'
    ],
    alertaTributario: 'Vedado para MEI por ser atividade intelectual regulada. Sujeito ao FATOR R: se a folha/pró-labore for >= 28% do faturamento, tributa no Anexo III (6,00%), economizando 9,5% em tributos!',
    cnaesSecundariosRecomendados: ['6202-3/00', '6204-0/00', '6209-1/00', '6311-9/00']
  },
  {
    codigo: '6202-3/00',
    codigoPuro: '6202300',
    denominacao: 'Desenvolvimento e licenciamento de programas de computador customizáveis',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['saas', 'licenca de software', 'software as a service', 'sistema em nuvem', 'plataforma', 'assinatura de software'],
    atividadesCompreende: [
      'Desenvolvimento de software de base ou aplicativo customizável',
      'Licenciamento e cessão de direito de uso de software customizável',
      'Comercialização de software com possibilidade de adaptações'
    ],
    atividadesNaoCompreende: [
      'Desenvolvimento exclusivo sob encomenda (6201-5/01)',
      'Venda de software de prateleira não-customizável (6203-1/00)'
    ],
    alertaTributario: 'Ideal para empresas de SaaS. Sujeito ao Fator R (redução de 15,5% para 6,0% se pró-labore/folha for no mínimo 28%).',
    cnaesSecundariosRecomendados: ['6201-5/01', '6203-1/00', '6311-9/00']
  },
  {
    codigo: '6203-1/00',
    codigoPuro: '6203100',
    denominacao: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['software de prateleira', 'venda de app pronto', 'licenca pronta', 'jogos digitais', 'game dev'],
    atividadesCompreende: [
      'Desenvolvimento e licenciamento de pacotes prontos de programas',
      'Venda de cópias de software sem adaptação (off-the-shelf)'
    ],
    atividadesNaoCompreende: [
      'Programação sob encomenda (6201-5/01)'
    ],
    alertaTributario: 'Comum para distribuição de apps e softwares de massa. Sujeito a Fator R.',
    cnaesSecundariosRecomendados: ['6202-3/00', '6209-1/00']
  },
  {
    codigo: '6204-0/00',
    codigoPuro: '6204000',
    denominacao: 'Consultoria em tecnologia da informação',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['consultor de ti', 'arquiteto de solucoes', 'auditoria de ti', 'seguranca da informacao', 'cybersecurity', 'devops'],
    atividadesCompreende: [
      'Consultoria em hardware e software',
      'Assessoria no planejamento e estruturação de TI',
      'Auditoria de sistemas e consultoria de segurança de redes'
    ],
    atividadesNaoCompreende: [
      'Suporte técnico e manutenção rotineira (6209-1/00)'
    ],
    alertaTributario: 'Atividade intelectual sujeita ao Fator R. Quando o Fator R for >= 28%, tributa no Anexo III.',
    cnaesSecundariosRecomendados: ['6201-5/01', '6209-1/00', '7020-4/00']
  },
  {
    codigo: '6209-1/00',
    codigoPuro: '6209100',
    denominacao: 'Suporte técnico, manutenção e outros serviços em tecnologia da informação',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['helpdesk', 'suporte ti', 'instalacao de software', 'recuperacao de dados', 'configuracao de rede', 'assistencia ti'],
    atividadesCompreende: [
      'Serviços de helpdesk e suporte ao usuário de informática',
      'Instalação e configuração de softwares em computadores',
      'Recuperação de panes em computadores e servidores'
    ],
    atividadesNaoCompreende: [
      'Reparação e manutenção mecânica e física de computadores (9511-8/00 - que pode ser MEI)'
    ],
    alertaTributario: 'Tributado diretamente no Anexo III (6%), sem necessidade de Fator R!',
    cnaesSecundariosRecomendados: ['9511-8/00', '6204-0/00', '6311-9/00']
  },
  {
    codigo: '6311-9/00',
    codigoPuro: '6311900',
    denominacao: 'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['hospedagem de sites', 'data center', 'cloud hosting', 'processamento de dados', 'servidor em nuvem', 'streaming'],
    atividadesCompreende: [
      'Hospedagem de páginas web (web hosting)',
      'Fornecimento de infraestrutura de computação e aplicação (IaaS/PaaS)',
      'Processamento e tratamento eletrônico de dados'
    ],
    atividadesNaoCompreende: [
      'Desenvolvimento de software (6201-5/01)'
    ],
    alertaTributario: 'Tributação direta no Anexo III do Simples Nacional (inicia em 6,00%). Muito utilizado por plataformas digitais e serviços em nuvem.',
    cnaesSecundariosRecomendados: ['6201-5/01', '6202-3/00', '6319-4/00']
  },
  {
    codigo: '6319-4/00',
    codigoPuro: '6319400',
    denominacao: 'Portais, provedores de conteúdo e outros serviços de informação na internet',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['portal de conteudo', 'blog monetizado', 'site de noticias', 'marketplace', 'plataforma web', 'adsense'],
    atividadesCompreende: [
      'Operação de sites de busca e portais da internet',
      'Fornecimento de conteúdo editorial digital e notícias online',
      'Monetização com publicidade em plataformas digitais'
    ],
    atividadesNaoCompreende: [
      'Agência de publicidade (7311-4/00)'
    ],
    alertaTributario: 'Excelente opção para criadores de portais, blogs e sites informativos. Alíquota inicial de 6% no Anexo III.',
    cnaesSecundariosRecomendados: ['7311-4/00', '7319-0/02', '6311-9/00']
  },
  {
    codigo: '9511-8/00',
    codigoPuro: '9511800',
    denominacao: 'Reparação e manutenção de computadores e de equipamentos periféricos',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Técnico(a) de manutenção de computador independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['conserto de pc', 'formatacao', 'manutencao computador', 'tecnico de informatica', 'troca de tela notebook', 'hardware'],
    atividadesCompreende: [
      'Reparação e manutenção mecânica e física de computadores de mesa e laptops',
      'Conserto de impressoras, teclados, mouses e monitores',
      'Limpeza física e substituição de peças defeituosas'
    ],
    atividadesNaoCompreende: [
      'Desenvolvimento de programas (6201-5/01)',
      'Instalação de cabeamento estruturado de redes (4321-5/00)'
    ],
    alertaTributario: 'PERMITE MEI! O profissional pode atuar como MEI pagando taxa fixa mensal (DAS-MEI ~R$ 75/mês).',
    cnaesSecundariosRecomendados: ['9512-6/00', '4751-2/01']
  },

  // ==================== MARKETING, AFILIADOS & INFOPRODUTOS ====================
  {
    codigo: '7319-0/02',
    codigoPuro: '7319002',
    denominacao: 'Promoção de vendas',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Promotor(a) de vendas independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['afiliado', 'hotmart', 'kiwify', 'promocao de vendas', 'comissao', 'divulgador', 'monetizze', 'eduzz', 'vendedor de curso'],
    atividadesCompreende: [
      'Promoção de produtos e serviços em pontos de venda e canais digitais',
      'Atividades de demonstração e degustação de produtos',
      'Comissionamento de vendas e promoção de infoprodutos de terceiros'
    ],
    atividadesNaoCompreende: [
      'Agenciamento de publicidade (7311-4/00)',
      'Pesquisa de mercado (7320-3/00)'
    ],
    alertaTributario: 'CNAE muito utilizado por AFILIADOS digitais. É permitido no MEI como Promotor de Vendas Independente, tributado no Anexo III.',
    cnaesSecundariosRecomendados: ['7311-4/00', '8599-6/04', '7319-0/03']
  },
  {
    codigo: '7311-4/00',
    codigoPuro: '7311400',
    denominacao: 'Agências de publicidade',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['agencia de marketing', 'publicidade', 'anuncios', 'gestao de trafego', 'trafego pago', 'social media', 'criacao de campanhas', 'branding'],
    atividadesCompreende: [
      'Criação e realização de campanhas publicitárias completas',
      'Planejamento de mídia e veiculação em canais digitais e tradicionais',
      'Gestão de tráfego pago estratégico e marketing institucional'
    ],
    atividadesNaoCompreende: [
      'Promoção de vendas direta (7319-0/02)',
      'Design gráfico puro (7410-2/99)'
    ],
    alertaTributario: 'Não permite MEI. Sujeito ao FATOR R: se folha >= 28% do faturamento, cai de 15,5% para 6,00% no Anexo III.',
    cnaesSecundariosRecomendados: ['7319-0/02', '7319-0/03', '7410-2/99', '8599-6/04']
  },
  {
    codigo: '7410-2/99',
    codigoPuro: '7410299',
    denominacao: 'Atividades de design não especificadas anteriormente',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['designer grafico', 'ui ux', 'identidade visual', 'logotipo', 'design digital', 'layout', 'web designer'],
    atividadesCompreende: [
      'Design gráfico, editorial e de embalagens',
      'Criação de identidade visual e logotipos',
      'Design de interfaces digitais (UI/UX)'
    ],
    atividadesNaoCompreende: [
      'Decoração de interiores (7410-2/02)',
      'Desenvolvimento de software (6201-5/01)'
    ],
    alertaTributario: 'Vedado ao MEI. Sujeito ao Fator R (pode reduzir para 6% no Anexo III com pró-labore adequado).',
    cnaesSecundariosRecomendados: ['7311-4/00', '6201-5/01', '7490-1/04']
  },
  {
    codigo: '8599-6/04',
    codigoPuro: '8599604',
    denominacao: 'Treinamento em desenvolvimento profissional e gerencial',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Instrutor(a) de cursos preparatórios independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['curso online', 'infoprodutor', 'treinamento', 'workshop', 'mentoria', 'palestra', 'capacitacao', 'aulas livres'],
    atividadesCompreende: [
      'Cursos de desenvolvimento profissional e gerencial',
      'Treinamentos corporativos e capacitação de liderança',
      'Workshops, cursos livres e infoprodutos educacionais'
    ],
    atividadesNaoCompreende: [
      'Ensino superior (8531-7/00)',
      'Educação básica escolar (8513-8/00)'
    ],
    alertaTributario: 'CNAE padrão ouro para INFOPRODUTORES e mentores. Permitido no MEI como instrutor! No Simples tributa direto no Anexo III (6,00%).',
    cnaesSecundariosRecomendados: ['7319-0/02', '5811-5/00', '7020-4/00']
  },
  {
    codigo: '5811-5/00',
    codigoPuro: '5811500',
    denominacao: 'Edição de livros',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Editor(a) de livros independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['ebook', 'livro digital', 'publicacao de livro', 'editora', 'livro fisico'],
    atividadesCompreende: [
      'Edição de livros, enciclopédias e folhetos em meio físico ou eletrônico (e-books)',
      'Publicação de conteúdo bibliográfico digital'
    ],
    atividadesNaoCompreende: [
      'Impressão gráfica de livros por encomenda (1811-3/02)'
    ],
    alertaTributario: 'Usado para venda de e-books com benefício de imunidade tributária de ICMS/ISS em casos específicos. Permitido no MEI.',
    cnaesSecundariosRecomendados: ['8599-6/04', '4761-0/01']
  },

  // ==================== COMÉRCIO & E-COMMERCE ====================
  {
    codigo: '4781-0/00',
    codigoPuro: '4781000',
    denominacao: 'Comércio varejista de artigos do vestuário e acessórios',
    setor: 'Comércio',
    permiteMei: true,
    ocupacaoMei: 'Comerciante de artigos de vestuário e acessórios independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Receita Estadual / ICMS',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['loja de roupas', 'vestuario', 'moda', 'boutique', 'calcados e acessorios', 'brecho', 'e-commerce roupas', 'dropshipping roupas'],
    atividadesCompreende: [
      'Comércio varejista de roupas masculinas, femininas e infantis',
      'Comércio de cintos, gravatas, meias e bijuterias acessórias',
      'Venda física e através da internet (e-commerce)'
    ],
    atividadesNaoCompreende: [
      'Comércio atacadista de roupas (4642-7/01)',
      'Fabricação de roupas (1412-6/01)'
    ],
    alertaTributario: 'PERMITE MEI. No Simples Nacional, tributa no Anexo I (inicia em 4,00%). Exige Inscrição Estadual (IE) para emissão de NF-e (DANFE).',
    cnaesSecundariosRecomendados: ['4782-8/00', '4789-0/01', '7319-0/02']
  },
  {
    codigo: '4751-2/01',
    codigoPuro: '4751201',
    denominacao: 'Comércio varejista especializado de equipamentos e suprimentos de informática',
    setor: 'Comércio',
    permiteMei: true,
    ocupacaoMei: 'Comerciante de equipamentos e suprimentos de informática independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Receita Estadual / ICMS',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['loja de informatica', 'venda de perifericos', 'placa de video', 'mouse gamer', 'hardware e acessorios', 'pecas de computador'],
    atividadesCompreende: [
      'Comércio varejista de computadores, impressoras e periféricos',
      'Venda de cartuchos, suprimentos e peças de reposição',
      'Vendas online e presenciais'
    ],
    atividadesNaoCompreende: [
      'Conserto e assistência de computadores (9511-8/00)'
    ],
    alertaTributario: 'Permite MEI. No Simples tributa a 4% no Anexo I. Verifique se o produto está sob regime de Substituição Tributária (ICMS-ST).',
    cnaesSecundariosRecomendados: ['9511-8/00', '4752-1/00']
  },
  {
    codigo: '4772-5/00',
    codigoPuro: '4772500',
    denominacao: 'Comércio varejista de cosméticos, produtos de perfumaria e de higiene pessoal',
    setor: 'Comércio',
    permiteMei: true,
    ocupacaoMei: 'Comerciante de cosméticos e artigos de perfumaria independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Receita Estadual / ICMS + Vigilância Sanitária',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['perfumaria', 'maquiagem', 'cosmeticos', 'skincare', 'shampoo', 'sabonetes', 'loja de beleza', 'revenda boticario avon natura'],
    atividadesCompreende: [
      'Venda de perfumes, maquiagens e produtos para a pele',
      'Venda varejista de produtos de higiene pessoal'
    ],
    atividadesNaoCompreende: [
      'Fabricação de cosméticos (2063-1/00)',
      'Serviços de cabeleireiro e estética (9602-5/01)'
    ],
    alertaTributario: 'PERMITE MEI. Anexo I (4,00%). Produtos cosméticos frequentemente possuem PIS/COFINS monofásico e ICMS-ST, permitindo segregação fiscal e menor imposto.',
    cnaesSecundariosRecomendados: ['9602-5/01', '9602-5/02', '4789-0/99']
  },
  {
    codigo: '4721-1/02',
    codigoPuro: '4721102',
    denominacao: 'Padaria e confeitaria com predominância de revenda',
    setor: 'Comércio',
    permiteMei: true,
    ocupacaoMei: 'Confeiteiro(a) / Padeiro(a) independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Vigilância Sanitária + Receita Estadual',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['padaria', 'doceria', 'confeitaria', 'bolos', 'tortas', 'paes', 'salgados'],
    atividadesCompreende: [
      'Comércio varejista de pães, bolos, tortas e biscoitos',
      'Confeitaria com fabricação própria em pequena escala'
    ],
    atividadesNaoCompreende: [
      'Fabricação industrial em série de produtos de panificação (1091-1/01)'
    ],
    alertaTributario: 'Permite MEI. Requer atenção aos requisitos sanitários municipais e normas de manipulação de alimentos.',
    cnaesSecundariosRecomendados: ['5611-2/03', '4729-6/99', '1091-1/02']
  },
  {
    codigo: '4789-0/99',
    codigoPuro: '4789099',
    denominacao: 'Comércio varejista de outros produtos não especificados anteriormente',
    setor: 'Comércio',
    permiteMei: true,
    ocupacaoMei: 'Comerciante de outros produtos independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Receita Estadual / ICMS',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['variedades', 'utilidades domesticas', 'dropshipping geral', 'loja virtual generica', 'brinquedos', 'presentes'],
    atividadesCompreende: [
      'Comércio varejista de artigos de bazar, presentes e utilidades',
      'Venda de produtos diversos sem classificação específica'
    ],
    atividadesNaoCompreende: [
      'Comércio de produtos químicos perigosos (4684-2/99)'
    ],
    alertaTributario: 'CNAE coringa excelente para e-commerce multissetorial e lojistas de utilidades. Permite MEI e inicia em 4% no Anexo I.',
    cnaesSecundariosRecomendados: ['4781-0/00', '4751-2/01', '7319-0/02']
  },

  // ==================== ALIMENTAÇÃO & BARES ====================
  {
    codigo: '5611-2/01',
    codigoPuro: '5611201',
    denominacao: 'Restaurantes e similares',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Proprietário(a) de restaurante independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Vigilância Sanitária + Prefeitura + Bombeiros',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['restaurante', 'bife', 'comida a quilo', 'pizzaria', 'hamburgueria', 'marmita', 'delivery de comida', 'ifood restaurante'],
    atividadesCompreende: [
      'Serviço de alimentação para consumo no local ou entrega (delivery)',
      'Restaurantes à la carte, self-service e fast-food',
      'Pizzarias, churrascarias e hamburguerias'
    ],
    atividadesNaoCompreende: [
      'Fornecimento de comida preparada preponderantemente para empresas (5620-1/01)',
      'Bares exclusivamente voltados a bebidas (5611-2/04)'
    ],
    alertaTributario: 'Permite MEI. No Simples Nacional, o fornecimento de refeição é considerado operação mista tratada preponderantemente no Anexo I (comércio de alimentos). Exige alvará sanitário e AVCB.',
    cnaesSecundariosRecomendados: ['5611-2/03', '5620-1/04', '4729-6/99']
  },
  {
    codigo: '5611-2/03',
    codigoPuro: '5611203',
    denominacao: 'Lanchonetes, casas de chá, de sucos e similares',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Proprietário(a) de lanchonete independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Vigilância Sanitária + Prefeitura',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['lanchonete', 'pastelaria', 'acai', 'sucos', 'cafeteria', 'salgateria', 'trailer de lanche', 'food truck'],
    atividadesCompreende: [
      'Venda de lanches rápidos, salgados, café, sucos e refrigerantes',
      'Casas de açaí, sorveterias com atendimento no balcão',
      'Trailers de lanches e quiosques de comida rápida'
    ],
    atividadesNaoCompreende: [
      'Restaurante completo com prato executivo (5611-2/01)'
    ],
    alertaTributario: 'PERMITE MEI! Excelente para lanchonetes e quiosques. Tributa a 4% no Anexo I.',
    cnaesSecundariosRecomendados: ['5611-2/01', '4721-1/02', '5620-1/04']
  },
  {
    codigo: '5620-1/04',
    codigoPuro: '5620104',
    denominacao: 'Fornecimento de alimentos preparados preponderantemente para consumo domiciliar',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Cozinheiro(a) que fornece refeições prontas independente',
    anexoSimples: 'Anexo I',
    aliquotaInicial: 4.0,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Vigilância Sanitária + Prefeitura',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['marmitaria', 'quentinhas', 'marmita congelada', 'dark kitchen', 'comida fitness', 'delivery em casa', 'cozinha delivery'],
    atividadesCompreende: [
      'Preparo e entrega de refeições em domicílio ou locais de trabalho',
      'Marmitas fit congeladas, refeições sob encomenda',
      'Operações no modelo Dark Kitchen sem salão para clientes'
    ],
    atividadesNaoCompreende: [
      'Serviço de buffet completo com garçons e cerimonial (5620-1/02)'
    ],
    alertaTributario: 'CNAE ideal para MARMITAS FITNESS e Dark Kitchens. Permite MEI!',
    cnaesSecundariosRecomendados: ['5611-2/01', '5611-2/03', '4729-6/99']
  },

  // ==================== SERVIÇOS PROFISSIONAIS & CONSULTORIA ====================
  {
    codigo: '7020-4/00',
    codigoPuro: '7020400',
    denominacao: 'Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura / CRA (Conselho Regional de Administração)',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['consultor empresarial', 'gestao de negocios', 'planejamento estrategico', 'consultoria financeira', 'assessoria empresarial', 'mentoria de negocios', 'consultoria comercial'],
    atividadesCompreende: [
      'Assessoria, orientação e assistência operacional a empresas',
      'Planejamento estratégico, financeiro e organizacional',
      'Reestruturação de processos e governança corporativa'
    ],
    atividadesNaoCompreende: [
      'Consultoria em TI (6204-0/00)',
      'Consultoria jurídica (6911-7/01)',
      'Consultoria contábil (6920-6/01)'
    ],
    alertaTributario: 'NÃO PERMITE MEI. Sujeito ao FATOR R: com despesas com folha/pró-labore de pelo menos 28% do faturamento, tributa a 6,00% no Anexo III, gerando grande economia.',
    cnaesSecundariosRecomendados: ['7490-1/04', '8599-6/04', '7319-0/02']
  },
  {
    codigo: '6920-6/01',
    codigoPuro: '6920601',
    denominacao: 'Atividades de contabilidade',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'CRC (Conselho Regional de Contabilidade) + Prefeitura',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['contador', 'escritorio contabil', 'contabilidade', 'auditoria fiscal', 'pericia contabil', 'imposto de renda'],
    atividadesCompreende: [
      'Registro contábil de transações comerciais de empresas',
      'Elaboração de demonstrações contábeis e balanços patrimoniais',
      'Assessoria tributária e cumprimento de obrigações acessórias'
    ],
    atividadesNaoCompreende: [
      'Cobrança e informações cadastrais (8291-1/00)'
    ],
    alertaTributario: 'Atividade regulada pelo CRC. Tributada DIRETO no Anexo III (6,00%) no Simples Nacional sem exigência de Fator R!',
    cnaesSecundariosRecomendados: ['7020-4/00', '8211-3/00', '8219-9/99']
  },
  {
    codigo: '7490-1/04',
    codigoPuro: '7490104',
    denominacao: 'Atividades de intermediação e agenciamento de serviços e negócios em geral, exceto imobiliários',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['intermediacao de negocios', 'agenciamento', 'comissao de vendas', 'broker', 'intermediario', 'captacao de clientes', 'plataforma de intermediação'],
    atividadesCompreende: [
      'Intermediação comercial de compra e venda sem posse da mercadoria',
      'Agenciamento de serviços e contratos de negócios',
      'Aproximação de partes em negociações empresariais'
    ],
    atividadesNaoCompreende: [
      'Corretagem de imóveis (6821-8/01 - CRECI)',
      'Corretagem de seguros (6622-3/00)'
    ],
    alertaTributario: 'Excelente para quem trabalha com intermediação ou comissões sem conselho específico. Tributa direto no Anexo III (6,00%). Não permite MEI.',
    cnaesSecundariosRecomendados: ['7020-4/00', '7319-0/02', '8291-1/00']
  },
  {
    codigo: '7112-0/00',
    codigoPuro: '7112000',
    denominacao: 'Serviços de engenharia',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'CREA (Conselho Regional de Engenharia e Agronomia)',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['engenheiro civil', 'engenharia eletrica', 'calculo estrutural', 'laudo tecnico', 'art', 'projetos de engenharia', 'pericia de engenharia'],
    atividadesCompreende: [
      'Projetos de engenharia civil, mecânica, elétrica e química',
      'Supervisão e gerenciamento técnico de obras',
      'Elaboração de laudos periciais e emissão de ART'
    ],
    atividadesNaoCompreende: [
      'Execução física de obras de alvenaria (4120-4/00)'
    ],
    alertaTributario: 'Vedado para MEI. Exige registro do responsável técnico no CREA. Sujeito ao Fator R (pode migrar para 6% no Anexo III com 28% de folha/pró-labore).',
    cnaesSecundariosRecomendados: ['7119-7/03', '7490-1/04', '7111-1/00']
  },
  {
    codigo: '7111-1/00',
    codigoPuro: '7111100',
    denominacao: 'Serviços de arquitetura',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'CAU (Conselho de Arquitetura e Urbanismo)',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['arquiteto', 'projeto arquitetonico', 'design de interiores', 'urbanismo', 'paisagismo', 'rrt', 'reforma'],
    atividadesCompreende: [
      'Projetos de edificações residenciais e comerciais',
      'Planejamento urbano e paisagismo arquitetônico',
      'Assessoria técnica de obras e emissão de RRT'
    ],
    atividadesNaoCompreende: [
      'Construção de edifícios (4120-4/00)'
    ],
    alertaTributario: 'Exige registro no CAU. Sujeito ao Fator R (com folha/pró-labore >= 28%, cai para 6% no Anexo III).',
    cnaesSecundariosRecomendados: ['7410-2/02', '7112-0/00', '7119-7/03']
  },
  {
    codigo: '8219-9/99',
    codigoPuro: '8219999',
    denominacao: 'Preparação de documentos e serviços especializados de apoio administrativo não especificados anteriormente',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Digitador(a) / Assistente administrativo(a) independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['secretaria remota', 'assistente virtual', 'digitacao', 'apoio administrativo', 'organizacao de documentos', 'servicos de escritorio', 'bpo administrativo'],
    atividadesCompreende: [
      'Serviços de assistência virtual e secretariado remoto',
      'Digitação, formatação e revisão simples de textos',
      'Apoio nas rotinas operacionais e cadastrais de escritórios'
    ],
    atividadesNaoCompreende: [
      'Consultoria em gestão estratégica (7020-4/00)'
    ],
    alertaTributario: 'MUITO USADO POR ASSISTENTES VIRTUAIS e Secretárias Remotas. PERMITE MEI e tributa no Anexo III (6,00%).',
    cnaesSecundariosRecomendados: ['8211-3/00', '7490-1/04', '8299-7/99']
  },

  // ==================== SAÚDE, BELEZA & BEM-ESTAR ====================
  {
    codigo: '9602-5/01',
    codigoPuro: '9602501',
    denominacao: 'Cabeleireiros, manicure e pedicure',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Cabeleireiro(a) / Manicure / Pedicure independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Vigilância Sanitária + Prefeitura',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['salao de beleza', 'cabelo', 'barbearia', 'barbeiro', 'manicure', 'pedicure', 'unhas', 'corte e escova', 'alongamento de unhas'],
    atividadesCompreende: [
      'Corte, penteado, lavagem, tintura e alisamento de cabelos',
      'Tratamento de mãos e pés (manicure e pedicure)',
      'Barbearia e aparamento de barba e bigode'
    ],
    atividadesNaoCompreende: [
      'Clínica de estética e procedimentos invasivos (9602-5/02)'
    ],
    alertaTributario: 'PERMITE MEI! Pode se beneficiar da Lei do Salão-Parceiro (Lei nº 13.352/2016) para não bitributar comissões de profissionais parceiros.',
    cnaesSecundariosRecomendados: ['9602-5/02', '4772-5/00', '9609-2/06']
  },
  {
    codigo: '9602-5/02',
    codigoPuro: '9602502',
    denominacao: 'Atividades de estética e outros serviços de cuidados com a beleza',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Esteticista independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Vigilância Sanitária + Prefeitura',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['estetica facial', 'limpeza de pele', 'depilacao', 'massagem relaxante', 'drenagem linfatica', 'sobrancelhas', 'cilios', 'lash designer', 'micropigmentacao'],
    atividadesCompreende: [
      'Limpeza de pele, massagens faciais e corporais relaxantes',
      'Depilação com cera ou linha',
      'Design de sobrancelhas e extensão de cílios (lash designer)'
    ],
    atividadesNaoCompreende: [
      'Procedimentos médicos invasivos de cirurgia plástica (8630-5/01)'
    ],
    alertaTributario: 'PERMITE MEI como Esteticista Independente! Tributa a 6% no Anexo III.',
    cnaesSecundariosRecomendados: ['9602-5/01', '4772-5/00', '9609-2/06']
  },
  {
    codigo: '8650-0/04',
    codigoPuro: '8650004',
    denominacao: 'Atividades de fisioterapia',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'CREFITO + Vigilância Sanitária',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['fisioterapeuta', 'reabilitacao fisica', 'pilates clinico', 'fisioterapia motora', 'crefito'],
    atividadesCompreende: [
      'Atendimentos e tratamentos fisioterapêuticos ambulatoriais e domiciliares',
      'Pilates com foco clínico de reabilitação muscular'
    ],
    atividadesNaoCompreende: [
      'Atividades de condicionamento físico em academia geral (9313-1/00)'
    ],
    alertaTributario: 'Profissão regulamentada (CREFITO). Sujeito ao Fator R (redução para 6% no Anexo III com 28% de folha/pró-labore). Não permite MEI.',
    cnaesSecundariosRecomendados: ['9313-1/00', '8690-9/01']
  },
  {
    codigo: '8650-0/03',
    codigoPuro: '8650003',
    denominacao: 'Atividades de psicologia e psicanálise',
    setor: 'Serviços',
    permiteMei: false,
    anexoSimples: 'Anexo V',
    aliquotaInicial: 15.5,
    sujeitoFatorR: true,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'CRP (Conselho Regional de Psicologia)',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['psicologo', 'psicoterapia', 'terapia', 'psicanalise', 'atendimento psicologico online', 'saude mental'],
    atividadesCompreende: [
      'Consultas e sessões de psicologia clínica presenciais e por teleconsulta',
      'Avaliação psicológica e orientação vocacional'
    ],
    atividadesNaoCompreende: [
      'Atividades de psiquiatria médica (8630-5/01)'
    ],
    alertaTributario: 'Não permite MEI por ser profissão intelectual regulamentada. Sujeito ao Fator R.',
    cnaesSecundariosRecomendados: ['8599-6/04', '7020-4/00']
  },
  {
    codigo: '9313-1/00',
    codigoPuro: '9313100',
    denominacao: 'Atividades de condicionamento físico',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Personal trainer / Instrutor(a) de condicionamento físico independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'CREF + Prefeitura',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['academia', 'personal trainer', 'musculacao', 'crossfit', 'treino funcional', 'instrutor de academia', 'educador fisico'],
    atividadesCompreende: [
      'Atividades de academias de ginástica, musculação e crossfit',
      'Serviços prestados por personal trainers particulares',
      'Aulas de ioga e condicionamento físico'
    ],
    atividadesNaoCompreende: [
      'Aulas de artes marciais (8591-1/00)'
    ],
    alertaTributario: 'Tributa direto no Anexo III (6,00%). Desde a Resolução CGSN 150, a ocupação de Personal Trainer foi enquadrada com atenção aos registros do CREF.',
    cnaesSecundariosRecomendados: ['8591-1/00', '9602-5/02', '4763-6/02']
  },

  // ==================== CONSTRUÇÃO, MANUTENÇÃO & INSTALAÇÕES ====================
  {
    codigo: '4321-5/00',
    codigoPuro: '4321500',
    denominacao: 'Instalação e manutenção elétrica',
    setor: 'Construção Civil',
    permiteMei: true,
    ocupacaoMei: 'Eletricista em residências e estabelecimentos comerciais independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['eletricista', 'fiacao', 'quadro de luz', 'instalacao eletrica', 'disjuntor', 'iluminacao', 'padrao de energia'],
    atividadesCompreende: [
      'Instalação de fiação e condutores elétricos prediais',
      'Instalação de interruptores, tomadas e quadros de força',
      'Manutenção preventiva e corretiva de redes elétricas de baixa tensão'
    ],
    atividadesNaoCompreende: [
      'Instalação de linhas de alta tensão em redes de distribuição (4221-9/02)'
    ],
    alertaTributario: 'PERMITE MEI. Não sofre retenção de INSS no MEI para pessoas físicas; em caso de contratação por pessoa jurídica, atente às regras do Art. 18-B da LC 123/2006.',
    cnaesSecundariosRecomendados: ['4322-3/01', '4330-4/04', '4329-1/04']
  },
  {
    codigo: '4322-3/01',
    codigoPuro: '4322301',
    denominacao: 'Instalações hidráulicas, sanitárias e de gás',
    setor: 'Construção Civil',
    permiteMei: true,
    ocupacaoMei: 'Encanador independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['encanador', 'hidraulica', 'vazamento', 'tubulacao', 'cano', 'troca de registro', 'desentupimento'],
    atividadesCompreende: [
      'Instalação e reparação de canos, torneiras e conexões de água e esgoto',
      'Instalação de tubulação de gás residencial',
      'Reparos de infiltrações em redes de água'
    ],
    atividadesNaoCompreende: [
      'Obras de esgotamento sanitário pesado (4222-7/01)'
    ],
    alertaTributario: 'PERMITE MEI. Tributado no Anexo III (6,00%).',
    cnaesSecundariosRecomendados: ['4321-5/00', '4330-4/04']
  },
  {
    codigo: '4330-4/04',
    codigoPuro: '4330404',
    denominacao: 'Serviços de pintura de edifícios em geral',
    setor: 'Construção Civil',
    permiteMei: true,
    ocupacaoMei: 'Pintor(a) de parede independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['pintor', 'pintura residencial', 'textura', 'massa corrida', 'pintura de fachada', 'verniz'],
    atividadesCompreende: [
      'Pintura de paredes internas e externas de residências e prédios',
      'Aplicação de massa corrida e texturas decorativas'
    ],
    atividadesNaoCompreende: [
      'Pintura automotiva (4520-0/02)'
    ],
    alertaTributario: 'PERMITE MEI. Alíquota inicial de 6% no Anexo III.',
    cnaesSecundariosRecomendados: ['4330-4/02', '4330-4/03', '4321-5/00']
  },
  {
    codigo: '4520-0/01',
    codigoPuro: '4520001',
    denominacao: 'Serviços de manutenção e reparação mecânica de veículos automotores',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Mecânico(a) de veículos independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Prefeitura + Meio Ambiente / CETESB',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['oficina mecanica', 'conserto de carro', 'troca de oleo', 'suspensao', 'freio', 'motor', 'revisao automotiva'],
    atividadesCompreende: [
      'Reparação e revisão mecânica de automóveis e utilitários',
      'Conserto e retífica leve de motores, freios e suspensões'
    ],
    atividadesNaoCompreende: [
      'Funilaria e pintura de veículos (4520-0/02)',
      'Comércio varejista de autopeças (4530-7/03)'
    ],
    alertaTributario: 'PERMITE MEI. Se a oficina também vender autopeças, recomenda-se adicionar o CNAE secundário 4530-7/03 (Anexo I) e separar as notas de peças e serviços.',
    cnaesSecundariosRecomendados: ['4530-7/03', '4520-0/02', '4520-0/05']
  },

  // ==================== LOGÍSTICA & TRANSPORTE ====================
  {
    codigo: '5320-2/02',
    codigoPuro: '5320202',
    denominacao: 'Serviços de entrega rápida',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Motoboy / Entregador(a) de encomendas independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Prefeitura Municipal / ISS',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['motoboy', 'delivery', 'entregador', 'ifood entrega', 'loggi', 'entrega de documentos', 'courier'],
    atividadesCompreende: [
      'Entrega expressa de encomendas, comida e documentos urbanos por moto ou bicicleta',
      'Serviços de malote e mensageiro rápido'
    ],
    atividadesNaoCompreende: [
      'Transporte rodoviário de cargas intermunicipal e interestadual (4930-2/02)'
    ],
    alertaTributario: 'PERMITE MEI! O motoboy e entregador de aplicativos pode se formalizar como MEI com direito à cobertura previdenciária e emissão de notas.',
    cnaesSecundariosRecomendados: ['4930-2/01', '5229-0/99']
  },
  {
    codigo: '4930-2/01',
    codigoPuro: '4930201',
    denominacao: 'Transporte rodoviário de carga, exceto produtos perigosos e mudanças, municipal',
    setor: 'Serviços',
    permiteMei: true,
    ocupacaoMei: 'Caminhoneiro(a) / Transportador(a) municipal independente',
    anexoSimples: 'Anexo III',
    aliquotaInicial: 6.0,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Prefeitura + ANTT',
    exigeInscricaoEstadual: false,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['frete', 'carreto', 'transporte de carga', 'caminhao', 'fiorino entrega', 'carga urbana'],
    atividadesCompreende: [
      'Transporte rodoviário de mercadorias no âmbito de um mesmo município',
      'Carretos e fretes de mercadorias locais'
    ],
    atividadesNaoCompreende: [
      'Transporte interestadual e intermunicipal (4930-2/02 - sujeito a ICMS/CT-e)'
    ],
    alertaTributario: 'Permite MEI e MEI Caminhoneiro (com teto especial de R$ 251.600/ano se for exclusivamente transporte de carga intermunicipal/interestadual).',
    cnaesSecundariosRecomendados: ['4930-2/02', '5320-2/02', '5212-5/00']
  },

  // ==================== INDÚSTRIA & CONFECÇÃO ====================
  {
    codigo: '1412-6/01',
    codigoPuro: '1412601',
    denominacao: 'Confecção de peças do vestuário, exceto roupas íntimas e as confeccionadas sob medida',
    setor: 'Indústria',
    permiteMei: true,
    ocupacaoMei: 'Costureiro(a) de roupas em geral independente',
    anexoSimples: 'Anexo II',
    aliquotaInicial: 4.5,
    sujeitoFatorR: false,
    grauRisco: 'Baixo (Risco A / Nível 1 - Dispensa de Alvará)',
    orgaoFiscalizador: 'Receita Estadual / ICMS + IPI',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['fabrica de roupas', 'confeccao', 'costura', 'camisetas', 'calcas', 'marca propria de roupa', 'faccao'],
    atividadesCompreende: [
      'Corte e costura de roupas em série',
      'Confecção de camisas, vestidos, calças e agasalhos'
    ],
    atividadesNaoCompreende: [
      'Alfaiataria e costura sob medida (1412-6/02 - Serviços)'
    ],
    alertaTributario: 'Indústria tributa no Anexo II do Simples Nacional (inicia em 4,50%, incluindo parcela de IPI). Permite MEI.',
    cnaesSecundariosRecomendados: ['4781-0/00', '1412-6/02', '1413-4/01']
  },
  {
    codigo: '1091-1/02',
    codigoPuro: '1091102',
    denominacao: 'Fabricação de produtos de padaria e confeitaria',
    setor: 'Indústria',
    permiteMei: true,
    ocupacaoMei: 'Padeiro(a) / Confeiteiro(a) fabricante independente',
    anexoSimples: 'Anexo II',
    aliquotaInicial: 4.5,
    sujeitoFatorR: false,
    grauRisco: 'Médio (Risco B)',
    orgaoFiscalizador: 'Vigilância Sanitária + Receita Estadual',
    exigeInscricaoEstadual: true,
    exigeInscricaoMunicipal: true,
    palavrasChave: ['fabrica de pao', 'fabrica de salgados', 'fabrica de biscoitos', 'panificacao industrial', 'doces para revenda'],
    atividadesCompreende: [
      'Produção e fornecimento em quantidade de pães, bolos e biscoitos para supermercados e terceiros'
    ],
    atividadesNaoCompreende: [
      'Revenda direta no balcão da padaria (4721-1/02)'
    ],
    alertaTributario: 'Atividade fabril (Anexo II - 4,5%). Permite MEI até o teto anual.',
    cnaesSecundariosRecomendados: ['4721-1/02', '5611-2/03']
  }
];

export const CNAE_SECTORS = ['Todos', 'Serviços', 'Comércio', 'Indústria', 'Construção Civil'] as const;
