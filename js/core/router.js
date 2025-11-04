/*
 * ===============================================
 * JS/CORE/ROUTER.JS
 * ===============================================
 *
 * Implementa o sistema de Single Page Application (SPA).
 * - Intercepta cliques em links.
 * - Carrega conteúdo dinamicamente via fetch.
 * - Atualiza o histórico do navegador (History API).
 * - Executa scripts específicos de cada página.
 *
 */

import { generateProjectsPage } from './templates.js';
import { initFormValidation } from '../features/formValidation.js';
import { initCepAutocomplete } from '../features/cep.js';

// Container principal onde o conteúdo será injetado
const appRoot = document.getElementById('app-root');
const navList = document.getElementById('nav-list');
const navToggle = document.getElementById('nav-toggle');

/**
 * Define as rotas da aplicação.
 * 'template' é o arquivo HTML a ser buscado.
 * 'onLoad' é a função JS a ser executada *após* o carregamento da página.
 */
const routes = {
    '/': {
        template: 'pages/inicio.html',
        onLoad: () => console.log('Página Inicial carregada.')
    },
    '/projetos': {
        // Esta rota usa um template JS, não um arquivo HTML
        template: null, 
        onLoad: () => {
            // Gera o HTML dos projetos e insere no DOM
            appRoot.innerHTML = generateProjectsPage();
            console.log('Página de Projetos carregada (via template JS).');
        }
    },
    '/cadastro': {
        template: 'pages/cadastro.html',
        onLoad: () => {
            // Após carregar o form, inicializa suas features
            console.log('Página de Cadastro carregada. Inicializando validação...');
            initFormValidation('cadastro-form');
            initCepAutocomplete('cep');
        }
    }
};

/**
 * Carrega o conteúdo de uma rota
 * @param {string} path - O caminho da URL (ex: "/cadastro")
 */
async function loadRoute(path) {
    if (!appRoot) return;

    // Limpa o conteúdo atual
    appRoot.innerHTML = '<h2 style="text-align: center;">Carregando...</h2>';

    // Trata âncoras (ex: /#sobre)
    let cleanPath = path.split('#')[0];
    if (cleanPath === '') cleanPath = '/';

    // Encontra a rota correspondente
    const route = routes[cleanPath] || routes['/']; // Fallback para home

    if (route.template) {
        // Rota baseada em arquivo HTML (fetch)
        try {
            const response = await fetch(route.template);
            if (!response.ok) throw new Error('Página não encontrada');
            const html = await response.text();
            appRoot.innerHTML = html;
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            appRoot.innerHTML = '<h2 style="text-align: center; color: var(--color-danger);">Erro ao carregar a página.</h2>';
        }
    }

    // Executa a função onLoad da rota (seja template HTML ou JS)
    if (route.onLoad) {
        route.onLoad();
    }

    // Atualiza links ativos e fecha menu mobile
    updateActiveLink(cleanPath);
    closeMobileMenu();
    
    // Rola para a âncora, se houver
    const anchor = path.split('#')[1];
    if (anchor) {
        setTimeout(() => { // Espera o DOM atualizar
            document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        window.scrollTo(0, 0); // Rola para o topo
    }
}

/**
 * Atualiza qual link de navegação está com a classe 'active'
 * @param {string} path - O caminho da rota atual
 */
function updateActiveLink(path) {
    document.querySelectorAll('.nav-link[data-route]').forEach(link => {
        if (link.getAttribute('href').startsWith(path) && path !== '/') {
             // Tratamento especial para dropdown
            if (link.closest('.dropdown-item')) {
                 link.closest('.nav-item').querySelector('.nav-link.dropdown-toggle')?.classList.add('active');
            } else {
                 link.classList.add('active');
            }
        } else if (link.getAttribute('href') === '/' && path === '/') {
             link.classList.add('active');
        }
        else {
            link.classList.remove('active');
             link.closest('.nav-item').querySelector('.nav-link.dropdown-toggle')?.classList.remove('active');
        }
    });
     // Garante que o link 'Início' fique ativo em '/'
    if (path === '/') {
        document.querySelector('.nav-link[href="/"]').classList.add('active');
    }
}


/**
 * Fecha o menu mobile (usado após a navegação)
 */
function closeMobileMenu() {
    navList?.classList.remove('active');
    navToggle?.classList.remove('active');
}

/**
 * Intercepta cliques em links com [data-route]
 */
function handleLinkClick(event) {
    const link = event.target.closest('a[data-route]');
    if (link) {
        event.preventDefault(); // Previne o recarregamento da página
        const path = link.getAttribute('href');
        
        // Atualiza a URL na barra do navegador
        history.pushState({ path }, '', path);
        
        // Carrega o conteúdo da nova rota
        loadRoute(path);
    }
}

/**
 * Lida com os botões "Voltar" e "Avançar" do navegador
 */
function handlePopState(event) {
    const path = event.state?.path || window.location.pathname;
    loadRoute(path);
}

/**
 * Inicializa o roteador
 */
export function initRouter() {
    // Adiciona o listener de clique global
    document.addEventListener('click', handleLinkClick);
    
    // Adiciona o listener do histórico (back/forward)
    window.addEventListener('popstate', handlePopState);

    // Carrega a rota inicial
    loadRoute(window.location.pathname + window.location.hash);
}
