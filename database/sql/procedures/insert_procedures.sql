---------------------------------------------
------------ CREATE FUNCTIONS ---------------
---------------------------------------------

-- Function: Inserir reparador
-- Autor: Marcio Lima Inácio
-- Primeiro, verifica-se se a pessoa já foi cadastrada. 
-- Caso sim, adiciona apenas o reparador, caso contrário retorna falso.
-- Caso a pessoa nao esteja cadastrada, insere na View do reparador.
-- Para inserir na view do reaparador, é necessário uma Trigger para fazer a inserção nas tabelas correspondentes.


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
                                            tipos VARCHAR[],
                                            _email VARCHAR DEFAULT '') RETURNS void AS $$
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

-- Function: Inserir cozinheira
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

CREATE OR REPLACE FUNCTION insert_cozinheira(_cpf VARCHAR,
                                            _sexo VARCHAR,
                                            _rg VARCHAR,
                                            _nome_prenome VARCHAR,
                                            _nome_sobrenome VARCHAR,
                                            _data_de_nascimento VARCHAR,
                                            _email VARCHAR DEFAULT '') RETURNS void AS $$
BEGIN
    PERFORM insert_pessoa(_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email);
    INSERT INTO Cozinheira VALUES (_cpf);
END;
$$ LANGUAGE plpgsql;

-- Function: Inserir nutricionista
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

-- Function: Inserir morador
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

-- Function: Inserir pessoa
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
  
  
-- Function: Inserir faxineira
-- Autor: Luis Felipe Tomazini

CREATE OR REPLACE FUNCTION insert_faxineira(_cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento VARCHAR, _email VARCHAR) RETURNS boolean AS $$
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
    RETURN insert_pessoa (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function: Inserir republica
-- Autor: Victor Calefi Ramos

CREATE OR REPLACE FUNCTION insert_republica(_id_republica smallint, 
    _status smallint,  
    _endereco_cep VARCHAR, 
    _endereco_logradouro VARCHAR, 
    _endereco_numero smallint, 
    _endereco_complemento VARCHAR, 
    _endereco_observacoes VARCHAR) RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Republica rep WHERE rep.id_republica = _id_republica) THEN
        RAISE EXCEPTION 'Republica já cadastrada';
    END IF;
    INSERT INTO Republica (id_republica, 
        status, 
        endereco_cep, 
        endereco_logradouro, 
        endereco_numero, 
        endereco_complemento, 
        endereco_observacoes) 
    VALUES (_id_republica, 
        _status, 
        _endereco_cep, 
        _endereco_logradouro, 
        _endereco_numero, 
        _endereco_complemento, 
        _endereco_observacoes);
END;
$$ LANGUAGE plpgsql;

-- Function: Inserir comodo
-- Autor: Victor Calefi Ramos

CREATE OR REPLACE FUNCTION insert_comodo(_id_comodo smallint, 
    _id_republica smallint, 
    _status smallint,  
    _endereco_cep VARCHAR, 
    _endereco_logradouro VARCHAR, 
    _endereco_numero smallint, 
    _endereco_complemento VARCHAR, 
    _endereco_observacoes VARCHAR) RETURNS void AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Comodo c, Republica rep WHERE c.id_comodo = _id_comodo AND rep.id_republica = _id_republica) THEN
        RAISE EXCEPTION 'Comodo já cadastrado';
    ELSE IF EXISTS (SELECT 1 FROM Republica rep WHERE rep.id_republica = _id_republica) THEN
        INSERT INTO Comodo VALUES (_id_comodo, _id_republica);
    ELSE
        PERFORM insert_republica (_id_republica, 
            _status,
            _endereco_cep,
            _endereco_logradouro,
            _endereco_numero,
            _endereco_complemento,
            _endereco_observacoes);
        INSERT INTO Comodo VALUES (_id_comodo, _id_republica); 
    END IF;
END;
$$ LANGUAGE plpgsql;