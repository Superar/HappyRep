CREATE OR REPLACE FUNCTION insert_view_reparador() RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = NEW.cpf) THEN
        INSERT INTO Pessoa VALUES (NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
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
