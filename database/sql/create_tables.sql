DROP TABLE IF EXISTS Pessoa CASCADE;

CREATE TABLE Pessoa (
    cpf VARCHAR(11) NOT NULL,
    sexo VARCHAR NOT NULL,
    rg VARCHAR(10) NOT NULL,
    nome_prenome VARCHAR(30) NOT NULL,
    nome_sobrenome VARCHAR(70) NOT NULL,
    data_de_nascimento DATE NOT NULL,
    email VARCHAR(100),

    CONSTRAINT pk_pessoa PRIMARY KEY (cpf)
);