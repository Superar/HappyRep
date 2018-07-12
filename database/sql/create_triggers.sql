-- Insere reparador em view_reparador
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION insert_view_reparador() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
        PERFORM insert_pessoa(NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Reparador r WHERE r.cpf_pessoa = NEW.cpf) THEN
        INSERT INTO Reparador VALUES (NEW.cpf);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM ReparadorTipo rt WHERE rt.cpf_reparador = NEW.cpf AND rt.tipo = NEW.tipo) THEN
        INSERT INTO ReparadorTipo VALUES (NEW.cpf, NEW.tipo);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_view_reparador INSTEAD OF INSERT ON view_reparador
FOR EACH ROW EXECUTE PROCEDURE insert_view_reparador();

-- Deleta linha em view_reparador
-- Autor: Marcio Lima Inácio

CREATE OR REPLACE FUNCTION delete_row_view_reparador() RETURNS trigger AS $$
DECLARE
    _num_rows INT;
BEGIN
    SELECT COUNT(1) INTO _num_rows FROM view_reparador vr WHERE vr.cpf = OLD.cpf;

    -- Se for a ultima linha a ser deletada, deve deletar o reparador
    IF _num_rows = 1 THEN
        DELETE FROM ReparadorTipo rt WHERE rt.cpf_reparador = OLD.cpf AND rt.tipo = OLD.tipo;
        DELETE FROM Reparador r WHERE r.cpf_pessoa = OLD.cpf;
    -- Caso contrário, deleta-se apenas o tipo
    ELSE
        DELETE FROM ReparadorTipo rt WHERE rt.cpf_reparador = OLD.cpf AND rt.tipo = OLD.tipo; 
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_row_view_reparador INSTEAD OF DELETE ON view_reparador
FOR EACH ROW EXECUTE PROCEDURE delete_row_view_reparador();

-- Insere nutricionista em view nutricionista
-- Autor: Tiago Bachiega de Almeida

--function
CREATE OR REPLACE FUNCTION insert_view_nutricionista() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
        INSERT INTO Pessoa VALUES (NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Nutricionista n WHERE n.cpf_pessoa = NEW.cpf) THEN
        INSERT INTO Nutricionista VALUES (NEW.cpf);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger respectivo

CREATE TRIGGER insert_view_nutricionista INSTEAD OF INSERT ON view_nutricionista
FOR EACH ROW EXECUTE PROCEDURE insert_view_nutricionista();

-- Insere morador em view morador
-- Autor: Tiago Bachiega de Almeida

--function
CREATE OR REPLACE FUNCTION insert_view_morador() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
        INSERT INTO Pessoa VALUES (NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Nutricionista n WHERE n.cpf_pessoa = NEW.cpf) THEN
        INSERT INTO Morador VALUES (NEW.trabalho, NEW.universidade, NEW.cpf);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger respectivo

CREATE TRIGGER insert_view_morador INSTEAD OF INSERT ON view_morador
FOR EACH ROW EXECUTE PROCEDURE insert_view_morador();

-- Insere pessoa em view_pessoa
-- Autor: Luís Felipe Tomazini

