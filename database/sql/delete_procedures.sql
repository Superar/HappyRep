---------------------------------------------
------------- DROP FUNCTIONS ---------------
---------------------------------------------

DROP FUNCTION IF EXISTS delete_faxineira;
DROP FUNCTION IF EXISTS delete_pessoa;
DROP FUNCTION IF EXISTS delete_cozinheira;
DROP FUNCTION IF EXISTS delete_reparador;
DROP FUNCTION IF EXISTS delete_morador;
DROP FUNCTION IF EXISTS delete_nutricionista;

---------------------------------------------
------------ CREATE FUNCTIONS --------------
---------------------------------------------

-- Procedure: Deletar nutricionista
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION delete_nutricionista(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Nutricionista n WHERE n.cpf_pessoa = _cpf) THEN
	RAISE EXCEPTION 'Nutricionista não cadastrada';
    END IF;

    DELETE FROM Nutricionista n WHERE n.cpf_pessoa = _cpf;
    DELETE FROM Pessoa p WHERE p.cpf = _cpf;
    RETURN (TRUE);
END;
$$ LANGUAGE plpgsql;

-- Procedure: Deletar morador
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION delete_morador(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Morador m WHERE m.cpf_pessoa = _cpf) THEN
	RAISE EXCEPTION 'Morador não cadastrado';
    END IF;

    DELETE FROM Morador m WHERE m.cpf_pessoa = _cpf;
    DELETE FROM Pessoa p WHERE p.cpf = _cpf;
    RETURN (TRUE);
END;
$$ LANGUAGE plpgsql;

-- Procedure: Deletar reparador
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION delete_reparador(_cpf VARCHAR) RETURNS void AS $$
DECLARE
    _tipo ReparadorTipo.tipo%TYPE;
    _tipos_cadastrados CURSOR (_cpf_cursor CHAR(11)) FOR SELECT tipo FROM view_reparador WHERE cpf = _cpf_cursor;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Reparador r WHERE r.cpf_pessoa = _cpf) THEN
        RAISE EXCEPTION 'Reparador não cadastrado';
    END IF;

    -- Deleta todas as linhas do reparador na view
    -- Deleta todos os tipos e por fim o cadastro do reparador
    OPEN _tipos_cadastrados(_cpf_cursor:=_cpf);

    LOOP
        FETCH _tipos_cadastrados INTO _tipo;
        EXIT WHEN NOT FOUND;

        DELETE FROM view_reparador vr WHERE vr.cpf = _cpf AND vr.tipo = _tipo;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Deletar cozinheira
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION delete_cozinheira(_cpf VARCHAR) RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Cozinheira c WHERE c.cpf_pessoa = _cpf) THEN
        RAISE EXCEPTION 'Cozinheira não cadastrada';
    END IF;

    DELETE FROM Cozinheira c WHERE c.cpf_pessoa = _cpf;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Deletar pessoa
-- Autor: Luis Felipe Tomazini

CREATE OR REPLACE FUNCTION delete_pessoa (_cpf VARCHAR) RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RAISE EXCEPTION 'Pessoa não cadastrada';
    END IF;

    DELETE FROM Pessoa p WHERE p.cpf = _cpf;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Deletar faxineira
-- Autor: Luis Felipe Tomazini

CREATE OR REPLACE FUNCTION delete_faxineira (_cpf VARCHAR) RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Faxineira f WHERE f.cpf_pessoa = _cpf) THEN
        RAISE EXCEPTION 'Faxineira não cadastrada';
    END IF;

    DELETE FROM Faxineira f WHERE f.cpf_pessoa = _cpf;
END;
$$ LANGUAGE plpgsql;

-- Procedure: Deletar republica
-- Autor: Victor Calefi Ramos

-- Procedure: Deletar comodo
-- Autor: Victor Calefi Ramos
