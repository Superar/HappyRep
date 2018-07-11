var express = require('express');
var path = require('path');
var router = express.Router();

var db = require('../database');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'HappyRep'
  });
});

router.get('/CadastrarFuncionario', function (req, res) {
  res.render('formularios/cadastrar_funcionario');
})

router.get('/CadastrarFuncionario/CadastrarReparador', function (req, res) {
  res.render('formularios/cadastrar_reparador', {
    pessoa: 'Reparador',
    cadastrar_pessoa: false
  });
});

router.post('/CadastrarFuncionario/CadastrarReparador', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_reparador ($1, $2)', [req.body.cpf, '{' + req.body.tipo.join(', ') + '}'], function (ret) {
    if (ret.rows[0].insert_reparador) {
      res.render('index', {
        title: 'Deu bom!'
      });
    } else {
      var values = {};
      values.pessoa = 'Reparador';
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/cadastrar_reparador', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Reparador';
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/cadastrar_reparador', values);
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
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.rg_value = req.body.rg;
      values.prenome_value = req.body.prenome;
      values.sobrenome_value = req.body.sobrenome;
      values.data_de_nascimento_value = req.body.data_de_nascimento;
      values.email_value = req.body.email;
      values.erro = err;

      res.render('formularios/cadastrar_reparador', values);
    });
});

router.get('/CadastrarFuncionario/CadastrarCozinheira', function (req, res) {
  res.render('formularios/cadastrar_cozinheira', {
    pessoa: 'Cozinheira',
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
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/cadastrar_cozinheira', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Cozinheira';
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/cadastrar_cozinheira', values);
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
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.rg_value = req.body.rg;
      values.prenome_value = req.body.prenome;
      values.sobrenome_value = req.body.sobrenome;
      values.data_de_nascimento_value = req.body.data_de_nascimento;
      values.email_value = req.body.email;
      values.erro = err;

      res.render('formularios/cadastrar_cozinheira', values);
    });
});

router.get('/CadastrarFuncionario/CadastrarFaxineira', function (req, res) {
  res.render('formularios/cadastrar_faxineira', {
    pessoa: 'Faxineira',
    cadastrar_pessoa: false
  });
});

router.post('/CadastrarFuncionario/CadastrarFaxineira', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_faxineira ($1)', [req.body.cpf], function (ret) {
    if (ret.rows[0].insert_faxineira) {
      res.render('index', {
        title: 'Deu bom!'
      });
    } else {
      var values = {};
      values.pessoa = 'Faxineira';
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/cadastrar_faxineira', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Faxineira';
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/cadastrar_faxineira', values);
  });
});

router.post('/CadastrarFuncionario/CadastrarPessoaFaxineira', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_faxineira ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      res.render('index', {
        title: 'Deu bom!'
      });
    },
    function (err) {
      var values = {};
      values.pessoa = 'Faxineira';
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.rg_value = req.body.rg;
      values.prenome_value = req.body.prenome;
      values.sobrenome_value = req.body.sobrenome;
      values.data_de_nascimento_value = req.body.data_de_nascimento;
      values.email_value = req.body.email;
      values.erro = err;

      res.render('formularios/cadastrar_faxineira', values);
    });
});

router.get('/CadastrarFuncionario/CadastrarPessoa', function (req, res) {
  res.render('formularios/cadastrar_pessoa', {
    pessoa: 'Pessoa',
    cadastrar_pessoa: false
  });
});

router.post('/CadastrarFuncionario/CadastrarPessoaPessoa', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_pessoa ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      res.render('index', {
        title: 'Deu bom!'
      });
    },
    function (err) {
      var values = {};
      values.pessoa = 'Pessoa';
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.rg_value = req.body.rg;
      values.prenome_value = req.body.prenome;
      values.sobrenome_value = req.body.sobrenome;
      values.data_de_nascimento_value = req.body.data_de_nascimento;
      values.email_value = req.body.email;
      values.erro = err;

      res.render('formularios/cadastrar_pessoa', values);
    });
});

// Listas
router.get('/ListaFuncionarios', function (req, res) {

  db.query('SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email FROM view_reparador UNION SELECT * FROM view_cozinheira', null, function (ret) {
      res.render('listas/funcionarios', {
        funcionarios: ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

module.exports = router;