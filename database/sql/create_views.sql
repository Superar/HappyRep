---------------------------------------------
--------------- DROP VIEWS ------------------
---------------------------------------------

DROP VIEW IF EXISTS view_comodo;
DROP VIEW IF EXISTS view_republica;
DROP VIEW IF EXISTS view_morador_sem_trab;
DROP VIEW IF EXISTS view_morador;
DROP VIEW IF EXISTS view_nutricionista;
DROP VIEW IF EXISTS view_reparador;
DROP VIEW IF EXISTS view_faxineira;
DROP VIEW IF EXISTS view_pessoa;

---------------------------------------------
-------------- CREATE VIEWS -----------------
---------------------------------------------

-- View: view_pessoa
-- Autor: Luis Felipe Tomazini

CREATE VIEW view_pessoa AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Pessoa p;

-- View: view_faxineira
-- Autor: Luis Felipe Tomazini

CREATE VIEW view_faxineira AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Faxineira f, Pessoa p
WHERE f.cpf_pessoa = p.cpf;

-- View: view_cozinheira
-- Autor: Marcio Lima Inácio

CREATE VIEW view_cozinheira AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Cozinheira c, Pessoa p
WHERE c.cpf_pessoa = p.cpf;

-- View: view_reparador
-- Autor: Marcio Lima Inácio

CREATE VIEW view_reparador AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email, tipo
FROM Pessoa p, Reparador r LEFT OUTER JOIN ReparadorTipo t ON t.cpf_reparador = r.cpf_pessoa
WHERE r.cpf_pessoa = p.cpf;

-- View: view_nutricionista
-- Autor: Tiago Bachiega de Almeida

CREATE VIEW view_nutricionista AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Nutricionista n, Pessoa p
WHERE n.cpf_pessoa = p.cpf;

-- View: view_morador
-- Autor: Tiago Bachiega de Almeida

CREATE VIEW view_morador AS
SELECT trabalho, universidade, cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Morador m, Pessoa p
WHERE m.cpf_pessoa = p.cpf;


-- View: view_morador_sem_trab
-- Autor: Tiago Bachiega de Almeida
-- Obs: Essa view retorna os moradores que nao trabalham em lugar nenhum

CREATE VIEW view_morador_sem_trab AS
SELECT universidade, cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Morador m, Pessoa p
WHERE m.cpf_pessoa = p.cpf AND m.trabalho is NULL;

-- View: view_republica
-- Autor: Victor Calefi Ramos


-- View: view_comodo
-- Autor: Victor Calefi Ramos