-- Altera nutricionista
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION update_nutricionista(_cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento DATE, _email VARCHAR) RETURNS boolean AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        UPDATE Pessoa as p SET (cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email) = (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, _data_de_nascimento, _email) WHERE p.cpf = _cpf;
	UPDATE Nutricinista n SET cpf = _cpf WHERE n.cpf = _cpf;
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Altera morador
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION update_morador(_trabalho VARCHAR, _universidade VARCHAR, _cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento DATE, _email VARCHAR) RETURNS boolean AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        UPDATE Pessoa as p SET (cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email) = (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, _data_de_nascimento, _email) WHERE p.cpf = _cpf;
	UPDATE Morador m SET (trabalho, faculdade, cpf) = (_trabalho, _faculdade, _cpf) WHERE n.cpf = _cpf;
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;


