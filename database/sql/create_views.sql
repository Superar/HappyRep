DROP VIEW IF EXISTS view_morador;
DROP VIEW IF EXISTS view_nutricionista;
DROP VIEW IF EXISTS view_reparador;
DROP VIEW IF EXISTS view_faxineira;
DROP VIEW IF EXISTS view_cozinheira;
DROP VIEW IF EXISTS view_pessoa;
DROP VIEW IF EXISTS view_alimentacao;
DROP VIEW IF EXISTS viewPagamento;

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

-- View: view_estatisticas
-- Autor: Marcio Lima Inácio

CREATE VIEW view_estatisticas AS
SELECT
(SELECT COUNT(cpf) FROM   view_funcionario) AS num_funcionarios,
(SELECT COUNT(id_republica) FROM Republica) AS num_republicas;

-- View: view_funcionario
-- Autor: Marcio Lima Inácio

CREATE VIEW view_funcionario AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM view_faxineira
UNION
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM view_cozinheira
UNION
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM view_reparador
UNION
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM view_nutricionista;

-- View: view_operador_servico
-- Autor: Juan Henrique dos Santos
CREATE OR REPLACE view view_operador_servico AS
(
	SELECT 
		s.id_servico as id_servico, 
		s.hora_inicio as hora_inicio,
		s.hora_fim as hora_fim, 
		f.cpf_faxineira as cpf, 
		p.sexo as sexo, 
		p.rg as rg, 
		p.nome_prenome as nome_prenome, 
		p.nome_sobrenome as nome_sobrenome, 
		p.data_de_nascimento as data_de_nascimento, 
		p.email as email, 
		'F' as tipo 
	FROM servico s
	INNER JOIN faxina f ON f.id_servico = s.id_servico
	INNER JOIN pessoa p ON p.cpf = f.cpf_faxineira
)
UNION
(
	SELECT 
		s.id_servico as id_servico, 
		s.hora_inicio as hora_inicio,
		s.hora_fim as hora_fim, 
		a.cpf_cozinheira as cpf, 
		p.sexo as sexo, 
		p.rg as rg, 
		p.nome_prenome as nome_prenome, 
		p.nome_sobrenome as nome_sobrenome, 
		p.data_de_nascimento as data_de_nascimento, 
		p.email as email,  
		'C' as tipo 
	FROM servico s
	INNER JOIN alimentacao a ON a.id_servico = s.id_servico
	INNER JOIN pessoa p ON p.cpf = a.cpf_cozinheira
)

UNION
(
	SELECT 
		s.id_servico as id_servico, 
		s.hora_inicio as hora_inicio,
		s.hora_fim as hora_fim, 
		a.cpf_nutricionista as cpf, 
		p.sexo as sexo, 
		p.rg as rg, 
		p.nome_prenome as nome_prenome, 
		p.nome_sobrenome as nome_sobrenome, 
		p.data_de_nascimento as data_de_nascimento, 
		p.email as email, 
		'N' as tipo 
	FROM servico s
	INNER JOIN alimentacao a ON a.id_servico = s.id_servico
	INNER JOIN pessoa p ON p.cpf = a.cpf_nutricionista
)

UNION 
(
	SELECT 
		s.id_servico as id_servico, 
		s.hora_inicio as hora_inicio,
		s.hora_fim as hora_fim, 
		r.cpf_reparador as cpf, 
		p.sexo as sexo, 
		p.rg as rg, 
		p.nome_prenome as nome_prenome, 
		p.nome_sobrenome as nome_sobrenome, 
		p.data_de_nascimento as data_de_nascimento, 
		p.email as email,  
		'R' as tipo 
	FROM servico s
	INNER JOIN reparo r ON r.id_servico = s.id_servico
	INNER JOIN pessoa p ON p.cpf = r.cpf_reparador
);

-- View: view_ingredientes_receita
-- Autor: Alexandre Dutra
CREATE OR REPLACE VIEW public.view_ingredientes_receita AS
 SELECT i.quantidade AS quant,
    i.id_receita,
    i.id_produto,
    p.nome,
    p.descricao,
    p.marca,
    p.categoria,
    r.nome_receita,
    r.descricao_receita
   FROM ingredientes i
     JOIN receita r ON r.id_receita = i.id_receita
     JOIN produto p ON p.id_produto = i.id_produto;

--Autor: Jorge Bernardo
--Ver nome de todas as pessoas que estao registaradas com multa acima de 500

Create VIEW viewPagamento AS
select p.nome_pagador_prenome, p.nome_pagador_sobrenome, p.cnpj_beneficiario
from Pagamento as p
where multa > 500;

--Autor: Juan
--Exibir as alimentacoes com os nomes dos nutricionistas e cozinheiras
CREATE OR REPLACE VIEW public.view_alimentacao55 AS
 SELECT s.id_servico,
    s.hora_inicio,
    s.hora_fim,
    nutri.nome_prenome::text || ' ' ||nutri.nome_sobrenome::text AS nutricionista,
    cozi.nome_prenome::text || ' ' ||cozi.nome_sobrenome::text AS cozinheira
   FROM servico s
     JOIN alimentacao a ON a.id_servico = s.id_servico
     JOIN pessoa nutri ON nutri.cpf = a.cpf_nutricionista
     JOIN pessoa cozi ON cozi.cpf = a.cpf_cozinheira;

ALTER TABLE public.view_alimentacao55
    OWNER TO azjpybnuyzhimq;