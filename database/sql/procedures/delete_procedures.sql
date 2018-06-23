-- Deleta o cadastro de um Reparador
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

-- Deleta o cadastro de uma Cozinheira
-- Autor: Marcio Lima Inácio
CREATE OR REPLACE FUNCTION delete_cozinheira(_cpf VARCHAR) RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Cozinheira c WHERE c.cpf_pessoa = _cpf) THEN
		RAISE EXCEPTION 'Cozinheira não cadastrada';
	END IF;

    DELETE FROM Cozinheira c WHERE c.cpf_pessoa = _cpf;
END;
$$ LANGUAGE plpgsql;

-- Deleta uma pessoa
-- Autor: Luis Felipe Tomazini
CREATE OR REPLACE FUNCTION delete_pessoa (_cpf VARCHAR) RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RAISE EXCEPTION 'Pessoa não cadastrada';
    END IF;

    DELETE FROM Pessoa p WHERE p.cpf = _cpf;
END;
$$ LANGUAGE plpgsql;

-- Deleta uma faxineira
-- Autor: Luis Felipe Tomazini
CREATE OR REPLACE FUNCTION delete_faxineira (_cpf VARCHAR) RETURNS void AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Faxineira f WHERE f.cpf_pessoa = _cpf) THEN
        RAISE EXCEPTION 'Faxineira não cadastrada';
    END IF;

    DELETE FROM Faxineira f WHERE f.cpf_pessoa = _cpf;
END;
$$ LANGUAGE plpgsql;