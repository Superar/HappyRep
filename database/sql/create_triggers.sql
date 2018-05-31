CREATE OR REPLACE FUNCTION insert_view_reparador() RETURNS trigger AS $$
BEGIN
    INSERT INTO Pessoa VALUES (NEW.cpf, NEW.sexo, NEW.rg, NEW.nome_prenome, NEW.nome_sobrenome, NEW.data_de_nascimento, NEW.email);
    INSERT INTO Reparador VALUES (NEW.cpf);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_view_reparador INSTEAD OF INSERT ON view_reparador
FOR EACH ROW EXECUTE PROCEDURE insert_view_reparador();

INSERT INTO view_reparador (cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento) VALUES('12345678925', 'f', '5642138754', 'Nenque', 'Vacatussa', '03/05/2015')