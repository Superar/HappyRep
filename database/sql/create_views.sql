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
