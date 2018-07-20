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

#### Tables

- Pessoa
- Faxineira

#### Views

- view_pessoa
- view_faxineira

#### Triggers

- valida_pessoa() [DML]
- insert_view_pessoa() [instead of]
- insert_view_faxineira() [instead of]

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

- insert_view_nutricionista() [Instead of]
- insert_view_morador() [Instead of]
- valida_morador() [DML]

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
### Alexandre Dutra

#### Tabelas
- receita
- receita_alimentacao
- produto
- ingredientes

#### Views

- view_ingredientes_receita
- view_alimentacao55

#### Triggers

- insert_receita()
- trigger_insert_receita()
- delete_view_ingredientes_receita()
- trigger_delete_view_ingredientes_receita()

#### Procedimentos e funções

- precisa_produto_tarefa()
- insere_reparo()
- update_alimentacao()
- delete_receita()
- insert_receita()

---
### Juan Santos
- faxineira
- reparador
- cozinheira 
- serviço

#### Procedimentos e funções
- update_ingrediente()
- delete_ingrediente()
- delete_alimentacao()
- insert_ingrediente()
- valor_receita()
- possui_horario_atendimento()

#### View
view_operador_servico

#### Triggers
insert_view_servico

---
### Isadora Gallerani

#### Tabelas
- Faxina
- Nutricionista
- Reparo
- Alimentação

#### Views

- view_alimentacao

#### Triggers


#### Procedimentos e funções


---
### Mariana Zagatti

#### Tabelas
- fornecedor
- fornecimento
- produtos
- itens

#### Views
- view_servicos

#### Trigger
- trigger_inserir_servico()
- trigger_apagar_servico()

#### Procedimentos e funções
- update_receita()
- delete_faxina()
- delete_reparo()
- verificar_coerencia_horario()
- insert_reparo()
- inserir_receita ()
- inserir_alimentacao ()

---

## Grupo 3

O grupo 3 ficou responsável pelas implementações referentes às tabelas:

- ListaProdutos
- Produto
- Fornece
- Fornecedor
- Ingredientes
- Pagamento

### Jorge Augusto Bernardo

#### Tables

  - Pagamento
  - Servico
  
#### View

  - View_Pagamento
  
#### Procedure

  - InsertServico()
  
#### Function

  - get_multa()
  
#### Trigger

  - insert_view_pagamento()

#### Paulo Vitor Tostes Betareli

#### Tables

	-Produto
	-Fornecedor
	-Fornece
	
#### View
	
	-view_produto_fornecedor
	
#### Procedure 

	-InsereProduto
	-InsereFornecedor
	-InsereFornecimento
	
#### Function

	-lista_produto_marca
	
#### Trigger

	-insert_view_produto_fornecedor
