const livrosContainer = document.getElementById('livros-container');
const form = document.getElementById('form-livro');
const formSection = document.getElementById('formulario');
const listaSection = document.getElementById('lista-livros');

const livros = [
  { titulo: "O Hobbit", autor: "J.R.R. Tolkien", ano: 1937 },
  { titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899 },
];

function renderLivros() {
  livrosContainer.innerHTML = "";
  livros.forEach(l => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${l.titulo}</h3>
      <p><strong>Autor:</strong> ${l.autor}</p>
      <p><strong>Ano:</strong> ${l.ano}</p>
    `;
    livrosContainer.appendChild(card);
  });
}

document.getElementById('btn-listar').addEventListener('click', () => {
  listaSection.classList.remove('hidden');
  formSection.classList.add('hidden');
  renderLivros();
});

document.getElementById('btn-adicionar').addEventListener('click', () => {
  formSection.classList.remove('hidden');
  listaSection.classList.add('hidden');
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const novoLivro = {
    titulo: form.titulo.value,
    autor: form.autor.value,
    ano: form.ano.value
  };
  livros.push(novoLivro);
  form.reset();
  alert("Livro adicionado!");
  renderLivros();
});
