var express = require('express');
var path = require('path');
var moment = require('moment');
var router = express.Router();

var db = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'HappyRep'
  });
});

/* Cadastros */

router.get('/CadastrarFuncionario', function (req, res) {
  res.render('formularios/cadastrar_funcionario');
})

// GET - Cadastrar reparador pelo CPF
router.get('/CadastrarFuncionario/CadastrarReparador', function (req, res) {
  res.render('formularios/form_reparador', {
    pessoa: 'Reparador',
    cadastrar: true,
    cadastrar_pessoa: false
  });
});

// POST - Cadastrar reparador pelo CPF
router.post('/CadastrarFuncionario/CadastrarReparador', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_reparador ($1, $2)', [req.body.cpf, '{' + req.body.tipo.join(', ') + '}'], function (ret) {
    if (ret.rows[0].insert_reparador) {
      res.render('index', {
        title: 'Deu bom!'
      });
    } else { // Precisa cadastrar a pessoa
      var values = {};
      values.pessoa = 'Reparador';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.tipos = {};
      req.body.tipo.forEach(function (elemento) {
        values.tipos[elemento] = true
      });

      res.render('formularios/form_reparador', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Reparador';
    values.cadastrar = true;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_reparador', values);
  });
});

router.post('/CadastrarFuncionario/CadastrarPessoaReparador', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_reparador ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, '{' + req.body.tipo.join(', ') + '}', req.body.email],
    function (ret) {
      res.render('index', {
        title: 'Deu bom!'
      });
    },
    function (err) {
      var values = {};
      values.pessoa = 'Reparador';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.rg_value = req.body.rg;
      values.prenome_value = req.body.prenome;
      values.sobrenome_value = req.body.sobrenome;
      values.data_de_nascimento_value = req.body.data_de_nascimento;
      values.email_value = req.body.email;
      values.sexo_m = (req.body.sexo == 'M' ? true : false);
      values.sexo_f = (req.body.sexo == 'F' ? true : false);
      values.tipos = {};
      req.body.tipo.forEach(function (elemento) {
        values.tipos[elemento] = true
      });
      values.erro = err;

      res.render('formularios/form_reparador', values);
    });
});

router.get('/CadastrarFuncionario/CadastrarCozinheira', function (req, res) {
  res.render('formularios/form_cozinheira', {
    pessoa: 'Cozinheira',
    cadastrar: true,
    cadastrar_pessoa: false
  });
});

router.post('/CadastrarFuncionario/CadastrarCozinheira', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_cozinheira ($1)', [req.body.cpf], function (ret) {
    if (ret.rows[0].insert_cozinheira) {
      res.render('index', {
        title: 'Deu bom!'
      });
    } else {
      var values = {};
      values.pessoa = 'Cozinheira';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/form_cozinheira', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Cozinheira';
    values.cadastrar = true;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_cozinheira', values);
  });
});

router.post('/CadastrarFuncionario/CadastrarPessoaCozinheira', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_cozinheira ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      res.render('index', {
        title: 'Deu bom!'
      });
    },
    function (err) {
      var values = {};
      values.pessoa = 'Cozinheira';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.rg_value = req.body.rg;
      values.prenome_value = req.body.prenome;
      values.sobrenome_value = req.body.sobrenome;
      values.data_de_nascimento_value = req.body.data_de_nascimento;
      values.email_value = req.body.email;
      values.sexo_m = (req.body.sexo == 'M' ? true : false);
      values.sexo_f = (req.body.sexo == 'F' ? true : false);
      values.erro = err;

      res.render('formularios/form_cozinheira', values);
    });
});

/* Alterar cadastros */

router.get('/AlterarFuncionario', function (req, res) {
  res.render('formularios/alterar_funcionario');
})

router.get('/AlterarFuncionario/AlterarCozinheira', function (req, res) {
  res.render('formularios/form_cozinheira', {
    pessoa: 'Cozinheira',
    cadastrar: false,
    cadastrar_pessoa: false
  });
});

