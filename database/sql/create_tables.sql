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
DROP TABLE IF EXISTS Nutricionista CASCADE;
DROP TABLE IF EXISTS Faxina CASCADE;
DROP TABLE IF EXISTS Reparo CASCADE;
DROP TABLE IF EXISTS Alimentacao CASCADE;

-- Table: pessoa

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

-- Table: pessoatelefone

CREATE TABLE PessoaTelefone
(
    cpf_pessoa CHAR(11) NOT NULL,
    telefone VARCHAR(11) NOT NULL,

    CONSTRAINT pessoatelefone_pk PRIMARY KEY (cpf_pessoa, telefone),
    CONSTRAINT pessoatelefone_fk_pessoa FOREIGN KEY (cpf_pessoa) REFERENCES Pessoa
);

-- Table: faxineira

CREATE TABLE faxineira
(
  cpf_pessoa character(11) NOT NULL,
  CONSTRAINT faxineira_pk PRIMARY KEY (cpf_pessoa),
  CONSTRAINT faxineira_fk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
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
      ON UPDATE CASCADE ON DELETE CASCADE
);


-- Table: cozinheira

CREATE TABLE Cozinheira
(
    cpf_pessoa CHAR(11) NOT NULL,

    CONSTRAINT cozinheira_pk PRIMARY KEY (cpf_pessoa),
    CONSTRAINT cozinheira_pk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: reparador

CREATE TABLE Reparador
(
    cpf_pessoa CHAR(11) NOT NULL,

    CONSTRAINT reparador_pk PRIMARY KEY (cpf_pessoa),
    CONSTRAINT reparador_fk_pessoa FOREIGN KEY (cpf_pessoa)
      REFERENCES public.pessoa (cpf) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

-- Table: reparadortipo

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

-- Table: Nutricionista

CREATE TABLE Nutricionista
(
    cpf_pessoa CHAR(11) NOT NULL,
    CONSTRAINT pk_nutricionista PRIMARY KEY (cpf_pessoa),
    CONSTRAINT fk_nutricionista_pessoa FOREIGN KEY (cpf_pessoa) REFERENCES Pessoa(cpf)
);

-- Table: Faxina

CREATE TABLE Faxina
(
    cpf_faxineira CHAR(11) NOT NULL,
    id_servico integer NOT NULL,
    CONSTRAINT pk_faxina PRIMARY KEY (cpf_faxineira, id_servico),
    CONSTRAINT fk_faxina_cpf FOREIGN KEY (cpf_faxineira) REFERENCES Faxineira(cpf_pessoa)
    CONSTRAINT fk_faxina_servico FOREIGN KEY (id_servico) REFERENCES Servico(id_servico)
);

-- Table: Reparo

CREATE TABLE Reparo
(
    cpf_reparador CHAR(11) NOT NULL,
    id_servico integer NOT NULL,
    CONSTRAINT fk_reparo_cpf FOREIGN KEY (cpf_reparador) REFERENCES Reparador(cpf_pessoa),
    CONSTRAINT fk_reparo_servico FOREIGN KEY (id_servico) REFERENCES Servico(id_servico),
    CONSTRAINT pk_reparo PRIMARY KEY (cpf_reparador, id_servico)
);

-- Table: Alimentação

CREATE TABLE Alimentacao
(
    cpf_cozinheira CHAR(11) NOT NULL,
    cpf_nutricionista CHAR(11) NOT NULL,
    id_servico integer NOT NULL,
    CONSTRAINT fk_alimentacao_cozinheira FOREIGN KEY (cpf_cozinheira) REFERENCES Cozinheira(cpf_pessoa),
    CONSTRAINT fk_alimentacao_nutricionista FOREIGN KEY (cpf_nutricionista) REFERENCES Nutricionista(cpf_pessoa),
    CONSTRAINT fk_alimentacao_servico FOREIGN KEY (id_servico) REFERENCES Servico(id_Servico),
    CONSTRAINT pk_alimentacao PRIMARY KEY (cpf_cozinheira, cpf_nutricionista, id_servico)
);
