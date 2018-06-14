CREATE OR REPLACE FUNCTION insert_view_reparador() RETURNS trigger AS $$
DECLARE
    tipo ReparadorTipo.tipo%TYPE;
BEGIN
    INSERT INTO Pessoa VALUES (NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    INSERT INTO Reparador VALUES (NEW.cpf);

    FOREACH tipo IN ARRAY NEW.tipos
    LOOP
        INSERT INTO ReparadorTipo VALUES (NEW.cpf, tipo);
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_view_reparador INSTEAD OF INSERT ON view_reparador
FOR EACH ROW EXECUTE PROCEDURE insert_view_reparador();
