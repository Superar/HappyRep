-- Inserir nutricionista
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION insert_nutricionista(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        INSERT INTO Nutricionista VALUES (_cpf);
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Inserir morador
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION insert_morador(_trabalho VARCHAR, _universidade VARCHAR, _cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        INSERT INTO Morador VALUES (_trabalho, _universidade, _cpf);
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;
