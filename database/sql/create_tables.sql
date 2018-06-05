DROP TABLE IF EXISTS Comodo CASCADE;
DROP TABLE IF EXISTS Republica CASCADE;
DROP TABLE IF EXISTS nutricionista CASCADE;
DROP TABLE IF EXISTS morador CASCADE;
DROP TABLE IF EXISTS faxineira CASCADE;
DROP TABLE IF EXISTS Pessoa CASCADE;

-- Table: pessoa

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

-- Table: faxineira

CREATE TABLE faxineira
(
  cpf_pessoa character(11) NOT NULL,
  CONSTRAINT faxineira_pk PRIMARY KEY (cpf_pessoa),
  CONSTRAINT faxineira_fk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
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

-- Table: Republica

CREATE TABLE Republica
(
  id_republica smallint NOT NULL,
  status smallint NOT NULL,
  endereco_cep character varying(8) NOT NULL,
  endereco_logradouro character varying(50) NOT NULL,
  endereco_numero smallint NOT NULL,
  endereco_complemento character varying(50),
  endereco_observacoes character varying(100),
  CONSTRAINT pk_republica PRIMARY KEY (id_republica)
);

-- Table: Comodo

CREATE TABLE Comodo
(
  id_comodo smallint NOT NULL,
  id_republica smallint NOT NULL,
  CONSTRAINT fk_comodo_republica FOREIGN KEY (id_republica) 
    REFERENCES public.Republica (id_republica) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION
);
