const livrosContainer = document.getElementById('livros-container');
const form = document.getElementById('form-livro');
const btnListar = document.getElementById('btn-listar');
const btnAdicionar = document.getElementById('btn-adicionar');
const formSection = document.getElementById('formulario');
const listaSection = document.getElementById('lista-livros');
const inputBusca = document.getElementById('input-busca');
const btnBuscar = document.getElementById('btn-buscar');

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

function buscarLivros(titulo) {
  fetch('/api/livros')
    .then(response => response.json())
    .then(livros => {
      const livrosFiltrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(titulo.toLowerCase())
      );

      // Se encontrar no JSON local, mostra
      if (livrosFiltrados.length > 0) {
        renderLista(livrosFiltrados);
      } else {
        // Se não encontrou, busca na OpenLibrary
        fetch(`/api/openlibrary/${encodeURIComponent(titulo)}`)
          .then(response => response.json())
          .then(livrosExternos => {
            if (livrosExternos.length > 0) {
              renderLista(livrosExternos, true);
            } else {
              livrosContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
            }
          })
          .catch(err => {
            console.error("Erro na busca externa:", err);
            livrosContainer.innerHTML = '<p>Erro ao buscar o livro.</p>';
          });
      }
    });
}

function renderLista(livros, externos = false) {
  livrosContainer.innerHTML = '';
  livros.forEach(l => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${l.titulo}</h3>
      <p><strong>Autor:</strong> ${l.autor}</p>
      <p><strong>Ano:</strong> ${l.ano}</p>
      ${
        externos
          ? `<button onclick="adicionarLivro('${l.titulo}', '${l.autor}', '${l.ano}')">Adicionar ao catálogo</button>`
          : `<button onclick="removerLivro(${l.id})">Remover</button>`
      }
    `;
    livrosContainer.appendChild(card);
  });
}


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


btnBuscar.addEventListener('click', () => {
  const titulo = inputBusca.value.trim();
  if (titulo) {
    buscarLivros(titulo);
  } else {
    renderLivros();
  }
});


document.addEventListener('DOMContentLoaded', () => {
  renderLivros();
});
