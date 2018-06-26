---------------------------------------------
------------- DROP FUNCTIONS ----------------
---------------------------------------------



---------------------------------------------
------------ CREATE FUNCTIONS ---------------
---------------------------------------------

-- Function: Pega dados de pessoas e seus derivados
-- Autor: Tiago Bachiega de Almeida

-- trabalho
CREATE OR REPLACE FUNCTION get_trabalho(_cpf VARCHAR) RETURNS VARCHAR(100) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Morador m WHERE m.cpf_pessoa = _cpf) THEN
        RETURN (SELECT trabalho FROM Morador m WHERE m.cpf_pessoa = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- universidade
CREATE OR REPLACE FUNCTION get_universidade(_cpf VARCHAR) RETURNS VARCHAR(100) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Morador m WHERE m.cpf_pessoa = _cpf) THEN
        RETURN (SELECT universidade FROM Morador m WHERE m.cpf_pessoa = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- sexo
CREATE OR REPLACE FUNCTION get_sexo(_cpf VARCHAR) RETURNS VARCHAR(11) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT sexo FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- rg
CREATE OR REPLACE FUNCTION get_rg(_cpf VARCHAR) RETURNS VARCHAR(10) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT rg FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- nome_prenome
CREATE OR REPLACE FUNCTION get_nome_prenome(_cpf VARCHAR) RETURNS VARCHAR(30) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT nome_prenome FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- nome_sobrenome
CREATE OR REPLACE FUNCTION get_sobrenome(_cpf VARCHAR) RETURNS VARCHAR(70) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT nome_sobrenome FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- data_de_nascimento
CREATE OR REPLACE FUNCTION get_data(_cpf VARCHAR) RETURNS DATE AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT data_de_nascimento FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- email
CREATE OR REPLACE FUNCTION get_email(_cpf VARCHAR) RETURNS VARCHAR(100) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT email FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;