CREATE OR REPLACE FUNCTION insert_view_pessoa() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
        PERFORM insert_pessoa(NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger respectivo

CREATE TRIGGER insert_view_pessoa INSTEAD OF INSERT ON view_pessoa
FOR EACH ROW EXECUTE PROCEDURE insert_view_pessoa();

-- Insere faxineira em view_faxineira
-- Autor: Luís Felipe Tomazini

CREATE OR REPLACE FUNCTION insert_view_faxineira() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
        PERFORM insert_pessoa(NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Faxineira f WHERE f.cpf_pessoa = NEW.cpf) THEN
        INSERT INTO Faxineira VALUES (NEW.cpf);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--trigger respectivo

CREATE TRIGGER insert_view_faxineira INSTEAD OF INSERT ON view_faxineira
FOR EACH ROW EXECUTE PROCEDURE insert_view_faxineira();

-- Deleta todos comodos antes de deletar a republica
-- Autor: Victor Calefi Ramos

CREATE OR REPLACE FUNCTION delete_row_view_republica() RETURNS trigger AS $$
BEGIN
    DELETE FROM Comodo c WHERE c.id_republica = OLD.id_republica;
    DELETE FROM Republica rep WHERE rep.id_republica = OLD.id_republica;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_row_view_republica INSTEAD OF DELETE ON view_republica
FOR EACH ROW EXECUTE PROCEDURE delete_row_view_republica();

-- Deletar republica se comodo for o ultimo comodo a ser deletado
-- Autor: Victor Calefi Ramos

CREATE OR REPLACE FUNCTION delete_row_view_comodo() RETURNS trigger AS $$
DECLARE
    _num_rows INT;
BEGIN
    SELECT COUNT(1) INTO _num_rows FROM view_comodo vc WHERE vc.id_republica = OLD.id_republica;

    -- Se for a ultima linha a ser deletada, deve deletar a republica
    IF _num_rows = 1 THEN
        DELETE FROM Comodo c WHERE c.id_republica = OLD.id_republica;
        DELETE FROM Republica rep WHERE rep.id_republica = OLD.id_republica;
    -- Caso contrário, deleta-se apenas o comodo
    ELSE
        DELETE FROM Comodo c WHERE c.id_comodo = OLD.id_comodo AND c.id_republica = OLD.id_republica; 
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER delete_row_view_reparador INSTEAD OF DELETE ON view_comodo
FOR EACH ROW EXECUTE PROCEDURE delete_row_view_comodo();

-- Insere e atualiza pessoa
-- Autor: Luís Felipe Tomazini

CREATE FUNCTION valida_pessoa() RETURNS trigger AS $valida_pessoa$
    BEGIN
        IF LENGTH (NEW.cpf) != 11 THEN
            RAISE EXCEPTION 'CPF Invalido';
        END IF;

        IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
            RAISE EXCEPTION 'CPF % ja cadastrado', NEW.cpf;
        ELSE
            RETURN NEW;
        END IF;
    END;
$valida_pessoa$ LANGUAGE plpgsql;

CREATE TRIGGER valida_pessoa BEFORE INSERT OR UPDATE ON pessoa
    FOR EACH ROW EXECUTE PROCEDURE valida_pessoa();

-- Validacao de morador
--deve ter trabalho ou ser universitario
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION valida_morador() RETURNS trigger AS $valida_morador$
DECLARE
    BEGIN
	IF NEW.trabalho is NULL AND NEW.universidade is NULL THEN
		RAISE EXCEPTION 'Deve possuir trabalho ou universidade';
	END IF;
        RETURN NEW;
    END;
$valida_morador$ LANGUAGE plpgsql;

CREATE TRIGGER valida_morador BEFORE INSERT OR UPDATE ON Morador
    FOR EACH ROW EXECUTE PROCEDURE valida_morador();

-- Insere Faxina
-- Autor: Isadora Gallerani

CREATE OR REPLACE FUNCTION insert_view_faxina() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
        PERFORM insert_pessoa(NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Faxineira fx WHERE fx.cpf_pessoa = NEW.cpf) THEN
        PERFORM insert_faxineira VALUES (NEW.cpf);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Servico s WHERE s.id_servico = NEW.id_servico) THEN
        PERFORM insert_servico (NEW.id_servico, NEW.hora_inicio, NEW.hora_fim);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Faxina f WHERE f.cpf_faxineira = NEW.cpf AND f.id_servico = NEW.id_servico) THEN
        INSERT INTO Faxina VALUES (NEW.cpf, NEW.id_servico);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_view_faxina INSTEAD OF INSERT ON view_faxina
FOR EACH ROW EXECUTE PROCEDURE insert_view_faxina();

-- Insere Ingredientes
-- Autor: Isadora Gallerani

CREATE OR REPLACE FUNCTION insert_view_ingredientes() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Receita r WHERE r.id_receita = NEW.id_receita) THEN
        PERFORM insert_receita(NEW.id_receita, NEW.nome_produto, NEW.descricao_receita);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Produto pr WHERE pr.id_produto = NEW.id_produto) THEN
        PERFORM insert_produto VALUES (NEW.id_produto, NEW.descricao, NEW.marca, NEW.categoria, NEW.nome);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Ingredientes i WHERE i.id_receita = NEW.id_receita AND i.id_produto = NEW.id_produto) THEN
        INSERT INTO Ingredientes VALUES (NEW.id_receita, NEW.id_produto);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_view_ingredientes INSTEAD OF INSERT ON view_ingredientes
FOR EACH ROW EXECUTE PROCEDURE insert_view_ingredientes();

-- Insere Alimentação
-- Autor: Isadora Gallerani

CREATE OR REPLACE FUNCTION insert_view_alimentacao() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf_cozinheira) THEN
        PERFORM insert_pessoa(NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf_nutricionista) THEN
        PERFORM insert_pessoa(NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Cozinheira c WHERE c.cpf_pessoa = NEW.cpf_cozinheira) THEN
        PERFORM insert_cozinheira(NEW.cpf_cozinheira);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Nutricionista n WHERE n.cpf_pessoa = NEW.cpf_nutricionista) THEN
        PERFORM insert_nutricionista(NEW.cpf_nutricionista);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Servico s WHERE s.id_servico = NEW.id_servico) THEN
        PERFORM insert_servico(NEW.id_servico, NEW.hora_inicio, NEW.hora_fim);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM Alimentacao a WHERE a.id_servico = NEW.id_servico) THEN
        INSERT INTO Alimentacao VALUES (NEW.id_servico, NEW.cpf_cozinheira, NEW.cpf_nutricionista);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_view_alimentacao INSTEAD OF INSERT ON view_alimentacao
FOR EACH ROW EXECUTE PROCEDURE insert_view_alimentacao();

-- Validação de horários de serviço
-- Autora: Isadora Gallerani

CREATE FUNCTION valida_servico() RETURNS trigger AS $valida_hora$
    BEGIN
        IF (NEW.hora_inicio == NEW.hora_fim) THEN
            RAISE EXCEPTION 'Horário de Iniício/Fim inválido(s)';
        END IF;
        IF EXISTS (SELECT 1 FROM Servico s WHERE s.id_servico = NEW.id_servico) THEN
            RAISE EXCEPTION 'ID de Serviço % já cadastrado', NEW.id_servico;
        ELSE
            RETURN NEW;
        END IF;
    END;
$valida_pessoa$ LANGUAGE plpgsql;

CREATE TRIGGER valida_servico BEFORE INSERT OR UPDATE ON Servico
    FOR EACH ROW EXECUTE PROCEDURE valida_servico();