DROP VIEW IF EXISTS view_morador;
DROP VIEW IF EXISTS view_nutricionista;
DROP VIEW IF EXISTS view_reparador;
DROP VIEW IF EXISTS view_faxineira;
DROP VIEW IF EXISTS view_pessoa;
DROP VIEW IF EXISTS view_alimentacao;

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
--essa view retorna os moradores que nao
--trabalham em lugar nenhum
--Autor: Tiago Bachiega de Almeida
CREATE VIEW view_morador_sem_trab AS
SELECT universidade, cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Morador m, Pessoa p
WHERE m.cpf_pessoa = p.cpf AND m.trabalho is NULL;

-- View: view_republica
-- Autor: Victor Calefi Ramos

CREATE VIEW view_republica AS
SELECT id_republica, status, endereco_cep, endereco_logradouro, endereco_numero, endereco_complemento, endereco_observacoes
FROM Republica rep;

-- View: view_comodo
-- Autor: Victor Calefi Ramos

CREATE VIEW view_comodo AS
SELECT id_comodo, id_republica, status
FROM Comodo c, Republica rep 
WHERE c.id_republica = rep.id_republica;

-- View: view_alimentacao
-- Autora: Isadora Gallerani

CREATE VIEW view_alimentacao AS
SELECT id_servico, cpf_cozinheira, cpf_nutricionista
FROM Cozinheira c, Nutricionista n, Pessoa p, Alimentacao a, Servico s
WHERE a.cpf_cozinheira = c.cpf_pessoa AND c.cpf_pessoa = p.cpf AND a.cpf_nutricionista = n.cpf_pessoa AND n.cpf_pessoa = p.cpf AND a.id_servico = s.id_servico;

-- View: view_faxina
-- Autora: Isadora Gallerani

CREATE VIEW view_faxina AS
SELECT cpf_faxineira, id_servico
FROM Faxina fx, Faxineira f, Pessoa p, Servico s
WHERE fx.cpf_faxineira = f.cpf_pessoa AND f.cpf_pessoa = p.cpf AND fx.id_servico = s.id_servico;

-- View: view_reparo
-- Autora: Isadora Gallerani

CREATE VIEW view_reparo AS
SELECT cpf_reparador, id_servico
FROM Reparo r, Reparador rr, Pessoa p, Servico s
WHERE r.cpf_reparador = rr.cpf_pessoa AND rr.cpf_pessoa = p.cpf AND r.id_servico = s.id_servico;

