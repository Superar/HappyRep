<<<<<<< HEAD:database/sql/procedures/alter_procedures.sql
---------------------------------------------
------------ CREATE FUNCTIONS ---------------
---------------------------------------------

-- Function: Altera reparador
-- Autor: Marcio Lima Inácio

=======
-- Altera reparador
-- Autor: Marcio Lima Inácio
>>>>>>> origin/master:database/sql/procedures/alter_procedures.sql
CREATE OR REPLACE FUNCTION update_reparador(_cpf VARCHAR,
										 _sexo VARCHAR DEFAULT NULL,
										 _rg VARCHAR DEFAULT NULL,
										 _nome_prenome VARCHAR DEFAULT NULL,
										 _nome_sobrenome VARCHAR DEFAULT NULL,
										 _data_de_nascimento DATE DEFAULT NULL,
										 _email VARCHAR DEFAULT NULL,
										 tipos VARCHAR[] DEFAULT '{}') RETURNS boolean AS $$
DECLARE
	_retorno BOOLEAN;
BEGIN
	IF NOT tipos = '{}' THEN
		PERFORM update_reparador_tipo(_cpf, tipos);
	END IF;
	_retorno := update_pessoa(_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, _data_de_nascimento, _email);
	RETURN (_retorno);
END;
$$ LANGUAGE plpgsql;

<<<<<<< HEAD:database/sql/procedures/alter_procedures.sql
-- Function: Altera o tipo do reparador
=======
-- Altera o tipo do reparador
>>>>>>> origin/master:database/sql/procedures/alter_procedures.sql
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION update_reparador_tipo(_cpf CHAR, tipos VARCHAR[]) RETURNS void AS $$
DECLARE
	_tipo ReparadorTipo.tipo%TYPE;
	_tipos_cadastrados CURSOR (_cpf_cursor CHAR(11)) FOR SELECT tipo FROM view_reparador WHERE cpf = _cpf_cursor;

	_sexo CHAR;
	_rg VARCHAR;
	_nome_prenome VARCHAR;
	_nome_sobrenome VARCHAR;
	_data_de_nascimento DATE;
	_email VARCHAR;
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Reparador r WHERE r.cpf_pessoa = _cpf) THEN
		RAISE EXCEPTION 'Reparador não cadastrado';
	END IF;
	IF tipos = '{}' THEN
    	RAISE EXCEPTION 'Selecione os tipos do Reparador';
    END IF;

	-- Delecao dos tipos cadastrados que devem ser removidos
	OPEN _tipos_cadastrados(_cpf_cursor:=_cpf);
	LOOP
		FETCH _tipos_cadastrados INTO _tipo;
		EXIT WHEN NOT FOUND;

		IF NOT tipos @> ARRAY[_tipo] THEN
			DELETE FROM view_reparador vr WHERE vr.cpf = _cpf AND vr.tipo = _tipo;
		END IF;
	END LOOP;
	CLOSE _tipos_cadastrados;

	-- Adicao dos tipos que nao estao cadastrados ainda
	FOREACH _tipo IN ARRAY tipos
	LOOP
		IF NOT EXISTS (SELECT 1 FROM view_reparador vr WHERE vr.cpf = _cpf AND vr.tipo = _tipo) THEN

			-- Pega informacoes necessarias para o cadastro
			SELECT sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email
			INTO _sexo, _rg, _nome_prenome, _nome_sobrenome, _data_de_nascimento, _email
			FROM view_reparador vr WHERE vr.cpf = _cpf
			LIMIT 1;

			PERFORM insert_reparador(_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_CHAR(_data_de_nascimento, 'DD/MM/YYYY'), _email, ARRAY[_tipo]);
		END IF;
	END LOOP;
END;
$$ LANGUAGE plpgsql;

<<<<<<< HEAD:database/sql/procedures/alter_procedures.sql
-- Function: Altera cozinheira
-- Autor: Marcio Lima Inácio

=======
-- Altera cozinheira
-- Autor: Marcio Lima Inácio
>>>>>>> origin/master:database/sql/procedures/alter_procedures.sql
CREATE OR REPLACE FUNCTION update_cozinheira(_cpf VARCHAR,
										 _sexo VARCHAR DEFAULT NULL,
										 _rg VARCHAR DEFAULT NULL,
										 _nome_prenome VARCHAR DEFAULT NULL,
										 _nome_sobrenome VARCHAR DEFAULT NULL,
										 _data_de_nascimento DATE DEFAULT NULL,
										 _email VARCHAR DEFAULT NULL) RETURNS boolean AS $$
