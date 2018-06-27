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



