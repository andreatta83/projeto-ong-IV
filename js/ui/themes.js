/*
 * ===============================================
 * JS/UI/THEME.JS
 * ===============================================
 *
 * Controla a lógica do Seletor de Tema (Acessibilidade).
 *
 * IMPORTANTE: Este script é carregado de forma síncrona no <head>
 * para aplicar o tema ANTES da página ser renderizada,
 * evitando o "flash of incorrect theme".
 *
 */

const THEME_STORAGE_KEY = 'theme-preference';
const THEMES = ['light', 'dark', 'contrast'];
let currentThemeIndex = 0;

/**
 * Aplica o tema ao <html> e o salva no localStorage
 * @param {string} theme - O nome do tema (light, dark, contrast)
 */
function applyTheme(theme) {
    if (!THEMES.includes(theme)) {
        theme = THEMES[0]; // Padrão
    }
    
    // 1. Aplica o atributo 'data-theme' no <html>
    document.documentElement.setAttribute('data-theme', theme);
    
    // 2. Salva a preferência
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // 3. Atualiza o índice atual
    currentThemeIndex = THEMES.indexOf(theme);
    
    // 4. Atualiza a label do botão (se ele já existir)
    updateButtonLabel(theme);
}

/**
 * Carrega a preferência de tema ao iniciar a página
 * @returns {string} O tema carregado
 */
function loadTheme() {
    // 1. Tenta carregar do localStorage
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && THEMES.includes(savedTheme)) {
        return savedTheme;
    }

    // 2. Se não houver, tenta detectar a preferência do sistema (Modo Escuro)
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (systemPrefersDark.matches) {
        return 'dark';
    }
    
    // 3. Se não, usa o padrão (light)
    return THEMES[0];
}

/**
 * Atualiza o 'aria-label' do botão para anunciar a próxima mudança
 * @param {string} currentTheme - O tema que acabou de ser aplicado
 */
function updateButtonLabel(currentTheme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;

    let nextThemeName;
    const nextTheme = THEMES[(currentThemeIndex + 1) % THEMES.length];
    
    if (nextTheme === 'light') nextThemeName = "Modo Claro";
    else if (nextTheme === 'dark') nextThemeName = "Modo Escuro";
    else nextThemeName = "Modo Alto Contraste";

    btn.setAttribute('aria-label', `Mudar para ${nextThemeName}`);
}

/**
 * Alterna para o próximo tema no ciclo
 */
function cycleTheme() {
    // Incrementa o índice e usa o módulo (%) para voltar ao início
    currentThemeIndex = (currentThemeIndex + 1) % THEMES.length;
    const nextTheme = THEMES[currentThemeIndex];
    applyTheme(nextTheme);
}

/**
* Inicializa o listener do botão
*/
function initThemeSwitcher(buttonId) {
    // Espera o DOM carregar para adicionar o listener
    document.addEventListener('DOMContentLoaded', () => {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.addEventListener('click', cycleTheme);
            // Atualiza a label do botão com o tema que foi carregado
            updateButtonLabel(THEMES[currentThemeIndex]);
        }
    });
}

// --- Execução Imediata ---
// Aplica o tema ANTES do DOM carregar
const initialTheme = loadTheme();
applyTheme(initialTheme);

// Expõe a função de inicialização para ser chamada no main.js
// ou escuta o DOM aqui mesmo.
// Vamos escutar o DOM aqui para manter o 'main.js' limpo.

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
        btn.addEventListener('click', cycleTheme);
    }
});
