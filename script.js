/**
 * ATIVIDADE ACADÊMICA: REVISÃO DE JAVASCRIPT
 * TEMA: Entrada, Saída e Persistência de Dados com localStorage
 * 
 * Este script demonstra como capturar dados de um formulário, 
 * armazená-los de forma persistente no navegador e exibi-los 
 * dinamicamente na página.
 */

// 1. SELEÇÃO DE ELEMENTOS DO DOM
const dataForm = document.getElementById('dataForm');
const dataDisplay = document.getElementById('dataDisplay');
const btnClearAll = document.getElementById('btnClearAll');

// 2. INICIALIZAÇÃO: Carregar dados ao abrir a página
// Evento disparado quando o DOM está totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    renderData();
});

// 3. CAPTURA DE DADOS DO FORMULÁRIO
dataForm.addEventListener('submit', (event) => {
    // Impede o comportamento padrão de recarregar a página
    event.preventDefault();

    // Captura os valores dos campos
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    // Validação básica (campos obrigatórios)
    if (!name || !email) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Cria um objeto com os novos dados
    const newEntry = {
        id: Date.now(), // Gera um ID único baseado no timestamp
        name: name,
        email: email
    };

    // Salva no localStorage
    saveToStorage(newEntry);

    // Limpa o formulário e atualiza a tela
    dataForm.reset();
    renderData();
});

// 4. LÓGICA DE PERSISTÊNCIA (localStorage)
function saveToStorage(entry) {
    // Recupera a lista atual do localStorage ou cria uma nova se estiver vazia
    // É necessário converter a string JSON de volta para Array com JSON.parse()
    const currentData = JSON.parse(localStorage.getItem('academic_data')) || [];

    // Adiciona o novo objeto ao array
    currentData.push(entry);

    // Salva o array atualizado no localStorage
    // É necessário converter o Array para string JSON com JSON.stringify()
    localStorage.setItem('academic_data', JSON.stringify(currentData));
}

// 5. EXIBIÇÃO DINÂMICA (Saída de Dados)
function renderData() {
    // Recupera os dados
    const currentData = JSON.parse(localStorage.getItem('academic_data')) || [];

    // Limpa o container antes de renderizar
    dataDisplay.innerHTML = '';

    // Verifica se há dados para exibir
    if (currentData.length === 0) {
        dataDisplay.innerHTML = '<p class="empty-msg">Nenhum registro encontrado localmente.</p>';
        return;
    }

    // Itera sobre os dados e cria elementos HTML para cada item
    currentData.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('data-item');
        
        itemElement.innerHTML = `
            <div class="data-info">
                <h3>${item.name}</h3>
                <p>${item.email}</p>
            </div>
            <button onclick="deleteItem(${item.id})" class="btn-delete">Excluir</button>
        `;
        
        dataDisplay.appendChild(itemElement);
    });
}

// 6. FUNCIONALIDADES COMPLEMENTARES
// Função para excluir um item individual
function deleteItem(id) {
    let currentData = JSON.parse(localStorage.getItem('academic_data')) || [];
    
    // Filtra o array para remover o item com o ID correspondente
    currentData = currentData.filter(item => item.id !== id);
    
    // Salva a nova lista e atualiza a interface
    localStorage.setItem('academic_data', JSON.stringify(currentData));
    renderData();
}

// Evento para limpar todo o armazenamento
btnClearAll.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja excluir todos os registros?')) {
        localStorage.removeItem('academic_data');
        renderData();
    }
});

/**
 * NOTA CONCEITUAL:
 * O localStorage não é um Banco de Dados Relacional (como SQL) ou NoSQL (como MongoDB).
 * Ele é um armazenamento simples do tipo CHAVE: VALOR que reside no navegador do usuário.
 * É excelente para persistência leve, mas não substitui um backend para sistemas complexos.
 */
