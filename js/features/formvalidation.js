/*
 * ===============================================
 * JS/FEATURES/FORMVALIDATION.JS
 * ===============================================
 *
 * Cumpre o requisito "verificação de consistência de dados".
 * - Validação de CPF (matemática).
 * - Validação de Idade (> 18 anos).
 * - Aplicação de máscaras.
 * - Exibição de erros.
 *
 */

import { openModal } from '../ui/modal.js';

let form = null;
const inputsToValidate = new Map();

/**
 * Inicializa a validação para um formulário específico.
 * @param {string} formId - O ID do formulário
 */
export function initFormValidation(formId) {
    form = document.getElementById(formId);
    if (!form) return;

    // Mapeia os inputs que precisam de validação e suas regras
    inputsToValidate.clear();
    inputsToValidate.set('nome', { el: form.nome, rules: ['required'] });
    inputsToValidate.set('email', { el: form.email, rules: ['required', 'email'] });
    inputsToValidate.set('nascimento', { el: form.nascimento, rules: ['required', 'age'] });
    inputsToValidate.set('cpf', { el: form.cpf, rules: ['required', 'cpf'] });
    inputsToValidate.set('telefone', { el: form.telefone, rules: ['required', 'phone'] });
    inputsToValidate.set('cep', { el: form.cep, rules: ['required', 'cep'] });
    inputsToValidate.set('endereco', { el: form.endereco, rules: ['required'] });
    inputsToValidate.set('bairro', { el: form.bairro, rules: ['required'] });
    inputsToValidate.set('cidade', { el: form.cidade, rules: ['required'] });
    inputsToValidate.set('estado', { el: form.estado, rules: ['required'] });

    // Aplica máscaras e listeners de input
    inputsToValidate.forEach(({ el }, name) => {
        if (!el) return;
        
        el.addEventListener('input', (e) => {
            // Aplica máscaras
            if (name === 'cpf') e.target.value = maskCPF(e.target.value);
            if (name === 'telefone') e.target.value = maskPhone(e.target.value);
            if (name === 'cep') e.target.value = maskCEP(e.target.value);

            // Valida em tempo real
            validateField(el, inputsToValidate.get(name).rules);
        });
    });

    // Listener de Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateAllFields()) {
            console.log('Formulário válido. Enviando (simulado)...');
            openModal(); // Abre o modal de sucesso
            form.reset();
            // Limpa classes de validação
            inputsToValidate.forEach(({el}) => {
                el?.classList.remove('valid', 'invalid');
                clearError(el);
            });
        } else {
            console.log('Formulário inválido. Verifique os erros.');
        }
    });
}

// --- Funções de Validação de Consistência ---

/**
 * Valida todos os campos do formulário
 * @returns {boolean} - True se todos forem válidos
 */
function validateAllFields() {
    let isFormValid = true;
    inputsToValidate.forEach(({ el, rules }) => {
        if (!validateField(el, rules)) {
            isFormValid = false;
        }
    });
    return isFormValid;
}

/**
 * Valida um único campo
 * @param {HTMLElement} el - O elemento do input
 * @param {Array<string>} rules - As regras a aplicar (ex: ['required', 'cpf'])
 * @returns {boolean} - True se for válido
 */
function validateField(el, rules) {
    if (!el) return false;
    let errorMessage = '';

    for (const rule of rules) {
        switch (rule) {
            case 'required':
                if (el.value.trim() === '') errorMessage = 'Este campo é obrigatório.';
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) errorMessage = 'Por favor, insira um e-mail válido.';
                break;
            case 'age':
                if (!isOver18(el.value)) errorMessage = 'Você deve ter pelo menos 18 anos.';
                break;
            case 'cpf':
                if (!isValidCPF(el.value)) errorMessage = 'CPF inválido. Verifique os dígitos.';
                break;
            case 'phone':
                // O pattern HTML já faz a maior parte, mas verificamos o comprimento
                if (el.value.replace(/\D/g, '').length < 10) errorMessage = 'Telefone inválido.';
                break;
            case 'cep':
                if (el.value.replace(/\D/g, '').length < 8) errorMessage = 'CEP inválido.';
                break;
        }
        if (errorMessage) break; // Para no primeiro erro
    }

    if (errorMessage) {
        showError(el, errorMessage);
        return false;
    } else {
        clearError(el);
        return true;
    }
}

/**
 * [CONSISTÊNCIA] Verifica se a data de nascimento é > 18 anos
 */
function isOver18(dateString) {
    if (!dateString) return false;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

/**
 * [CONSISTÊNCIA] Valida o CPF matematicamente
 */
function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove formatação
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; // Rejeita 111.111...

    let sum = 0;
    let remainder;

    // Valida primeiro dígito verificador
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    // Valida segundo dígito verificador
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

// --- Funções de Feedback Visual ---

function showError(input, message) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    const feedbackEl = input.nextElementSibling;
    if (feedbackEl && feedbackEl.classList.contains('validation-feedback')) {
        feedbackEl.textContent = message;
        feedbackEl.classList.add('invalid');
        feedbackEl.classList.remove('valid');
    }
}

function clearError(input) {
    input.classList.remove('invalid');
    if (input.value.trim() !== '') {
         input.classList.add('valid');
    }
    const feedbackEl = input.nextElementSibling;
    if (feedbackEl && feedbackEl.classList.contains('validation-feedback')) {
        feedbackEl.textContent = '';
        feedbackEl.classList.remove('invalid');
        if (input.value.trim() !== '') {
             feedbackEl.classList.add('valid');
        }
    }
}

// --- Funções de Máscara ---

const maskCPF = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

const maskPhone = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d{4})$/, '$1-$2');
};

const maskCEP = (value) => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d{3})$/, '$1-$2');
};
