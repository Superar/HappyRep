-- Inserir nutricionista
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION insert_nutricionista(_cpf VARCHAR, _sexo VARCHAR,  _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento VARCHAR, _email VARCHAR) RETURNS void AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        INSERT INTO Nutricionista VALUES (_cpf);
    ELSE
	INSERT INTO Pessoa VALUES (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email);
        INSERT INTO Nutricionista VALUES (_cpf);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Inserir morador
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION insert_morador(_trabalho VARCHAR, _universidade VARCHAR, _cpf VARCHAR, _sexo VARCHAR,  _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento VARCHAR, _email VARCHAR) RETURNS void AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        INSERT INTO Morador VALUES (_trabalho, _universidade, _cpf);
    ELSE
	INSERT INTO Pessoa VALUES (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email);
	INSERT INTO Morador VALUES (_trabalho, _universidade, _cpf);
    END IF;
END;
$$ LANGUAGE plpgsql;
