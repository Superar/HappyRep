-- View: view_reparador
-- Autor: Marcio Lima Inácio

CREATE VIEW view_reparador AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Reparador r, Pessoa p
WHERE r.cpf_pessoa = p.cpf;

-- View: view_nutricionista
-- Autor: Tiago Bachiega de Almmeida

CREATE VIEW view_nutricionista AS
SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Nutricionista n, Pessoa p
WHERE n.cpf_pessoa = p.cpf;

-- View: view_morador
-- Autor: Tiago Bachiega de Almmeida

CREATE VIEW view_morador AS
SELECT trabalho, universidade, cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
FROM Morador m, Pessoa p
WHERE m.cpf_pessoa = p.cpf;