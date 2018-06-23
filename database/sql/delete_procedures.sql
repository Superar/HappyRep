-- Deletar nutricionista
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

-- Deletar morador
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
