* `app.js` → servidor principal (Express)
* `db.js` → módulo de conexão e operações de banco de dados
* `package.json` → dependências Node.js
* `requirements.txt` → dependências complementares (talvez do banco ou testes)
* Branches: `BackEnd`, `FrontEnd`, `BancoDados`, `main`

---

# **DOCUMENTAÇÃO TÉCNICA DO SISTEMA “CATÁLOGO DE LIVROS SENAI”**

## **1. Introdução**

O projeto **Catálogo de Livros SENAI** foi desenvolvido como parte do curso **Programador Backend** do **SENAI/SC**, com o objetivo de criar uma aplicação web para o gerenciamento de livros.
O sistema permite realizar o cadastro, listagem, consulta e futura manipulação de registros de livros, de forma integrada entre o **frontend**, **backend** e **banco de dados**.

A aplicação foi planejada para ser modular, escalável e de fácil manutenção, seguindo boas práticas de desenvolvimento e versionamento em múltiplas branches no GitHub.

---

## **2. Objetivos do Sistema**

* Oferecer uma interface simples para o cadastro e visualização de livros.
* Implementar um backend em Node.js com Express para lidar com requisições HTTP.
* Garantir a persistência de dados através de um módulo de banco de dados (`db.js`).
* Manter separação clara entre backend, frontend e banco.
* Promover o aprendizado coletivo de desenvolvimento colaborativo via Git e GitHub.

---

## **3. Arquitetura da Aplicação**

A arquitetura do sistema segue o modelo **cliente-servidor** e é dividida em três camadas principais:

* **Frontend (Interface do Usuário):** responsável pela exibição das informações e interação do usuário.
* **Backend (Servidor Node.js/Express):** responsável pelo processamento das requisições e regras de negócio.
* **Banco de Dados (em desenvolvimento):** responsável pelo armazenamento persistente dos registros de livros.

Fluxo geral:

```
Usuário → Navegador (Frontend) → Servidor Express (Backend) → Banco de Dados
```

---

## **4. Tecnologias Utilizadas**

| Categoria            | Tecnologia / Ferramenta                       |
| -------------------- | --------------------------------------------- |
| Linguagem principal  | JavaScript (Node.js)                          |
| Framework servidor   | Express.js                                    |
| Banco de dados       | Em desenvolvimento (MySQL ou SQLite previsto) |
| Controle de versão   | Git / GitHub                                  |
| Dependências         | express, nodemon (para desenvolvimento)       |
| Ambiente de execução | Node.js 20+                                   |
| Sistema operacional  | Multiplataforma (Windows/Linux)               |

---

## **5. Estrutura de Diretórios**

```
CatalogoLivrosSenai/
│
├── app.js                 # Servidor principal Express
├── db.js                  # Módulo de banco de dados
├── package.json           # Dependências do projeto Node.js
├── package-lock.json
├── requirements.txt       # Dependências adicionais
├── README.md              # Documentação do GitHub
├── .gitignore             # Arquivos ignorados pelo Git
└── .git/                  # Repositório local
```

---

## **6. Funcionamento do Sistema**

### **6.1 Backend**

O servidor Express (`app.js`) é responsável por:

* Configurar e iniciar o servidor HTTP;
* Definir rotas de acesso (por exemplo, `/livros`);
* Processar requisições do cliente (GET, POST, PUT, DELETE);
* Enviar respostas no formato JSON.

### **6.2 Banco de Dados**

O módulo `db.js` realiza a conexão com o banco de dados, possivelmente utilizando uma biblioteca como `mysql2` ou `sqlite3`.
Suas funções típicas incluem:

* Abrir e fechar conexões;
* Executar queries SQL;
* Tratar erros de conexão e consultas.

### **6.3 Frontend**

O frontend (armazenado em uma branch separada) é responsável por:

* Apresentar os dados em formato de catálogo;
* Enviar solicitações HTTP ao backend via `fetch()` ou `axios`;
* Exibir respostas e mensagens de sucesso/erro ao usuário.

---

## **7. Fluxo de Dados**

1. O usuário acessa a página inicial pelo navegador.
2. O frontend envia uma requisição `GET` ao backend (ex: `/livros`) para obter a lista de livros.
3. O servidor Express consulta o banco via `db.js` e retorna os dados em formato JSON.
4. O frontend interpreta a resposta e exibe a lista ao usuário.
5. Para novos cadastros, o frontend envia uma requisição `POST` com os dados do livro.
6. O backend insere as informações no banco e retorna uma resposta confirmando a operação.

---

## **8. Endpoints e Rotas da API**

| Método   | Rota          | Descrição                             | Exemplo de Uso                           |
| -------- | ------------- | ------------------------------------- | ---------------------------------------- |
| `GET`    | `/livros`     | Retorna a lista de livros cadastrados | `/livros`                                |
| `POST`   | `/livros`     | Cadastra um novo livro                | Envio de JSON com título, autor e gênero |
| `PUT`    | `/livros/:id` | Atualiza informações de um livro      | `/livros/3`                              |
| `DELETE` | `/livros/:id` | Remove um livro do catálogo           | `/livros/3`                              |

**Exemplo de JSON enviado no POST:**

```json
{
  "titulo": "O Pequeno Príncipe",
  "autor": "Antoine de Saint-Exupéry",
  "ano": 1943,
  "genero": "Ficção"
}
```

---

## **9. Estrutura do Banco de Dados (em desenvolvimento)**

O modelo relacional previsto é:

**Tabela: `livros`**

| Campo       | Tipo         | Descrição                    |
| ----------- | ------------ | ---------------------------- |
| `id`        | INT          | Identificador único do livro |
| `titulo`    | VARCHAR(255) | Nome do livro                |
| `autor`     | VARCHAR(255) | Autor da obra                |
| `ano`       | INT          | Ano de publicação            |
| `genero`    | VARCHAR(100) | Gênero literário             |
| `descricao` | TEXT         | Descrição opcional           |

---

## **10. Considerações Finais**

O projeto **Catálogo de Livros SENAI** representa um exercício completo de integração entre backend, frontend e banco de dados, desenvolvido com boas práticas de versionamento e modularização.
A estrutura atual fornece uma base sólida para o desenvolvimento de novas funcionalidades, incluindo autenticação de usuários, filtros de busca e integração com APIs externas.

A evolução do projeto será conduzida de forma colaborativa, com controle de branches e versionamento contínuo.
