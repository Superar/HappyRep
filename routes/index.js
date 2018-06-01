var express = require('express');
var path = require('path');
var router = express.Router();

var db = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HappyRep' });
});

router.get('/CadastrarReparador', function(req, res) {
  res.render('formularios/cadastrar_pessoa', {pessoa: 'Reparador', cadastrar_pessoa: false});
});

router.post('/CadastrarReparador', function(req, res) {
  db.query('SELECT insert_reparador ($1)', [req.body.cpf], function(ret) {
    if (ret.rows[0].insert_reparador) {
      res.render('index', {title: 'Deu bom!'});
    } else {
      var values = {};
      values.pessoa = 'Reparador';
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/cadastrar_pessoa', values);
    }
  }, function(err) {
    var values = {};
    values.pessoa = 'Reparador';
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/cadastrar_pessoa', values);
  });
});

router.post('/CadastrarPessoaReparador', function(req, res) {
  db.query('SELECT insert_reparador ($1, $2, $3, $4, $5, $6, $7)',
           [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
           function(ret) {
             res.render('index', {title: 'Deu bom!'});
           },
          function(err) {
            var values = {};
            values.pessoa = 'Reparador';
            values.cadastrar_pessoa = true;
            values.cpf_value = req.body.cpf;
            values.erro = err;
        
            res.render('formularios/cadastrar_pessoa', values);
          });
});

module.exports = router;
