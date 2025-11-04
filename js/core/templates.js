/*
 * ===============================================
 * JS/CORE/TEMPLATES.JS
 * ===============================================
 *
 * Cumpre o requisito "sistema de templates JavaScript".
 * Define os dados dos projetos e gera o HTML
 * dinamicamente.
 *
 */

// 1. Dados dos Projetos (substitui o HTML estático)
const projectsData = [
    {
        title: "Projeto Prato Cheio",
        imageUrl: "https://placehold.co/600x400/f59e0b/ffffff?text=Projeto+Alimentar",
        description: "Nosso projeto foca na arrecadação e distribuição de cestas básicas para famílias em situação de vulnerabilidade. Garantir o básico é o primeiro passo para a dignidade.",
        tags: [
            { type: "warning", text: "Segurança Alimentar" },
            { type: "info", text: "Comunidade" }
        ]
    },
    {
        title: "Educação que Liberta",
        imageUrl: "https://placehold.co/600x400/10b981/ffffff?text=Projeto+Educação",
        description: "Acreditamos no poder transformador da educação. Este projeto oferece aulas de reforço, material escolar e acesso a cursos profissionalizantes para jovens.",
        tags: [
            { type: "success", text: "Educação" },
            { type: "info", text: "Jovens" }
        ]
    },
    {
        title: "Conectando Gerações",
        imageUrl: "https://placehold.co/600x400/6366f1/ffffff?text=Inclusão+Digital",
        description: "Levamos inclusão digital para idosos, ensinando o uso de smartphones e computadores para que possam se conectar com suas famílias e ter acesso a serviços.",
        tags: [
            { type: "info", text: "Inclusão Digital" },
            { type:g: "success", text: "Idosos" }
        ]
    }
];

// 2. Função de Template (Gera um Card)
function createProjectCard(project) {
    // Gera as tags HTML
    const tagsHtml = project.tags.map(tag => 
        `<span class="tag tag-${tag.type}">${tag.text}</span>`
    ).join('');

    // Retorna o HTML completo do card
    return `
        <article class="col-md-6 col-lg-4">
            <div class="card">
                <img 
                    src="${project.imageUrl}" 
                    alt="Imagem do ${project.title}"
                    class="card-img"
                    onerror="this.src='https://placehold.co/600x400/cccccc/ffffff?text=Erro+imagem'"
                >
                <div class="card-body">
                    <h3 class="card-title">${project.title}</h3>
                    <div class="tag-list" style="margin-bottom: var(--space-2);">
                        ${tagsHtml}
                    </div>
                    <p class="card-text">
                        ${project.description}
                    </p>
                </div>
            </div>
        </article>
    `;
}

// 3. Função Principal (Gera a Página Completa)
export function generateProjectsPage() {
    // Gera todos os cards
    const cardsHtml = projectsData.map(createProjectCard).join('');

    // Retorna o HTML da página de projetos
    return `
        <div class="container">
            <h2 style="text-align: center; margin-bottom: var(--space-5);">Nossos Projetos</h2>
            
            <div class="row">
                ${cardsHtml}
            </div>

            <!-- Seção "Como Ajudar" (mantida) -->
            <section class="row" style="margin-top: var(--space-5);">
                <div class="col-md-6">
                    <div style="background-color: var(--color-neutral-lightest); padding: var(--space-4); border-radius: var(--border-radius); box-shadow: var(--box-shadow); height: 100%;">
                        <h3>Seja Voluntário</h3>
                        <p>Seu tempo e talento são valiosos. Precisamos de voluntários para diversas áreas. Faça parte da mudança.</p>
                        <a href="/cadastro" class="btn btn-primary" data-route>
                            Quero ser voluntário
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div style="background-color: var(--color-secondary); color: var(--color-neutral-darkest); padding: var(--space-4); border-radius: var(--border-radius); box-shadow: var(--box-shadow); height: 100%;">
                        <h3>Como Doar</h3>
                        <p>Sua contribuição financeira nos permite manter nossos projetos ativos e expandir nosso alcance.</p>
                        <div style="background-color: var(--color-neutral-lightest); padding: var(--space-3); border-radius: var(--border-radius); color: var(--color-neutral-darkest);">
                            <p><strong>Chave PIX (CNPJ):</strong> 12.345.678/0001-99</p>
                            <p style="margin-top: var(--space-1); margin-bottom: 0;"><strong>Banco:</strong> 001 - Banco do Brasil | <strong>Ag:</strong> 1234-5 | <strong>CC:</strong> 54321-0</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}
