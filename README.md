# HappyRep

Projeto para a disciplina Laboratório de Banco de Dados.

## Executando o projeto

Antes de prosseguir, verifique se seu ambiente possui a versão do NodeJS 8.10.0. Caso possua uma versão diferente, utilize o [NVM (Node Version Manager)](https://github.com/creationix/nvm).

### Inicialização do projeto

Clonar o repositório com `git clone https://github.com/Superar/HappyRep.git`e executar o comando, no diretório raíz do projeto:

```shell
npm install
```

### Arquivos necessários

Por questão de segurança, para que o projeto possa ser executado, é necessário configurar algumas variáveis de ambiente (como o link de acesso ao banco de dados, usuário e senha...).

Para realizar essa configuração, crie um arquivo chamado __.env__ no diretório raíz do projeto e configure as seguintes variáveis:

```shell
DEBUG=happyrep:server
URL_DATABASE=
```

### Execução

Depois que tudo estiver configurado, você pode executar o projeto com o comando:

```shell
npm run dev
```

Com isso, você estará executando o projeto localmente. Basta acessar [localhost:3000](localhost:3000) em sua máquina para verificar.

---

## Desenvolvimento

Para o desenvolvimento do projeto, é necessário a indicação de algumas diretrizes.

### Deploy

O projeto final está hospedado em um [servidor do Heroku](https://happyrep-turmad.herokuapp.com/) e o _deploy_ é feito automaticamente conforme são feitos commits na __branch master__. Por isso, é preciso muito cuidado nesses commits, o ideal é realizar todas as alterações em outra branch e realiar uma _pull request_ no GitHub para dar o _merge_ com a master.

### Estrutura de pastas

Para a correta execução do projeto no servidor, é necessário obedecer certa estrutura de pastas:

```
HappyRep
│
│   .env
│   app.js
│   package.json
│   README.md
│
└───bin
│   │
│   │   www
│
└───database
│   │   index.js
│   │
│   └───sql
│
└───public
│   │
│   └───images
│   │
│   └───javascripts
│   │
│   └───stylesheets
│
└───routes
│
└───views
```

A pasta __public__ guardará os recursos utilizados: imagens, javascripts e arquivos CSS. Esses arquivos devem ser acessados nas páginas HTML com caminhos no formato `/stylesheets/style.css`. Não se deve utilizar caminhos relativos, pois eles não funcionarão.

Quanto a arquivos CSS, deve-se alterar __apenas__ o arquivo `style.css`.

A pasta __routes__ contém os arquivos que indicam como será o roteamento de páginas na aplicação: por exemplo, qual _link_ executará quais ações (tipo acessar o banco, renderizar uma página...). É aqui que vai ser feita toda a parte da lógica do _backend_ da aplicação.

A pasta __views__ contém os arquivos HBS que gerarão o conteúdo dinamicamente. Estes arquivos são praticamente iguais a um HTML, porém com algumas _tags_ específicas para inclusão de conteúdo dinâmico (como "if", "for"... caso queiram usar algo do tipo "if not", na verdade é "unless"). Todas as páginas utilizarão o arquivo `layout.hbs` como padrão, então não são necessárias as _tags_ `<head>` e `<body>`, pois estas estão presentes no _layout_. O conteúdo da página será inserido no lugar da _tag_ `{{{body}}}` do _layout_.

Para mais informações sobre como criar páginas utilizando HBS, é indicado [este tutorial](https://webapplog.com/handlebars/).

A pasta __database__ possui os arquivos necessários para o acesso ao banco de dados. O arquivo `index.js` possui um exemplo de como realizar o acesso e realizar uma _query_ para o banco. Uma função foi criada para facilitar o acesso ao banco, portanto para executar qualquer query basta executar `db.query` no `index.js` da pasta __routes__.

A função `db.query` possui quatro parâmetros:

- `text` - a query a ser executada;
- `values` - lista de valores que serão inseridos no local de marcadores na query no formato '$1';
- `ret_cb` - função que será executada caso a query tenha sido bem sucedida, essa função possui um parâmetro `ret` que possui o resultado da query;
- `err_cb` - função quer será executada caso a query tenha dado algum erro, essa função possui um parâmetro `err` que possui o erro gerado.

Sim, a função possui funções como parâmetro (Javascript tem muito disso). Olhando alguma implementação já feita por algum outro membro pode ajudar a entender a ideia.

Os scripts SQL devem ser criados e mantidos na pasta __database/sql__ para controle de versão, porém serão executados no pgAdmin.
