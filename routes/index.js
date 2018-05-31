var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HappyRep' });
});

router.get('/CadastrarReparador', function(req, res) {
  res.render('formularios/cadastrar_pessoa', {pessoa: 'Reparador'});
});

module.exports = router;
