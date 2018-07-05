# Divisão das tarefas

Este documento indica como foi realizada a divisão das tarefas entre os 3 grupos, assim como fica a cargo dos grupos indicarem as implementações de cada membro.

## Grupo 1

O grupo 1 ficou responsável pelas implementações referentes às tabelas:

- Republica
- Comodo
- Pessoa
- PessoaTelefone
- Faxineira
- Reparador
- ReparadorTipo
- Cozinheira
- Nutricionista
- Morador

As implementações a cargo de cada membro estão indicadas a seguir.

---

### Luis Felipe Tomazini

#### Views

- view_pessoa
- view_faxineira

#### Triggers

- insert_view_pessoa()
- insert_view_faxineira()

#### Procedimentos e funções

- insert_pessoa()
- insert_faxineira()
- update_pessoa()
- update_faxineira()
- delete_pessoa()
- delete_faxineira()
- existe_pessoa()
- nomes_por_sexo() [cursor parametrizado]

---

### Marcio Lima Inácio

#### Views

- view_reparador
- view_cozinheira

#### Triggers

- insert_view_reparador()
- delete_row_view_reparador()

#### Procedimentos e funções

- insert_reparador()
- insert_cozinheira()
- update_reparador()
- update_reparador_tipo()
- update_cozinheira()
- delete_reparador()
- delete_cozinheira()

----

### Tiago Bachiega de Almeida

#### Views

- view_nutricionista
- view_morador
- view_morador_sem_trab

#### Triggers 

- insert_view_nutricionista()
- insert_view_morador()

#### Procedimentos e funções

- get_trabalho()
- get_universidade()
- get_sexo()
- get_rg()
- get_nome_prenome()
- get_sobrenome()
- get_data()
- get_email()
- nomes_por_trabalho() [cursor]
- nomes_por_universidade() [cursor]
- update_nutricionista()
- update_morador()
- delete_nutricionista()
- delete_morador()
- insert_nutricionista()
- insert_morador()

---

### Victor Calefi Ramos

#### Views

- view_republica
- view_comodo

#### Triggers

- delete_row_view_republica()
- delete_row_view_comodo()

#### Procedimentos e funções

- update_republica()
- delete_republica()
- delete_comodo()
- insert_republica()
- insert_comodo()

---

## Grupo 2

O grupo 2 ficou responsável pelas implementações referentes às tabelas:

- Servico
- Faxina
- Reparo
- Alimentacao
- Receita

---

## Grupo 3

O grupo 3 ficou responsável pelas implementações referentes às tabelas:

- ListaProdutos
- Produto
- Fornecedor
- Ingredientes
- Pagamento
