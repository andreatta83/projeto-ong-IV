/*
 * ===============================================
 * JS/FEATURES/CEP.JS
 * ===============================================
 *
 * Feature dinâmica: Autocomplete de endereço usando a API ViaCEP.
 *
 */

let cepInput = null;
let loadingEl = null;

export function initCepAutocomplete(cepInputId) {
    cepInput = document.getElementById(cepInputId);
    loadingEl = document.getElementById('cep-loading');
    
    if (cepInput) {
        cepInput.addEventListener('blur', handleCepBlur);
    }
}

async function handleCepBlur(e) {
    const cep = e.target.value.replace(/\D/g, ''); // Limpa CEP
    if (cep.length !== 8) return; // Só busca se tiver 8 dígitos

    if (loadingEl) loadingEl.style.display = 'inline';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error('CEP não encontrado');
        
        const data = await response.json();
        
        if (data.erro) {
            // CEP não encontrado
             const feedback = cepInput.nextElementSibling;
             if (feedback) {
                 feedback.textContent = 'CEP não encontrado.';
                 feedback.classList.add('invalid');
             }
        } else {
            // Sucesso! Preenche os campos
            fillAddressFields(data);
        }

    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
         const feedback = cepInput.nextElementSibling;
         if (feedback) {
             feedback.textContent = 'Erro ao buscar CEP.';
             feedback.classList.add('invalid');
         }
    } finally {
        if (loadingEl) loadingEl.style.display = 'none';
    }
}

function fillAddressFields(data) {
    const form = document.getElementById('cadastro-form');
    if (!form) return;

    if (data.logradouro) form.endereco.value = data.logradouro;
    if (data.bairro) form.bairro.value = data.bairro;
    if (data.localidade) form.cidade.value = data.localidade;
    if (data.uf) form.estado.value = data.uf;
    
    // Foca no campo de endereço (ou número) para o usuário
    form.endereco.focus();

    // Re-valida os campos preenchidos
    form.endereco.dispatchEvent(new Event('input'));
    form.bairro.dispatchEvent(new Event('input'));
    form.cidade.dispatchEvent(new Event('input'));
    form.estado.dispatchEvent(new Event('input'));
}
