# projeto-ong-IV
Atividade IV
ONG Conexão Solidária 

Projeto acadêmico de desenvolvimento web front-end que simula o site de uma ONG. O projeto foi construído em 4 entregas, evoluindo de um HTML estático para uma Single Page Application (SPA) modular, acessível e dinâmica.

✨ Funcionalidades Principais

Arquitetura SPA: Navegação dinâmica sem recarregamento de página, utilizando a History API.

Roteamento Dinâmico: Carregamento de "páginas" (templates HTML) e "componentes" (templates JS) sob demanda.

Templates JavaScript: Geração dinâmica da página de projetos a partir de um objeto de dados.

Validação de Formulário Avançada:

Validação de consistência de dados em tempo real (CPF, Idade Mínima).

Feedback visual instantâneo para o usuário (valid/invalid).

Máscaras de input para CPF, Telefone e CEP.

API Externa: Autopreenchimento de endereço via API (ViaCEP) ao digitar o CEP.

Acessibilidade (WCAG 2.1 AA):

Suporte completo a leitores de tela, com anúncios de mudança de rota.

Navegação total via teclado (links, botões, formulários, dropdown).

Semântica HTML (ARIA roles, landmarks).

Seletor de Tema: Modo Claro (Padrão), Modo Escuro e Modo de Alto Contraste.

🚀 Tecnologias Utilizadas

HTML5: Estrutura semântica (main, nav, section, header, footer).

CSS3:

Design System completo com Variáveis CSS (Cores, Tipografia, Espaçamento).

Leiaute responsivo com CSS Grid (grid de 12 colunas) e Flexbox.

Componentes modulares (BEM) e estilização de formulários.

JavaScript (ES6+):

Arquitetura modular (import/export).

Manipulação do DOM (SPA, Modal, Menu).

Programação assíncrona (fetch, async/await).

Gerenciamento de estado local (localStorage para o tema).
