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

<<<<<<< Updated upstream
router.get('/CadastrarFuncionario/CadastrarFaxineira', function (req, res) {
  res.render('formularios/cadastrar_faxineira', {
    pessoa: 'Faxineira',
=======
// GET - Cadastrar faxineira pelo CPF
router.get('/CadastrarFuncionario/CadastrarFaxineira', function (req, res) {
  res.render('formularios/form_faxineira', {
    pessoa: 'Faxineira',
    cadastrar: true,
    cadastrar_pessoa: false
  });
});

// POST - Cadastrar faxineira pelo CPF
router.post('/CadastrarFuncionario/CadastrarFaxineira', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_faxineira ($1)', [req.body.cpf], function (ret) {
    if (ret.rows[0].insert_faxineira) {
      res.render('index', {
        title: 'Deu bom!'
      });
    } else { // Precisa cadastrar a pessoa
      var values = {};
      values.pessoa = 'Faxineira';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/form_faxineira', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Faxineira';
    values.cadastrar = true;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_faxineira', values);
  });
});

router.post('/CadastrarFuncionario/CadastrarPessoaFaxineira', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_faxineira ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento , req.body.email],
    function (ret) {
      res.render('index', {
        title: 'Deu bom!'
      });
    },
    function (err) {
      var values = {};
      values.pessoa = 'Faxineira';
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

      res.render('formularios/form_faxineira', values);
    });
});

