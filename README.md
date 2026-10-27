# Dra. Juliana Alves - Advocacia Trabalhista
## Landing Page Profissional com Blog Jurídico

Landing page institucional moderna, ágil e responsiva para o escritório da **Dra. Juliana Alves Advogada Trabalhista**, com sede no Guarujá - SP e atuação presencial e online em todo o Brasil.

---

### 🎨 Identidade Visual e Design

- **Fundo Principal Elegante:** Tons claros e refinados de Creme e Bege (`#FAF7F2`, `#F3ECE2`), transmitindo sobriedade, acolhimento e clareza.
- **Paleta de Cores Jurídica:** Azul Marinho Profundo (`#0A192F`) e Cinza Chumbo (`#2D3748`) aplicados nos botões de ação e títulos para transmitir a mais alta seriedade e credibilidade jurídica, harmonizados com acentos nobres em Dourado (`#C4A062`).
- **Tipografia Premium:** Família serifada nobre (*Playfair Display*) para títulos (h1, h2, h3) associada à moderna sem serifa (*Inter*) para todos os textos (p, a, span), garantindo máxima legibilidade e sofisticação editorial.
- **Microinterações:** Transições suaves em todos os botões e links (`transition: all 0.3s ease`), com elevação de `-2px` no eixo Y e sombra refinada ao passar o mouse (`:hover`).
- **Espaçamento (White Space):** Padding generoso de `80px 0` em todas as seções para respiração visual e organização impecável.

---

### 🧭 Estrutura da Página e Navegação

O cabeçalho fixo (*fixed header*) contém rolagem suave (*smooth scroll*) para todas as seções, mantendo rigorosamente a ordem solicitada:

1. **Início (`#inicio`):**
   - Título principal: *"Bem-vindo ao escritório de advocacia especializado em direito do trabalho."*
   - Subtítulo: *"Estamos aqui para oferecer suporte jurídico de qualidade e orientações precisas para proteger os seus direitos. Entrar em contato conosco para mais informações."*
   - CTA em destaque: *"Agendamento online"* direcionando para a seção de agendamento.
   - Números de destaque: Atuação sólida desde 2007, especializações EPD, UNISANTA e USP.
   - Fotografia corporativa oficial de estúdio da Dra. Juliana Alves em terno escuro risca de giz apoiada na cadeira de couro bordô transmitindo máxima autoridade, credibilidade e formalidade.

2. **Fale Conosco (`#fale-conosco`):**
   - Frase marcante: *"Estou sempre em busca de novas oportunidades. Entre em contato."*
   - Contatos diretos em cards interativos:
     - Telefone / WhatsApp: `(13) 99601-2470`
     - E-mail: `julianaalvess.advogada@gmail.com`
     - Instagram: `@julianaalvessadv`

3. **Como Chegar (`#como-chegar`):**
   - Endereço exato integrado: `R. Acre, 994 - Cj. 01 - Jardim Virginia, Guarujá - SP, 11442-190`.
   - Iframe embed oficial do Google Maps apontando diretamente para o perfil comercial verificado: **JULIANA ALVES - ADVOGADA TRABALHISTA** (`0x94d1ff9b502685b3:0x27cfb9b3cbd9278e`).
   - Botão para abrir o link oficial do Google Maps e Waze com rotas diretas.
   - Card de destaque com Horário de Funcionamento:
     - **Segunda a Sexta-feira das 09:00 às 17:30 | Sábado de 09:00 às 12:00**
     - Indicador automático e dinâmico de status: *Aberto Agora* / *Fechado no Momento* com cálculo do horário real do sistema.

4. **Blog (`#blog`):**
   - Seção editorial em grade (grid) com as postagens solicitadas:
     1. *"Carnaval é feriado? Atenção, trabalhador!"*
     2. *"Janeiro Branco: a saúde mental da enfermagem"*
     3. *"Pediu demissão? Saiba quais são seus direitos!"*
   - **Modais interativos:** Ao clicar em *"Ler Artigo Completo"*, abre um leitor na tela com o artigo aprofundado, alertas práticos e botão direto para agendamento.

5. **Sobre a Advogada (`#sobre`):**
   - Título: *"Olá"*
   - Apresentação oficial: *"Olá, sou Juliana Alves, advogada especializada em Direito do Trabalho, com uma trajetória construída a partir de experiências práticas e acadêmicas que moldaram minha visão e prática jurídica."*
   - Fotografia oficial corporativa da Dra. Juliana sentada formalmente na cadeira executiva de couro bordô.
   - Resumo da trajetória desde 2007, histórico no mundo jurídico, vivência corporativa em **Recursos Humanos (RH)** e **departamento financeiro** (que expande a visão estratégica patronal e do trabalhador), além das especializações na **EPD**, **UNISANTA** e **USP**.
   - Compromisso de excelência e defesa combativa dos direitos dos trabalhadores.

6. **Agendamento (`#agendamento`):**
   - Formulário de agendamento online com validação e máscara automática de telefone `(13) 99601-2470`.
   - Opção de envio convencional com mensagem de confirmação.
   - Botão para **Agendar e Enviar Direto pelo WhatsApp**, já formatando automaticamente a mensagem com nome, telefone, perfil e resumo do caso.

---

### 📂 Estrutura de Arquivos

```
Dra Juliana Alves/
│
├── index.html                     # Estrutura semântica HTML5 completa
│
├── css/
│   └── style.css                  # Estilos responsivos, variáveis de cor, animações
│
├── js/
│   └── script.js                  # Lógica de rolagem, modais, máscara de telefone, status
│
├── assets/
│   └── images/
│       ├── logo.svg               # Logotipo versão escura
│       ├── logo-light.svg         # Logotipo versão clara (rodapé)
│       ├── favicon.svg            # Favicon com balança da justiça
│       ├── dra-juliana-hero.png   # Fotografia corporativa oficial de estúdio (Hero)
│       ├── dra-juliana-sobre.png  # Fotografia corporativa oficial na cadeira bordô (Sobre)
│       ├── icon-reclamacoes.svg   # Ícone do serviço de reclamações trabalhistas
│       ├── icon-assessoria.svg    # Ícone do serviço de assessoria a trabalhadores
│       ├── icon-empresas.svg      # Ícone do serviço de consultoria a empresas
│       ├── blog-carnaval.svg      # Capa do artigo de Carnaval
│       ├── blog-janeiro-branco.svg# Capa do artigo Janeiro Branco
│       └── blog-demissao.svg      # Capa do artigo Pedido de Demissão
│
└── README.md                      # Documentação completa do projeto
```

---

### 🚀 Como Visualizar

Basta dar dois cliques no arquivo `index.html` em qualquer computador (Windows, macOS ou Linux) para abrir no navegador padrão (Google Chrome, Microsoft Edge, Firefox, Safari, etc.). Não é necessário instalar nenhum servidor ou dependência adicional.
