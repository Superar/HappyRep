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

