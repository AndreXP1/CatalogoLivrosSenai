// === Elementos del DOM ===
const livrosContainer = document.getElementById('livros-container');
const form = document.getElementById('form-livro');
const btnListar = document.getElementById('btn-listar');
const btnAdicionar = document.getElementById('btn-adicionar');
const formSection = document.getElementById('formulario');
const listaSection = document.getElementById('lista-livros');
const inputBusca = document.getElementById('input-busca');
const btnBuscar = document.getElementById('btn-buscar');

// === Funciones ===

// Renderiza todos los libros desde MongoDB
function renderLivros() {
  fetch('/api/livros')
    .then(response => response.json())
    .then(livros => {
      livrosContainer.innerHTML = '';

      if (livros.length === 0) {
        livrosContainer.innerHTML = '<p>Nenhum livro cadastrado.</p>';
        return;
      }

      livros.forEach(l => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h3>${l.titulo}</h3>
          <p><strong>Autor:</strong> ${l.autor || 'Desconhecido'}</p>
          <p><strong>Ano:</strong> ${l.ano || 'N/A'}</p>
          <button onclick="removerLivro('${l._id}')">Remover</button>
        `;
        livrosContainer.appendChild(card);
      });
    })
    .catch(err => console.error('Erro ao carregar livros:', err));
}

// Adiciona livro novo no MongoDB
function adicionarLivro(titulo, autor, ano) {
  // Garantir que ano é número
  const anoNumero = Number(ano) || 0;

  fetch('/api/livros', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, autor, ano: anoNumero })
  })
    .then(response => response.json())
    .then(() => {
      renderLivros();
      form.reset();
      formSection.classList.add('hidden');
      listaSection.classList.remove('hidden');
    })
    .catch(err => console.error('Erro ao adicionar livro:', err));
}

// Remover livro pelo ID
function removerLivro(id) {
  fetch(`/api/livros/${id}`, { method: 'DELETE' })
    .then(() => renderLivros())
    .catch(err => console.error('Erro ao remover livro:', err));
}

// Buscar livros locais e, se não achar, buscar na OpenLibrary
async function buscarLivros(titulo) {
  const response = await fetch('/api/livros');
  const livros = await response.json();

  const livrosFiltrados = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(titulo.toLowerCase())
  );

  livrosContainer.innerHTML = '';

  if (livrosFiltrados.length > 0) {
    // Mostrar livros encontrados localmente
    livrosFiltrados.forEach(l => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${l.titulo}</h3>
        <p><strong>Autor:</strong> ${l.autor || 'Desconhecido'}</p>
        <p><strong>Ano:</strong> ${l.ano || 'N/A'}</p>
        <button onclick="removerLivro('${l._id}')">Remover</button>
      `;
      livrosContainer.appendChild(card);
    });
  } else {
    // Buscar na OpenLibrary
    const apiResponse = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(titulo)}&limit=3`
    );
    const data = await apiResponse.json();

    if (data.docs && data.docs.length > 0) {
      livrosContainer.innerHTML = '<h3>📚 Livros encontrados na OpenLibrary:</h3>';

      data.docs.forEach(doc => {
        const book = {
          titulo: doc.title,
          autor: doc.author_name ? doc.author_name[0] : 'Desconhecido',
          ano: doc.first_publish_year || 'N/A'
        };

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h3>${book.titulo}</h3>
          <p><strong>Autor:</strong> ${book.autor}</p>
          <p><strong>Ano:</strong> ${book.ano}</p>
          <button class="btn-add"
            data-titulo="${book.titulo}"
            data-autor="${book.autor}"
            data-ano="${book.ano}">
            ➕ Adicionar ao Catálogo
          </button>
        `;
        livrosContainer.appendChild(card);
      });

      // Eventos para adicionar livros da OpenLibrary
      document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', e => {
          const titulo = e.target.dataset.titulo;
          const autor = e.target.dataset.autor;
          const ano = e.target.dataset.ano;
          adicionarLivro(titulo, autor, ano);
        });
      });
    } else {
      livrosContainer.innerHTML = '<p>Nenhum livro encontrado.</p>';
    }
  }
}

// === Eventos ===

// Botón "Listar livros"
btnListar.addEventListener('click', () => {
  formSection.classList.add('hidden');
  listaSection.classList.remove('hidden');
  renderLivros();
});

// Botón "Adicionar livro"
btnAdicionar.addEventListener('click', () => {
  listaSection.classList.add('hidden');
  formSection.classList.remove('hidden');
});

// Envio do formulário
form.addEventListener('submit', e => {
  e.preventDefault();
  const titulo = form.elements['titulo'].value.trim();
  const autor = form.elements['autor'].value.trim();
  const ano = form.elements['ano'].value.trim();

  if (!titulo || !autor || !ano) {
    alert('Preencha todos os campos!');
    return;
  }

  adicionarLivro(titulo, autor, ano);
});

// Botón "Buscar"
btnBuscar.addEventListener('click', () => {
  const titulo = inputBusca.value.trim();
  if (titulo) buscarLivros(titulo);
  else renderLivros();
});

// Cargar lista al iniciar
document.addEventListener('DOMContentLoaded', () => renderLivros());
