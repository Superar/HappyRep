-- Altera nutricionista
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION update_nutricionista(_cpf VARCHAR, _sexo VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento DATE, _email VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
	IF _sexo IS NOT NULL THEN
		UPDATE Pessoa AS p SET sexo = _sexo WHERE p.cpf = _cpf;
	END IF;
	IF _nome_prenome IS NOT NULL THEN
		UPDATE Pessoa AS p SET nome_prenome = _nome_prenome WHERE p.cpf = _cpf;
	END IF;
	IF _nome_sobrenome IS NOT NULL THEN
		UPDATE Pessoa AS p SET nome_sobrenome = _nome_sobrenome WHERE p.cpf = _cpf;
	END IF;
	IF _data_de_nascimento IS NOT NULL THEN
		UPDATE Pessoa AS p SET data_de_nascimento = _data_de_nascimento WHERE p.cpf = _cpf;
	END IF;
	IF _email IS NOT NULL THEN
		UPDATE Pessoa AS p SET email = _email WHERE p.cpf = _cpf;
	END IF;
        RETURN (TRUE);
    ELSE
        RAISE EXCEPTION 'Nao existe cadastro a ser alterado';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Altera morador
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION update_morador(_cpf VARCHAR, _trabalho VARCHAR, _universidade VARCHAR, _sexo VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento DATE, _email VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        IF _trabalho IS NOT NULL THEN
		UPDATE Morador AS m SET trabalho = _trabalho WHERE m.cpf_pessoa = _cpf;
	END IF;
	IF _universidade IS NOT NULL THEN
		UPDATE Morador AS m SET universidade = _universidade WHERE m.cpf_pessoa = _cpf;
	END IF;
	IF _sexo IS NOT NULL THEN
		UPDATE Pessoa AS p SET sexo = _sexo WHERE p.cpf = _cpf;
	END IF;
	IF _nome_prenome IS NOT NULL THEN
		UPDATE Pessoa AS p SET nome_prenome = _nome_prenome WHERE p.cpf = _cpf;
	END IF;
	IF _nome_sobrenome IS NOT NULL THEN
		UPDATE Pessoa AS p SET nome_sobrenome = _nome_sobrenome WHERE p.cpf = _cpf;
	END IF;
	IF _data_de_nascimento IS NOT NULL THEN
		UPDATE Pessoa AS p SET data_de_nascimento = _data_de_nascimento WHERE p.cpf = _cpf;
	END IF;
	IF _email IS NOT NULL THEN
		UPDATE Pessoa AS p SET email = _email WHERE p.cpf = _cpf;
	END IF;
        RETURN (TRUE);
    ELSE
        RAISE EXCEPTION 'Nao existe cadastro a ser alterado';
    END IF;
END;
$$ LANGUAGE plpgsql;


