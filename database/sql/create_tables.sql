DROP TABLE IF EXISTS nutricionista CASCADE;
DROP TABLE IF EXISTS morador CASCADE;
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

-- Table: morador

CREATE TABLE morador
(
  trabalho character varying(50),
  universidade character varying(50),
  cpf_pessoa character varying(11) NOT NULL,
  CONSTRAINT morador_pk PRIMARY KEY (cpf_pessoa),
  CONSTRAINT morador_fk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

-- Table: nutricionista

CREATE TABLE nutricionista
(
  cpf_pessoa character varying(11) NOT NULL,
  CONSTRAINT nutricionista_pk PRIMARY KEY (cpf_pessoa),
  CONSTRAINT nutricionista_pk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);
 
