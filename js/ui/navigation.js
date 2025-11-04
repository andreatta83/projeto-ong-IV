/*
 * ===============================================
 * JS/UI/NAVIGATION.JS
 * ===============================================
 *
 * Controla a lógica do menu hambúrguer (mobile).
 *
 */

export function initMobileMenu(toggleId, listId) {
    const navToggle = document.getElementById(toggleId);
    const navList = document.getElementById(listId);

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            // Adiciona/Remove classe 'active' no botão (para animação do 'X')
            navToggle.classList.toggle('active');
            
            // Adiciona/Remove classe 'active' na lista (para mostrar/esconder)
            navList.classList.toggle('active');
        });
    }
}
