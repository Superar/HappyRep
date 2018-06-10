-- Inserir reparador
-- Primeiro, verifica-se se a pessoa já foi cadastrada. Caso sim, adiciona apenas o reparador, caso contrário retorna falso.
-- Caso a pessoa nao esteja cadastrada, insere na View do reparador.
-- Para inserir na view do reaparador, é necessário uma Trigger para fazer a inserção nas tabelas correspondentes.
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION insert_reparador(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
      INSERT INTO Reparador VALUES (_cpf);
      RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_reparador(_cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento DATE, _email VARCHAR) RETURNS void AS $$
BEGIN
    INSERT INTO view_reparador (cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email) VALUES (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, _data_de_nascimento, _email);
END;
$$ LANGUAGE plpgsql;

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