// GET - Cadastrar nutricionista pelo CPF
router.get('/CadastrarFuncionario/CadastrarNutricionista', function (req, res) {
  res.render('formularios/form_nutricionista', {
    pessoa: 'Nutricionista',
    cadastrar: true,
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// Listas
=======
//GET - Alterar Faxineira
router.get('/AlterarFuncionario/AlterarFaxineira', function (req, res) {
  res.render('formularios/form_faxineira', {
    pessoa: 'Faxineira',
    cadastrar: false,
    cadastrar_pessoa: false
  });
});

// POST - Alterar Faxineira com o CPF
// Deve atribuir no formulario os dados cadastrados para alteracao
router.post('/AlterarFuncionario/AlterarFaxineira', function (req, res) {
  db.query('SELECT * FROM view_faxineira WHERE cpf = $1', [req.body.cpf], function (ret) {
    var values = {};
    if (ret.rowCount == 0) {
      var values = {};
      values.pessoa = 'Faxineira';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = 'CPF não cadastrado';
    } else {
      values.pessoa = 'Faxineira';
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
    res.render('formularios/form_faxineira', values);
  }, function (err) {
    var values = {};
    values.pessoa = 'Faxineira';
    values.cadastrar = false;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_faxineira', values);
  });
});

// POST - Alterar todos os dados de Faxineira
// Deve alterar os dados no banco
router.post('/AlterarFuncionario/AlterarPessoaFaxineira', function (req, res) {
  db.query('SELECT update_faxineira ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      if (ret.rows[0].update_faxineira) {
        res.render('index', {
          title: 'Deu bom!'
        });
      } else {
        var values = {};
        values.pessoa = 'Faxineira';
        values.cadastrar = false;
        values.cadastrar_pessoa = false;
        values.erro = 'CPF não cadastrado';
        res.render('formularios/form_faxineira', values);
      }
    },
    function (err) {
      var values = {};
      values.pessoa = 'Faxineira';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = err;

      res.render('formularios/form_faxineira', values);
    });
});

//GET - Alterar Morador
router.get('/AlterarMorador', function (req, res) {
  res.render('formularios/form_morador', {
    pessoa: 'Morador',
    cadastrar: false,
    cadastrar_pessoa: false
  });
});

// POST - Alterar Morador com o CPF
// Deve atribuir no formulario os dados cadastrados para alteracao
router.post('/AlterarMorador', function (req, res) {
  db.query('SELECT * FROM view_morador WHERE cpf = $1', [req.body.cpf], function (ret) {
    var values = {};
    if (ret.rowCount == 0) {
      var values = {};
      values.pessoa = 'Morador';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = 'CPF não cadastrado';
    } else {
      values.pessoa = 'Morador';
      values.cadastrar = false;
      values.cadastrar_pessoa = true;
      values.cpf_value = ret.rows[0].cpf;
      values.trabalho_value = ret.rows[0].trabalho;
      values.universidade_value = ret.rows[0].universidade;
      values.rg_value = ret.rows[0].rg;
      values.prenome_value = ret.rows[0].nome_prenome;
      values.sobrenome_value = ret.rows[0].nome_sobrenome;
      values.data_de_nascimento_value = moment(ret.rows[0].data_de_nascimento).format('DD/MM/YYYY');
      values.email_value = ret.rows[0].email;
      values.sexo_m = (ret.rows[0].sexo == 'M' ? true : false);
      values.sexo_f = (ret.rows[0].sexo == 'F' ? true : false);
    }
    res.render('formularios/form_morador', values);
  }, function (err) {
    var values = {};
    values.pessoa = 'Morador';
    values.cadastrar = false;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_morador', values);
  });
});

// POST - Alterar todos os dados de Morador
// Deve alterar os dados no banco
router.post('/AlterarPessoaMorador', function (req, res) {
  db.query('SELECT update_morador ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [req.body.trabalho, req.body.universidade, req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      if (ret.rows[0].update_morador) {
        res.render('index', {
          title: 'Deu bom!'
        });
      } else {
        var values = {};
        values.pessoa = 'Morador';
        values.cadastrar = false;
        values.cadastrar_pessoa = false;
        values.erro = 'CPF não cadastrado';
        res.render('formularios/form_morador', values);
      }
    },
    function (err) {
      var values = {};
      values.pessoa = 'Morador';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = err;

      res.render('formularios/form_morador', values);
    });
});
/* Listas */

>>>>>>> Stashed changes
router.get('/ListaFuncionarios', function (req, res) {

  db.query('SELECT cpf, sexo, rg, nome_prenome, nome_sobrenome, data_de_nascimento, email FROM view_reparador UNION SELECT * FROM view_cozinheira', null, function (ret) {
      res.render('listas/funcionarios', {
        funcionarios: ret.rows
      });
<<<<<<< Updated upstream
=======
      res.render('listas/funcionarios/reparador', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.get('/ListaFuncionarios/ListaFaxineira', function (req, res) {
  db.query('SELECT * FROM view_faxineira ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('listas/funcionarios/faxineira', {
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

router.get('/ListaFuncionarios/ListaNutricionista', function (req, res) {
  db.query('SELECT * FROM view_nutricionista ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('listas/funcionarios/nutricionista', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});


router.get('/ListaMoradores', function (req, res) {
  db.query('SELECT * FROM view_morador ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('listas/moradores', {
        'morador': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

/* Delecoes */

router.get('/ApagarFuncionario', function (req, res) {
  res.render('apagar/funcionarios/funcionarios');
});

router.get('/ApagarFuncionario/ApagarReparador', function (req, res) {
  db.query('SELECT DISTINCT cpf, nome_prenome, nome_sobrenome, rg, data_de_nascimento, email ' +
    'FROM view_reparador ORDER BY nome_prenome ASC', null,
    function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('apagar/funcionarios/reparador', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.post('/ApagarFuncionario/ApagarReparador', function (req, res) {
  db.query('SELECT delete_reparador ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarReparador');
    },
    function (err) {
      console.log(err);
    });
});

router.get('/ApagarFuncionario/ApagarCozinheira', function (req, res) {
  db.query('SELECT * FROM view_cozinheira ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('apagar/funcionarios/cozinheira', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.post('/ApagarFuncionario/ApagarCozinheira', function (req, res) {
  db.query('SELECT delete_cozinheira ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarCozinheira');
    },
    function (err) {
      console.log(err);
    });
});

router.get('/ApagarFuncionario/ApagarNutricionista', function (req, res) {
  db.query('SELECT * FROM view_nutricionista ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('apagar/funcionarios/nutricionista', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.post('/ApagarFuncionario/ApagarNutricionista', function (req, res) {
  db.query('SELECT delete_nutricionista ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarNutricionista');
    },
    function (err) {
      console.log(err);
    });
});

router.get('/ApagarFuncionario/ApagarFaxineira', function (req, res) {
  db.query('SELECT * FROM view_faxineira ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('apagar/funcionarios/faxineira', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.post('/ApagarFuncionario/ApagarFaxineira', function (req, res) {
  db.query('SELECT delete_faxineira ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarFaxineira');
    },
    function (err) {
      console.log(err);
    });
});

router.get('/ApagarMorador', function (req, res) {
  db.query('SELECT * FROM view_morador ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('apagar/morador', {
        'morador': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.post('/ApagarMorador', function (req, res) {
  db.query('SELECT delete_morador ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarMorador');
>>>>>>> Stashed changes
    },
    function (err) {
      console.log(err);
    });
});

module.exports = router;