DECLARE
	_retorno BOOLEAN;
BEGIN
	_retorno := update_pessoa(_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, _data_de_nascimento, _email);
	RETURN (_retorno);
END;
$$ LANGUAGE plpgsql;

<<<<<<< HEAD:database/sql/procedures/alter_procedures.sql
-- Function: Altera nutricionista
=======
-- Altera nutricionista
>>>>>>> origin/master:database/sql/procedures/alter_procedures.sql
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

-- Function: Altera morador
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

-- Function: Update pessoa
-- Autor: Luis Felipe Tomazini

CREATE OR REPLACE FUNCTION update_pessoa(_cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento DATE, _email VARCHAR) RETURNS boolean AS $$
BEGIN
	IF LENGTH (_cpf) != 11 THEN
		RAISE EXCEPTION 'CPF Invalido';
	END IF;

	IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
		UPDATE Pessoa AS p SET
			sexo = COALESCE (_sexo, sexo),
			rg = COALESCE (_rg, rg),
			nome_prenome = COALESCE (_nome_prenome, nome_prenome),
			nome_sobrenome = COALESCE (_nome_sobrenome, nome_sobrenome),
			data_de_nascimento = COALESCE (_data_de_nascimento, data_de_nascimento),
			email = COALESCE (_email, email)
		WHERE p.cpf = _cpf;

		RETURN (TRUE);
	ELSE
		RETURN (FALSE);
	END IF;
END;
$$ LANGUAGE plpgsql;

-- Function: Update faxineira
-- Autor: Luis Felipe Tomazini

CREATE OR REPLACE FUNCTION update_faxineira(_cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento DATE, _email VARCHAR) RETURNS boolean AS $$
BEGIN
	IF LENGTH (_cpf) != 11 THEN
		RAISE EXCEPTION 'CPF Invalido';
	END IF;

	IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
		UPDATE Pessoa AS p SET
			cpf = COALESCE (_cpf, cpf),
			sexo = COALESCE (_sexo, sexo),
			rg = COALESCE (_rg, rg),
			nome_prenome = COALESCE (_nome_prenome, nome_prenome),
			nome_sobrenome = COALESCE (_nome_sobrenome, nome_sobrenome),
			data_de_nascimento = COALESCE (_data_de_nascimento, data_de_nascimento),
			email = COALESCE (_email, email)
		WHERE p.cpf = _cpf;

		UPDATE Faxineira AS f SET
			cpf_pessoa = COALESCE (_cpf, cpf_pessoa)
		WHERE f.cpf_pessoa = _cpf;

		RETURN (TRUE);
	ELSE
		RETURN (FALSE);
	END IF;
END;
$$ LANGUAGE plpgsql;

-- Function: Update republica
-- Autor: Victor Calefi Ramos

CREATE OR REPLACE FUNCTION update_republica(_id_republica SMALLINT, 
	_status SMALLINT, 
	_endereco_cep VARCHAR, 
	_endereco_logradouro VARCHAR, 
	_endereco_numero SMALLINT, 
	_endereco_complemento VARCHAR, 
	_endereco_observacoes VARCHAR) RETURNS boolean AS $$
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Republica rep WHERE rep.id_republica = _id_republica) THEN
		RAISE EXCEPTION 'Republica não cadastrada';
		RETURN (FALSE);
	END IF;

	UPDATE Republica AS rep SET
		status = COALESCE (_status, status),
		endereco_cep = COALESCE (_endereco_cep, endereco_cep),
		endereco_logradouro = COALESCE (_endereco_logradouro, endereco_logradouro),
		endereco_numero = COALESCE (_endereco_numero, endereco_numero),
		endereco_complemento = COALESCE (_endereco_complemento, endereco_complemento),
		endereco_observacoes = COALESCE (_endereco_observacoes, endereco_observacoes),
	WHERE rep.id_republica = _id_republica;

	RETURN (TRUE);
END;
$$ LANGUAGE plpgsql;