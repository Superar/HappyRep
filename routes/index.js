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

router.get('/CadastrarReparador', function (req, res) {
  res.render('formularios/cadastrar_reparador', {
    pessoa: 'Reparador',
    cadastrar_pessoa: false
  });
});

router.post('/CadastrarReparador', function (req, res) {
  if (req.body.tipo == null) {
    req.body.tipo = [];
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

router.post('/CadastrarPessoaReparador', function (req, res) {
  if (req.body.tipo == null) {
    req.body.tipo = [];
  }

  db.query('SELECT insert_reparador ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email, '{' + req.body.tipo.join(', ') + '}'],
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
      values.erro = err;

      res.render('formularios/cadastrar_reparador', values);
    });
});

module.exports = router;