const livrosContainer = document.getElementById('livros-container');
const form = document.getElementById('form-livro');
const btnListar = document.getElementById('btn-listar');
const btnAdicionar = document.getElementById('btn-adicionar');
const formSection = document.getElementById('formulario');
const listaSection = document.getElementById('lista-livros');

function renderLivros() {
  fetch('/api/livros')
    .then(response => response.json())
    .then(livros => {
      livrosContainer.innerHTML = '';
      livros.forEach(l => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h3>${l.titulo}</h3>
          <p><strong>Autor:</strong> ${l.autor}</p>
          <p><strong>Ano:</strong> ${l.ano}</p>
          <button onclick="removerLivro(${l.id})">Remover</button>
        `;
        livrosContainer.appendChild(card);
      });
    });
}

function adicionarLivro(titulo, autor, ano) {
  fetch('/api/livros', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, autor, ano })
  })
    .then(response => response.json())
    .then(() => {
      renderLivros();
      form.reset();
      formSection.classList.add('hidden');
      listaSection.classList.remove('hidden');
    });
}
function removerLivro(id) {
  fetch(`/api/livros/${id}`, {
    method: 'DELETE'
  }).then(() => renderLivros());
}

// Eventos para alternar entre seções
btnListar.addEventListener('click', () => {
  formSection.classList.add('hidden');
  listaSection.classList.remove('hidden');
  renderLivros();
});

btnAdicionar.addEventListener('click', () => {
  listaSection.classList.add('hidden');
  formSection.classList.remove('hidden');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titulo = form.elements['titulo'].value;
  const autor = form.elements['autor'].value;
  const ano = form.elements['ano'].value;
  adicionarLivro(titulo, autor, ano);
});

document.addEventListener('DOMContentLoaded', () => {
  renderLivros();
});
