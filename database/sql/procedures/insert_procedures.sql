-- Inserir reparador
-- Primeiro, verifica-se se a pessoa já foi cadastrada. Caso sim, adiciona apenas o reparador, caso contrário retorna falso.
-- Caso a pessoa nao esteja cadastrada, insere na View do reparador.
-- Para inserir na view do reaparador, é necessário uma Trigger para fazer a inserção nas tabelas correspondentes.
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION insert_reparador(_cpf VARCHAR, tipos VARCHAR[]) RETURNS boolean AS $$
DECLARE
    _tipo ReparadorTipo.tipo%TYPE;
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	    RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF tipos = '{}' THEN
        RAISE EXCEPTION 'Selecione os tipos do Reparador';
    END IF;

    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        IF NOT EXISTS (SELECT 1 FROM Reparador r WHERE r.cpf_pessoa = _cpf) THEN
            INSERT INTO Reparador VALUES (_cpf);
            FOREACH _tipo IN ARRAY tipos
            LOOP
                IF NOT EXISTS (SELECT 1 FROM ReparadorTipo rt WHERE rt.cpf_reparador = _cpf AND rt.tipo = _tipo) THEN
                    INSERT INTO ReparadorTipo VALUES (_cpf, _tipo);
                END IF;
            END LOOP;
        ELSE
            RAISE EXCEPTION 'Reparador já cadastrado';
        END IF;
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_reparador(_cpf VARCHAR,
                                            _sexo VARCHAR,
                                            _rg VARCHAR,
                                            _nome_prenome VARCHAR,
                                            _nome_sobrenome VARCHAR,
                                            _data_de_nascimento VARCHAR,
                                            _email VARCHAR,
                                            tipos VARCHAR[]) RETURNS void AS $$
DECLARE
    tipo ReparadorTipo.tipo%TYPE;
BEGIN
    FOREACH tipo IN ARRAY tipos
    LOOP
        INSERT INTO view_reparador (cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email, tipo)
        VALUES (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email, tipo);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Inserir cozinheira
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION insert_cozinheira(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
	    RAISE EXCEPTION 'CPF Invalido';
    END IF;

    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        IF NOT EXISTS (SELECT 1 FROM Cozinheira c WHERE c.cpf_pessoa = _cpf) THEN
            INSERT INTO Cozinheira VALUES (_cpf);
        ELSE
            RAISE EXCEPTION 'Cozinheira já cadastrada';
        END IF;
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_reparador(_cpf VARCHAR,
                                            _sexo VARCHAR,
                                            _rg VARCHAR,
                                            _nome_prenome VARCHAR,
                                            _nome_sobrenome VARCHAR,
                                            _data_de_nascimento VARCHAR,
                                            _email VARCHAR) RETURNS void AS $$
DECLARE
    tipo ReparadorTipo.tipo%TYPE;
BEGIN
    INSERT INTO Pessoa VALUES (_cpf, _seco, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email);
    INSERT INTO Reparador VALUES (_cpf);
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

-- Inserir pessoa
-- Autor: Luis Felipe Tomazini
CREATE OR REPLACE FUNCTION insert_pessoa(_cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento date, _email VARCHAR) RETURNS boolean AS $$
  
BEGIN
  IF LENGTH (_cpf) != 11 THEN
     RAISE EXCEPTION 'CPF Invalido';
  END IF;
  
  IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
    RETURN (FALSE);
  ELSE
    INSERT INTO pessoa (cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email) VALUES  (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, _data_de_nascimento, _email);
    RETURN (TRUE);
  END IF;
END;
$$ LANGUAGE plpgsql;
  
  
-- Inserir faxineira
-- Autor: Luis Felipe Tomazini
CREATE OR REPLACE FUNCTION insert_faxineira(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
  IF LENGTH (_cpf) != 11 THEN
    RAISE EXCEPTION 'CPF Invalido';
  END IF;
  
  IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
    IF EXISTS (SELECT 1 FROM Faxineira f WHERE f.cpf_pessoa = _cpf) THEN
      RAISE EXCEPTION 'Faxineira ja cadastrada';
    ELSE
      INSERT INTO Faxineira VALUES (_cpf);
    END IF;
    RETURN (TRUE);
  ELSE
    RETURN (FALSE);
  END IF;
END;
$$ LANGUAGE plpgsql;