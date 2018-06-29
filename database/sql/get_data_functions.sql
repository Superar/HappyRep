--Pega dados de pessoas e seus derivados
--Autor: Tiago Bachiega de Almeida

--trabalho
CREATE OR REPLACE FUNCTION get_trabalho(_cpf VARCHAR) RETURNS VARCHAR(100) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Morador m WHERE m.cpf_pessoa = _cpf) THEN
        RETURN (SELECT trabalho FROM Morador m WHERE m.cpf_pessoa = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

--universidade
CREATE OR REPLACE FUNCTION get_universidade(_cpf VARCHAR) RETURNS VARCHAR(100) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Morador m WHERE m.cpf_pessoa = _cpf) THEN
        RETURN (SELECT universidade FROM Morador m WHERE m.cpf_pessoa = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

--sexo
CREATE OR REPLACE FUNCTION get_sexo(_cpf VARCHAR) RETURNS VARCHAR(11) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT sexo FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

--rg
CREATE OR REPLACE FUNCTION get_rg(_cpf VARCHAR) RETURNS VARCHAR(10) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT rg FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

--nome_prenome
CREATE OR REPLACE FUNCTION get_nome_prenome(_cpf VARCHAR) RETURNS VARCHAR(30) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT nome_prenome FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

--nome_sobrenome
CREATE OR REPLACE FUNCTION get_sobrenome(_cpf VARCHAR) RETURNS VARCHAR(70) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT nome_sobrenome FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

--data_de_nascimento
CREATE OR REPLACE FUNCTION get_data(_cpf VARCHAR) RETURNS DATE AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT data_de_nascimento FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

--email
CREATE OR REPLACE FUNCTION get_email(_cpf VARCHAR) RETURNS VARCHAR(100) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (SELECT email FROM Pessoa p WHERE p.cpf = _cpf);
    ELSE
        RETURN (0);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function: verifica se existe pessoa cadastrada
-- Autor: Luis Felipe Tomazini
CREATE OR REPLACE FUNCTION existe_pessoa(_cpf VARCHAR) RETURNS boolean AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Pessoa p WHERE p.cpf = _cpf) THEN
        RETURN (FALSE);
    ELSE
        RETURN (TRUE);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function: nomes_por_sexo
-- Autor: Luis Felipe Tomazini

CREATE OR REPLACE FUNCTION nomes_por_sexo(_sexo VARCHAR)
  RETURNS text AS $$
DECLARE 
 pessoas TEXT DEFAULT '';
 rec_pessoa   PESSOA;
 cur_pessoas CURSOR(_sexo VARCHAR) 
 FOR SELECT *
 FROM pessoa
 WHERE sexo = _sexo;
BEGIN
   OPEN cur_pessoas(_sexo);
   LOOP
      FETCH cur_pessoas INTO rec_pessoa;
      EXIT WHEN NOT FOUND;
      pessoas := pessoas || rec_pessoa.nome_prenome || ' ' || rec_pessoa.nome_sobrenome || E'\n';
   END LOOP;
   CLOSE cur_pessoas;
 
   RETURN pessoas;
END; $$
LANGUAGE plpgsql;

-- Function com cursor: nomes_por_trabalho
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION nomes_por_trabalho(_trabalho VARCHAR)
  RETURNS text AS $$
DECLARE 
 pessoas TEXT DEFAULT '';
 rec_pessoa   PESSOA;
 cur_pessoas CURSOR(_trabalho VARCHAR) 
 FOR SELECT *
 FROM Pessoa p, Morador m
 WHERE m.trabalho = _trabalho AND p.cpf = m.cpf_pessoa;
BEGIN
   OPEN cur_pessoas(_trabalho);
   LOOP
      FETCH cur_pessoas INTO rec_pessoa;
      EXIT WHEN NOT FOUND;
      pessoas := pessoas || rec_pessoa.nome_prenome || ' ' || rec_pessoa.nome_sobrenome || E'\n';
   END LOOP;
   CLOSE cur_pessoas;
 
   RETURN pessoas;  
END; $$
LANGUAGE plpgsql;

-- Function com cursor: nomes_por_universidade
-- Autor: Tiago Bachiega de Almeida

CREATE OR REPLACE FUNCTION nomes_por_universidade(_universidade VARCHAR)
  RETURNS text AS $$
DECLARE 
 pessoas TEXT DEFAULT '';
 rec_pessoa   PESSOA;
 cur_pessoas CURSOR(_universidade VARCHAR) 
 FOR SELECT *
 FROM Pessoa p, Morador m
 WHERE m.universidade = _universidade AND p.cpf = m.cpf_pessoa;
BEGIN
   OPEN cur_pessoas(_universidade);
   LOOP
      FETCH cur_pessoas INTO rec_pessoa;
      EXIT WHEN NOT FOUND;
      pessoas := pessoas || rec_pessoa.nome_prenome || ' ' || rec_pessoa.nome_sobrenome || E'\n';
   END LOOP;
   CLOSE cur_pessoas;
 
   RETURN pessoas;
END; $$
LANGUAGE plpgsql;
