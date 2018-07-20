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
                                            tipos VARCHAR[],
                                            _email VARCHAR DEFAULT NULL) RETURNS void AS $$
DECLARE
    tipo ReparadorTipo.tipo%TYPE;
BEGIN
    IF LENGTH (_cpf) != 11 THEN
        RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF tipos = '{}' THEN
        RAISE EXCEPTION 'Selecione os tipos do Reparador';
    END IF;
    IF LENGTH(_sexo) = 0 THEN
        RAISE EXCEPTION 'Selecione o sexo';
    END IF;
    IF LENGTH(_rg) = 0 THEN
        RAISE EXCEPTION 'Digite o RG';
    END IF;
    IF LENGTH(_nome_prenome) = 0 THEN
        RAISE EXCEPTION 'Digite o Primeiro Nome';
    END IF;
    IF LENGTH(_nome_sobrenome) = 0 THEN
        RAISE EXCEPTION 'Digite o Sobrenome';
    END IF;
    IF LENGTH(_data_de_nascimento) = 0 THEN
        RAISE EXCEPTION 'Digite a Data de Nascimento';
    END IF;
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

CREATE OR REPLACE FUNCTION insert_cozinheira(_cpf VARCHAR,
                                            _sexo VARCHAR,
                                            _rg VARCHAR,
                                            _nome_prenome VARCHAR,
                                            _nome_sobrenome VARCHAR,
                                            _data_de_nascimento VARCHAR,
                                            _email VARCHAR DEFAULT NULL) RETURNS void AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
        RAISE EXCEPTION 'CPF Invalido';
    END IF;
    IF LENGTH(_sexo) = 0 THEN
        RAISE EXCEPTION 'Selecione o sexo';
    END IF;
    IF LENGTH(_rg) = 0 THEN
        RAISE EXCEPTION 'Digite o RG';
    END IF;
    IF LENGTH(_nome_prenome) = 0 THEN
        RAISE EXCEPTION 'Digite o Primeiro Nome';
    END IF;
    IF LENGTH(_nome_sobrenome) = 0 THEN
        RAISE EXCEPTION 'Digite o Sobrenome';
    END IF;
    IF LENGTH(_data_de_nascimento) = 0 THEN
        RAISE EXCEPTION 'Digite a Data de Nascimento';
    END IF;
    PERFORM insert_pessoa(_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email);
    INSERT INTO Cozinheira VALUES (_cpf);
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
        IF NOT EXISTS (SELECT 1 FROM Nutricionista n WHERE n.cpf_pessoa = _cpf) THEN
            INSERT INTO Nutricionista VALUES (_cpf);
        ELSE
            RAISE EXCEPTION 'Nutricionista já cadastrada';
        END IF;
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;

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