// POST - Alterar Cozinheira com o CPF
// Deve atribuir no formulario os dados cadastrados para alteracao
router.post('/AlterarFuncionario/AlterarCozinheira', function (req, res) {
  db.query('SELECT * FROM view_cozinheira WHERE cpf = $1', [req.body.cpf], function (ret) {
    var values = {};
    if (ret.rowCount == 0) {
      var values = {};
      values.pessoa = 'Cozinheira';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = 'CPF não cadastrado';
    } else {
      values.pessoa = 'Cozinheira';
      values.cadastrar = false;
      values.cadastrar_pessoa = true;
      values.cpf_value = ret.rows[0].cpf;
      values.rg_value = ret.rows[0].rg;
      values.prenome_value = ret.rows[0].nome_prenome;
      values.sobrenome_value = ret.rows[0].nome_sobrenome;
      values.data_de_nascimento_value = moment(ret.rows[0].data_de_nascimento).format('DD/MM/YYYY');
      values.email_value = ret.rows[0].email;
      values.sexo_m = (ret.rows[0].sexo == 'M' ? true : false);
      values.sexo_f = (ret.rows[0].sexo == 'F' ? true : false);
    }
    res.render('formularios/form_cozinheira', values);
  }, function (err) {
    var values = {};
    values.pessoa = 'Cozinheira';
    values.cadastrar = false;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_cozinheira', values);
  });
});

// POST - Alterar todos os dados de Cozinheira
// Deve alterar os dados no banco
router.post('/AlterarFuncionario/AlterarPessoaCozinheira', function (req, res) {
  db.query('SELECT update_cozinheira ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      if (ret.rows[0].update_cozinheira) {
        res.render('index', {
          title: 'Deu bom!'
        });
      } else {
        var values = {};
        values.pessoa = 'Cozinheira';
        values.cadastrar = false;
        values.cadastrar_pessoa = false;
        values.erro = 'CPF não cadastrado';
        res.render('formularios/form_cozinheira', values);
      }
    },
    function (err) {
      var values = {};
      values.pessoa = 'Cozinheira';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = err;

      res.render('formularios/form_cozinheira', values);
    });
});

// GET - Página de alterar reparador
// Usuário deve informar o CPF para iniciar
router.get('/AlterarFuncionario/AlterarReparador', function (req, res) {
  res.render('formularios/form_reparador', {
    pessoa: 'Reparador',
    cadastrar: false,
    cadastrar_pessoa: false
  });
});

// POST - Alterar Reparador com o CPF
// Deve atribuir no formulario os dados cadastrados para alteracao
router.post('/AlterarFuncionario/AlterarReparador', function (req, res) {
  db.query('SELECT * FROM view_reparador WHERE cpf = $1', [req.body.cpf], function (ret) {
    var values = {};
    if (ret.rowCount == 0) {
      var values = {};
      values.pessoa = 'Reparador';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = 'CPF não cadastrado';
    } else {
      values.pessoa = 'Reparador';
      values.cadastrar = false;
      values.cadastrar_pessoa = true;
      values.cpf_value = ret.rows[0].cpf;
      values.rg_value = ret.rows[0].rg;
      values.prenome_value = ret.rows[0].nome_prenome;
      values.sobrenome_value = ret.rows[0].nome_sobrenome;
      values.data_de_nascimento_value = moment(ret.rows[0].data_de_nascimento).format('DD/MM/YYYY');
      values.email_value = ret.rows[0].email;
      values.sexo_m = (ret.rows[0].sexo == 'M' ? true : false);
      values.sexo_f = (ret.rows[0].sexo == 'F' ? true : false);
      values.tipos = {};
      ret.rows.forEach(function (elemento) {
        values.tipos[elemento.tipo] = true
      });
    }
    res.render('formularios/form_reparador', values);
  }, function (err) {
    var values = {};
    values.pessoa = 'Reparador';
    values.cadastrar = false;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_reparador', values);
  });
});

// POST - Alterar todos os dados de Reparador
// Deve alterar os dados no banco
router.post('/AlterarFuncionario/AlterarPessoaReparador', function (req, res) {
  db.query('SELECT update_reparador ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email, '{' + req.body.tipo.join(', ') + '}'],
    function (ret) {
      if (ret.rows[0].update_reparador) {
        res.render('index', {
          title: 'Deu bom!'
        });
      } else {
        var values = {};
        values.pessoa = 'Reparador';
        values.cadastrar = false;
        values.cadastrar_pessoa = false;
        values.erro = 'CPF não cadastrado';
        res.render('formularios/form_reparador', values);
      }
    },
    function (err) {
      var values = {};
      values.pessoa = 'Reparador';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = err;

      res.render('formularios/form_reparador', values);
    });
});

/* Listas */

router.get('/ListaFuncionarios', function (req, res) {
  res.render('listas/funcionarios/funcionarios');
});

router.get('/ListaFuncionarios/ListaReparador', function (req, res) {
  db.query('SELECT * FROM view_reparador ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('listas/funcionarios/reparador', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.get('/ListaFuncionarios/ListaCozinheira', function (req, res) {
  db.query('SELECT * FROM view_cozinheira ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('listas/funcionarios/cozinheira', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

module.exports = router;