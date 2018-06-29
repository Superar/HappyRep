---------------------------------------------
--------------- DROP TABLES -----------------
---------------------------------------------

DROP TABLE IF EXISTS Comodo CASCADE;
DROP TABLE IF EXISTS Republica CASCADE;
DROP TABLE IF EXISTS ReparadorTipo CASCADE;
DROP TABLE IF EXISTS Reparador CASCADE;
DROP TABLE IF EXISTS Cozinheira CASCADE;
DROP TABLE IF EXISTS nutricionista CASCADE;
DROP TABLE IF EXISTS morador CASCADE;
DROP TABLE IF EXISTS Faxineira CASCADE;
DROP TABLE IF EXISTS PessoaTelefone;
DROP TABLE IF EXISTS Pessoa CASCADE;

---------------------------------------------
-------------- CREATE TABLES ----------------
---------------------------------------------

-- Table: Pessoa

CREATE TABLE Pessoa
(
    cpf CHAR(11) NOT NULL,
    sexo CHAR NOT NULL,
    rg VARCHAR(10) NOT NULL,
    nome_prenome VARCHAR(30) NOT NULL,
    nome_sobrenome VARCHAR(70) NOT NULL,
    data_de_nascimento DATE NOT NULL,
    email VARCHAR(100),

    CONSTRAINT pk_pessoa PRIMARY KEY (cpf)
);

-- Table: PessoaTelefone

CREATE TABLE PessoaTelefone
(
    cpf_pessoa CHAR(11) NOT NULL,
    telefone VARCHAR(11) NOT NULL,

    CONSTRAINT pessoatelefone_pk PRIMARY KEY (cpf_pessoa, telefone),
    CONSTRAINT pessoatelefone_fk_pessoa FOREIGN KEY (cpf_pessoa) REFERENCES Pessoa
);

-- Table: Faxineira

CREATE TABLE Faxineira
(
  cpf_pessoa character(11) NOT NULL,
  CONSTRAINT faxineira_pk PRIMARY KEY (cpf_pessoa),
  CONSTRAINT faxineira_fk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: Morador

CREATE TABLE Morador
(
  trabalho character varying(50),
  universidade character varying(50),
  cpf_pessoa character varying(11) NOT NULL,
  CONSTRAINT morador_pk PRIMARY KEY (cpf_pessoa),
  CONSTRAINT morador_fk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: Nutricionista

CREATE TABLE Nutricionista
(
  cpf_pessoa character varying(11) NOT NULL,
  CONSTRAINT nutricionista_pk PRIMARY KEY (cpf_pessoa),
  CONSTRAINT nutricionista_pk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: Cozinheira

CREATE TABLE Cozinheira
(
    cpf_pessoa CHAR(11) NOT NULL,

    CONSTRAINT cozinheira_pk PRIMARY KEY (cpf_pessoa),
    CONSTRAINT cozinheira_pk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: Reparador

CREATE TABLE Reparador
(
    cpf_pessoa CHAR(11) NOT NULL,

    CONSTRAINT reparador_pk PRIMARY KEY (cpf_pessoa),
    CONSTRAINT reparador_fk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: ReparadorTipo

CREATE TABLE ReparadorTipo
(
    cpf_reparador CHAR(11) NOT NULL,
    tipo VARCHAR(11) NOT NULL,

    CHECK (tipo IN ('pedreiro', 'encanador', 'chaveiro', 'eletricista')),

    CONSTRAINT reparadortipo_pk PRIMARY KEY (cpf_reparador, tipo),
    CONSTRAINT reparadortipo_fk_reparador FOREIGN KEY (cpf_reparador) REFERENCES Reparador ON DELETE CASCADE
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