-- Inserir morador
-- Autor: Tiago Bachiega de Almeida
CREATE OR REPLACE FUNCTION insert_morador(_trabalho VARCHAR, _universidade VARCHAR, _cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
        RAISE EXCEPTION 'CPF Invalido';
    END IF;

    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        IF NOT EXISTS (SELECT 1 FROM Morador m WHERE m.cpf_pessoa = _cpf) THEN
            INSERT INTO Morador VALUES (_trabalho, _universidade, _cpf);
        ELSE
            RAISE EXCEPTION 'Morador já cadastrado';
        END IF;
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;


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
CREATE OR REPLACE FUNCTION insert_faxineira(_cpf VARCHAR, _sexo VARCHAR, _rg VARCHAR, _nome_prenome VARCHAR, _nome_sobrenome VARCHAR, _data_de_nascimento VARCHAR, _email VARCHAR) RETURNS boolean AS $$
BEGIN
  IF LENGTH (_cpf) != 11 THEN
    RAISE EXCEPTION 'CPF Invalido';
  END IF;
  
  IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
    IF EXISTS (SELECT 1 FROM Faxineira f WHERE f.cpf_pessoa = _cpf) THEN
      RAISE EXCEPTION 'Faxineira ja cadastrada';
    ELSE
      INSERT INTO Faxineira (cpf_pessoa) VALUES (_cpf);
    END IF;
    RETURN (TRUE);
  ELSE
    PERFORM insert_pessoa (_cpf, _sexo, _rg, _nome_prenome, _nome_sobrenome, TO_DATE(_data_de_nascimento, 'DD/MM/YYYY'), _email);
    INSERT INTO Faxineira (cpf_pessoa) VALUES (_cpf);
    RETURN (TRUE);
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insert_faxineira(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF LENGTH (_cpf) != 11 THEN
        RAISE EXCEPTION 'CPF Invalido';
    END IF;

    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        IF NOT EXISTS (SELECT 1 FROM Faxineira c WHERE c.cpf_pessoa = _cpf) THEN
            INSERT INTO Faxineira VALUES (_cpf);
        ELSE
            RAISE EXCEPTION 'Faxineira já cadastrada';
        END IF;
        RETURN (TRUE);
    ELSE
        RETURN (FALSE);
    END IF;
END;
$$ LANGUAGE plpgsql;


-- Inserir republica
-- Autor: Victor Calefi Ramos

CREATE OR REPLACE FUNCTION insert_republica(_id_republica smallint, 
    _status smallint, 
    _endereco_cep VARCHAR, 
    _endereco_logradouro VARCHAR, 
    _endereco_numero smallint, 
    _endereco_complemento VARCHAR, 
    _endereco_observacoes VARCHAR
    _id_comodo smallint) RETURNS boolean AS $$
BEGIN  
    IF EXISTS (SELECT 1 FROM Republica rep WHERE rep.id_republica = _id_republica) THEN
        RAISE EXCEPTION 'Republica já cadastrada';
        RETURN (FALSE); 
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
    PERFORM insert_comodo (_id_comodo, _id_republica);
    RETURN (TRUE);
END;
$$ LANGUAGE plpgsql;

-- Inserir Comodo
-- Autor: Victor Calefi Ramos

CREATE OR REPLACE FUNCTION insert_comodo(_id_comodo smallint, _id_republica smallint) RETURNS boolean AS $$
BEGIN  
    IF NOT EXISTS (SELECT 1 FROM Republica rep WHERE rep.id_republica = _id_republica) THEN
        RAISE EXCEPTION 'Republica não cadastrada';
        RETURN (FALSE);
    END IF;
    IF EXISTS (SELECT 1 FROM Comodo c WHERE c.id_comodo = _id_comodo AND c.id_republica = _id_republica) THEN
        RAISE EXCEPTION 'Comodo já cadastrado';
        RETURN (FALSE);
    END IF;
    INSERT INTO Comodo (id_comodo, id_republica) VALUES (_id_comodo, _id_republica);
    RETURN (TRUE);
END;
$$ LANGUAGE plpgsql;

-- Inserir ingrediente
-- Autor: Juan Henrique dos Santos

CREATE OR REPLACE FUNCTION insert_ingrediente(_id_receita integer, _id_produto integer, _quantidade integer) RETURNS VOID AS $$
BEGIN  
    IF not EXISTS (SELECT 1 FROM produto p WHERE p.id_produto = _id_produto) THEN
        RAISE EXCEPTION 'Produto não existe';
    END IF;

    IF not EXISTS (SELECT 1 FROM receita r WHERE r.id_receita = _id_receita) THEN
        RAISE EXCEPTION 'Receita não existe';
    END IF;

    IF EXISTS (SELECT 1 FROM ingredientes i WHERE i.id_produto = _id_produto AND i.id_receita = _id_receita) THEN
        RAISE EXCEPTION 'Ingrediente já está cadastrado';
    END IF;

    INSERT INTO ingredientes (id_receita, id_produto, quantidade) VALUES (_id_receita, _id_produto, _quantidade);
END;
$$ LANGUAGE plpgsql;

-- Inserir serviço
-- Autor: Isadora Gallerani
CREATE OR REPLACE FUNCTION insert_servico(_hora_inicio DATE, _hora_fim DATE, _id_servico INTEGER) RETURNS boolean AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM Servico s WHERE s.id_servico = _id_servico) THEN
    RETURN (FALSE);
  ELSE
    INSERT INTO Servico (hora_inicio, hora_fim, id_servico) VALUES (TO_DATE(_hora_inicio, 'DD/MM/YYYY'), TO_DATE(_hora_fim, 'DD/MM/YYYY'), _id_servico);
    RETURN (TRUE);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Inserir alimentação
-- Autor: Isadora Gallerani
CREATE OR REPLACE FUNCTION insert_alimentacao(_cpf_cozinheira VARCHAR, _cpf_nutricionista VARCHAR, _id_servico INTEGER) RETURNS boolean AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM Servico s WHERE s.id_servico = _id_servico) THEN
    IF EXISTS (SELECT 1 FROM Cozinheira c WHERE c.cpf_pessoa = _cpf_cozinheira) THEN
      IF EXISTS (SELECT 1 FROM Nutricionista n WHERE n.cpf_pessoa = _cpf_nutricionista) THEN
		RAISE EXCEPTION 'Alimentação já cadastrada';
		RETURN (FALSE);
	  ELSE
		PERFORM insert_nutricionista (_cpf_nutricionista);
	ELSE
      PERFORM insert_cozinheira (_cpf_cozinheira);	  
    ELSE
		INSERT INTO Alimentacao (cpf_cozinheira, cpf_nutricionista, id_servico) VALUES (_cpf_cozinheira, _cpf_nutricionista, _id_servico);
	END IF;
  ELSE
    PERFORM insert_servico (TO_DATE(_hora_inicio, 'DD/MM/YYYY'), TO_DATE(_hora_fim, 'DD/MM/YYYY'), id_servico INTEGER);
    INSERT INTO Alimentacao (cpf_cozinheira, cpf_nutricionista, id_servico) VALUES (_cpf_cozinheira, _cpf_nutricionista, _id_servico);
    RETURN (TRUE);
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE or Replace FUNCTION insert_pagamento(_valor integer , _vencimento date, _cod_barras VARCHAR, _multa integer, _nome_pagador_prenome VARCHAR, _nome_pagador_sobrenome VARCHAR, _cnpj_beneficiario VARCHAR, _end_beneficiario_logradouro VARCHAR, _end_beneficiario_numero integer, _end_beneficiario_complemento VARCHAR, _end_beneficiario_cep VARCHAR, _end_beneficiario_observacoes VARCHAR, _id_servico integer)
RETURNS AS $$
Begin
IF NOT EXISTS (SELECT 1 FROM Pagamento p WHERE p.cod_barras = NEW.cod_barras) THEN
        INSERT INTO Pagamento VALUES (NEW.cod_barras, NEW.valor, NEW.vencimento, NEW.multa, NEW.nome_pagador_prenome, NEW.nome_pagador_sobrenome, NEW.cnpj_beneficiario,  
                                        NEW.end_beneficiario_logradouro, NEW.end_beneficiario_numero, NEW.end_beneficiario_complemento, NEW.end_beneficiario_cep,
										NEW.end_beneficiario_observacoes, NEW.id_servico);
        PERFORM insert_pagamento(NEW.cod_barras, NEW.valor, NEW.vencimento, NEW.multa, NEW.nome_pagador_prenome, NEW.nome_pagador_sobrenome, NEW.cnpj_beneficiario,  
                                        NEW.end_beneficiario_logradouro, NEW.end_beneficiario_numero, NEW.end_beneficiario_complemento, NEW.end_beneficiario_cep,
										NEW.end_beneficiario_observacoes, NEW.id_servico);
END IF; 
	IF NOT EXISTS (SELECT 1 FROM Pagamento p WHERE p.cod_barras = NEW.cod_barras) THEN
        INSERT INTO Pagamento VALUES (NEW.cod_barras);
     	END IF;
    		RETURN NEW;
END;
$$ LANGUAGE plpgsql;