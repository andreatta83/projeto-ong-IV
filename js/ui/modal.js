/*
 * ===============================================
 * JS/UI/MODAL.JS
 * ===============================================
 *
 * Controla a exibição e fechamento do modal.
 *
 */

let modalElement = null;

/**
 * Inicializa o modal (encontra e armazena o elemento)
 * @param {string} modalId - O ID do overlay do modal
 */
export function initModal(modalId) {
    modalElement = document.getElementById(modalId);
    if (!modalElement) {
        console.error('Elemento modal não encontrado:', modalId);
        return;
    }

    // Listener para fechar
    modalElement.addEventListener('click', (e) => {
        // Fecha ao clicar no 'X', em botões 'modal-close-btn', ou no overlay
        if (e.target.classList.contains('modal-close') || 
            e.target.closest('.modal-close-btn') ||
            e.target === modalElement) {
            closeModal();
        }
    });
}

/**
 * Abre o modal
 */
export function openModal() {
    modalElement?.classList.add('active');
}

/**
 * Fecha o modal
 */
export function closeModal() {
    modalElement?.classList.remove('active');
}
