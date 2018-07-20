var express = require('express');
var path = require('path');
var moment = require('moment');
var router = express.Router();

var db = require('../database');

/* GET home page. */
router.get('/', function (req, res) {
  db.query('SELECT * FROM view_estatisticas', null, function (ret) {
      res.render('index', ret.rows[0]);
    },
    function (err) {
      res.render('bd_error', {
        error: err
      });
    });
});

/* Cadastros */

router.get('/CadastrarFuncionario', function (req, res) {
  res.render('formularios/cadastrar_funcionario');
})

// GET - Cadastrar pessoa pelo CPF
router.get('/CadastrarFuncionario/CadastrarPessoa', function (req, res) {
  res.render('formularios/form_pessoa', {
    pessoa: 'Pessoa',
    cadastrar: true,
    cadastrar_pessoa: false
  });
});

// POST - Cadastrar pessoa pelo CPF
router.post('/CadastrarFuncionario/CadastrarPessoa', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_pessoa ($1)', [req.body.cpf], function (ret) {
    if (ret.rows[0].insert_pessoa) {
      res.render('sucesso');
    } else { // Precisa cadastrar a pessoa
      var values = {};
      values.pessoa = 'Pessoa';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/form_pessoa', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Pessoa';
    values.cadastrar = true;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_pessoa', values);
  });
});

router.post('/CadastrarFuncionario/CadastrarPessoaPessoa', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_pessoa ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento , req.body.email],
    function (ret) {
      res.render('sucesso');
    },
    function (err) {
      var values = {};
      values.pessoa = 'Pessoa';
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

      res.render('formularios/form_pessoa', values);
    });
});

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
      res.render('sucesso');
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
      res.render('sucesso');
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
      res.render('sucesso');
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
      res.render('sucesso');
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
    cadastrar_pessoa: false
  });
});

// POST - Cadastrar nutricionista pelo CPF
router.post('/CadastrarFuncionario/CadastrarNutricionista', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_nutricionista ($1)', [req.body.cpf], function (ret) {
    if (ret.rows[0].insert_nutricionista) {
      res.render('sucesso');
    } else { // Precisa cadastrar a pessoa
      var values = {};
      values.pessoa = 'Nutricionista';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;

      res.render('formularios/form_nutricionista', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Nutricionista';
    values.cadastrar = true;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_nutricionista', values);
  });
});

router.post('/CadastrarFuncionario/CadastrarPessoaNutricionista', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_nutricionista ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      res.render('sucesso');
    },
    function (err) {
      var values = {};
      values.pessoa = 'Nutricionista';
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

      res.render('formularios/form_nutricionista', values);
    });
});

// GET - Cadastrar morador pelo CPF
router.get('/CadastrarMorador', function (req, res) {
  res.render('formularios/form_morador', {
    pessoa: 'Morador',
    cadastrar: true,
    cadastrar_pessoa: false
  });
});

// POST - Cadastrar morador pelo CPF
router.post('/CadastrarMorador', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_morador ($1, $2, $3)', [req.body.trabalho, req.body.universidade, req.body.cpf], function (ret) {
    if (ret.rows[0].insert_morador) {
      res.render('sucesso');
    } else { // Precisa cadastrar a pessoa
      var values = {};
      values.pessoa = 'Morador';
      values.cadastrar = true;
      values.cadastrar_pessoa = true;
      values.cpf_value = req.body.cpf;
      values.trabalho_value = req.body.trabalho;
      values.universidade_value = req.body.universidade;

      res.render('formularios/form_morador', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Morador';
    values.cadastrar = true;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_morador', values);
  });
});

router.post('/CadastrarPessoaMorador', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_morador ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [req.body.trabalho, req.body.universidade, req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      res.render('sucesso');
    },
    function (err) {
      var values = {};
      values.pessoa = 'Morador';
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
      values.trabalho_value = req.body.trabalho;
      values.universidade_value = req.body.universidade;
      values.erro = err;

      res.render('formularios/form_morador', values);
    });
});

// CadastrarServico
router.get('/CadastrarServico', function (req, res) {
  res.render('formularios/cadastrar_servico');
})

// GET - Cadastrar Serviço
router.get('/CadastrarServico/CadastrarNovoServico', function (req, res) {
  res.render('formularios/form_servico', {
    servico: 'Novo Serviço',
    cadastrar: true,
    cadastrar_servico: false
  });
});

// POST - Cadastrar serviço
router.post('/CadastrarServico/CadastrarNovoServico', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_servico ($1, $2, $3)', [req.body.id_servico, req.body.hora_inicio, req.body.hora_fim], function (ret) {
    if (ret.rows[0].insert_servico) {
      res.render('index', {
        title: 'Sucesso!'
      });
    } else { // Precisa cadastrar o serviço
      var values = {};
      values.servico = 'Novo Serviço';
      values.cadastrar = true;
      values.cadastrar_servico = true;
      values.id_servico_value = req.body.id_servico;
	  values.hora_inicio_value = req.body.hora_inicio;
      values.hora_fim_value = req.body.hora_fim;
	  
      res.render('formularios/form_servico', values);
    }
  }, function (err) {
    var values = {};
    values.servico = 'Novo Serviço';
    values.cadastrar = true;
    values.cadastrar_servico = false;
    values.erro = err;

    res.render('formularios/form_servico')
  });
});

router.post('/CadastrarServico/CadastrarNovoServicoNovoServico', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_servico ($1, $2, $3)', [req.body.id_servico, req.body.hora_inicio, req.body.hora_fim],
    function (ret) {
      res.render('index', {
        title: 'Sucesso!'
      });
    },
    function (err) {
      var values = {};
      values.servico = 'Serviço';
      values.cadastrar = true;
      values.cadastrar_servico = true;
      values.id_servico_value = req.body.id_servico;
      values.hora_inicio_value = req.body.hora_inicio;
      values.hora_fim_value = req.body.hora_fim;
      values.erro = err;

      res.render('formularios/form_servico', values);
    });
});

// Cadastrar Faxina

// GET - Cadastrar faxina
router.get('/CadastrarServico/CadastrarFaxina', function (req, res) {
  res.render('formularios/cadastrar_faxina', {
    servico: 'Faxina',
    cadastrar: true,
    cadastrar_servico: false
  });
});

// POST - Cadastrar faxina
router.post('/CadastrarServico/CadastrarFaxina', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_faxina ($1, $2)', [req.body.cpf_faxineira, req.body.id_servico], function (ret) {
    if (ret.rows[0].insert_faxina) {
      res.render('index', {
        title: 'Sucesso!'
      });
    } else { // Precisa cadastrar o serviço
      var values = {};
      values.servico = 'Faxina';
      values.cadastrar = true;
      values.cadastrar_servico = true;
      values.id_servico_value = req.body.id_servico;

      res.render('formularios/form_faxina', values);
    }
  }, function (err) {
    var values = {};
    values.servico = 'Faxina';
    values.cadastrar = true;
    values.cadastrar_servico = false;
    values.erro = err;

    res.render('formularios/form_faxina')
  });
});

router.post('/CadastrarServico/CadastrarServicoFaxina', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_faxina ($1, $2, $3, $4)', [req.body.cpf_faxineira, req.body.id_servico, req.body.hora_inicio, req.body.hora_fim],
    function (ret) {
      res.render('index', {
        title: 'Sucesso!'
      });
    },
    function (err) {
      var values = {};
      values.servico = 'Faxina';
      values.cadastrar = true;
      values.cadastrar_servico = true;
      values.cpf_faxineira_value = req.body.cpf_faxineira;
      values.id_servico_value = req.body.id_servico;
      values.hora_inicio_value = req.body.hora_inicio;
      values.hora_fim_value = req.body.hora_fim;
      values.erro = err;

      res.render('formularios/form_faxina', values);
    });
});

// GET - Cadastrar alimentação
router.get('/CadastrarServico/CadastrarAlimentacao', function (req, res) {
  res.render('formularios/cadastrar_alimentacao', {
    servico: 'Alimentação',
    cadastrar: true,
    cadastrar_servico: false
  });
});

// GET - Cadastrar alimentação
router.get('/CadastrarServico/CadastrarAlimentacao', function (req, res) {
  res.render('formularios/cadastrar_alimentacao', {
    servico: 'Alimentação',
    cadastrar: true,
    cadastrar_servico: false
  });
});

// POST - Cadastrar alimentação
router.post('/CadastrarServico/CadastrarAlimentacao', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_alimentacao ($1, $2, $3)', [req.body.cpf_cozinheira, req.body.cpf_nutricionista, req.body.id_servico], function (ret) {
    if (ret.rows[0].insert_alimentacao) {
      res.render('index', {
        title: 'Sucesso!'
      });
    } else { // Precisa cadastrar o serviço
      var values = {};
      values.servico = 'Alimentação';
      values.cadastrar = true;
      values.cadastrar_servico = true;
      values.id_servico_value = req.body.id_servico;

      res.render('formularios/form_alimentacao', values);
    }
  }, function (err) {
    var values = {};
    values.servico = 'Alimentação';
    values.cadastrar = true;
    values.cadastrar_servico = false;
    values.erro = err;

    res.render('formularios/form_alimentacao')
  });
});

router.post('/CadastrarServico/CadastrarServicoAlimentacao', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT insert_alimentacao ($1, $2, $3, $4, $5)', [req.body.cpf_cozinheira, req.body.cpf_nutricionista, req.body.id_servico, req.body.hora_inicio, req.body.hora_fim],
    function (ret) {
      res.render('index', {
        title: 'Deu bom!'
      });
    },
    function (err) {
      var values = {};
      values.servico = 'Alimentação';
      values.cadastrar = true;
      values.cadastrar_servico = true;
      values.cpf_cozinheira_value = req.body.cpf_cozinheira;
      values.cpf_nutricionista_value = req.body.cpf_nutricionista;
      values.id_servico_value = req.body.id_servico;
      values.hora_inicio_value = req.body.hora_inicio;
      values.hora_fim_value = req.body.hora_fim;
      values.erro = err;

      res.render('formularios/form_alimentacao', values);
    });
});

// GET - Cadastrar Produto
router.get('/CadastrarProduto', function (req, res) {
  res.render('formularios/form_produto', {
    pessoa: 'Produto',
    cadastrar: true,
  });
});

// POST - CadastrarProduto
router.post('/CadastrarProduto', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('INSERTO INTO view_produto_fornecedor ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.id_fornecedor, req.body.id_produto ,  req.body.nome_fornecedor, req.body.nome, req.body.marca, req.body.categoria ,req.body.preco, req.body.descricao ], function (ret) {
    if (ret.rows[0].InsereProduto) {
      res.render('index', {
        title: 'Sucesso!'
      });
    } else { // Precisa cadastrar o produto
      var values = {};
      values.pessoa = 'Produto';
      values.cadastrar = true;
      values.id_fornecedor_value = req.body.id_fornecedor;
      values.id_produto_value = req.body.id_produto;
      values.nome_fornecedor_value = req.body.nome_fornecedor;
      values.nome_value = req.body.nome;
      values.marca_value = req.body.marca;
      values.categoria_value = req.body.categoria;
      values.id_preco_value = req.body.id_preco;
      values.descricao_value = req.body.descricao;
      
      res.render('formularios/form_produto', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Produto';
    values.cadastrar = true;
    values.erro = err;

    res.render('formularios/form_produto')
  });
});

// GET - Cadastrar Fornecedor
router.get('/CadastrarFornecedor', function (req, res) {
  res.render('formularios/form_fornecedor', {
    pessoa: 'Fornecedor',
    cadastrar: true,
  });
});

// POST - CadastrarFornecedor
router.post('/CadastrarFornecedor', function (req, res) {
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }

  db.query('SELECT InsereFornecedor ($1, $2)', [req.body.id_fornece, req.body.nome_fornecedor], function (ret) {
    if (ret.rows[0].InsereProduto) {
      res.render('index', {
        title: 'Sucesso!'
      });
    } else { // Precisa cadastrar o produto
      var values = {};
      values.pessoa = 'Fornecedor';
      values.cadastrar = true;
      values.id_fornece_value = req.body.id_fornece;
      values.nome_fornecedor_value = req.body.nome_fornecedor;
      res.render('formularios/form_fornecedor', values);
    }
  }, function (err) {
    var values = {};
    values.pessoa = 'Fornecedor';
    values.cadastrar = true;
    values.erro = err;

    res.render('formularios/form_fornecedor')
  });
});

// GET - Cadastrar Republica
router.get('/CadastrarRepublica', function (req, res) {
  res.render('formularios/form_republica', {
    republica: 'Republica',
    cadastrar: true,
    cadastrar_republica: false
  });
});

// POST - Cadastrar Republica
router.post('/CadastrarRepublica/Cadastrar', function (req, res) {
  db.query('SELECT insert_republica ($1)', [req.body.id_republica], function (ret) {
    if (ret.rows[0].insert_republica) {
      res.render('sucesso');
    } else { // Precisa cadastrar a republica
      var values = {};
      values.republica = 'Republica';
      values.cadastrar = true;
      values.cadastrar_republica = true;
      values.id_republica = req.body.id_republica;

      res.render('formularios/form_pessoa', values);
    }
  }, function (err) {
    var values = {};
    values.republica = 'Republica';
    values.cadastrar = true;
    values.cadastrar_republica = false;
    values.erro = err;

    res.render('formularios/form_republica', values);
  });
});

router.post('/CadastrarRepublica/CadastrarRepublica', function (req, res) {
  db.query('SELECT insert_republica ($1, $2, $3, $4, $5, $6, $7)', 
    [req.body.id_republica, 
    req.body.status, 
    req.body.endereco_cep, 
    req.body.endereco_logradouro, 
    req.body.endereco_numero, 
    req.body.endereco_complemento, 
    req.body.endereco_observacoes],
    function (ret) {
      res.render('sucesso');
    },
    function (err) {
      var values = {};
      values.republica = 'Republica';
      values.cadastrar = true;
      values.cadastrar_republica = true;
      values.id_republica = req.body.id_republica;
      values.status = req.body.status;
      values.endereco_cep = req.body.endereco_cep;
      values.endereco_logradouro = req.body.endereco_logradouro;
      values.endereco_complemento = req.body.endereco_complemento;
      values.endereco_observacoes = req.body.endereco_observacoes;
      values.ativo = (req.body.ativo == '1' ? true : false);
      values.inativo = (req.body.inativo == '0' ? true : false);
      values.erro = err;

      res.render('formularios/form_republica', values);
    });
});

// GET - Cadastrar Comodo
router.get('/CadastrarComodo', function (req, res) {
  res.render('formularios/form_comodo', {
    comodo: 'Comodo',
    cadastrar: true,
    cadastrar_comodo: false
  });
});

// POST - Cadastrar Comodo
router.post('/CadastrarComodo/Cadastrar', function (req, res) {
  db.query('SELECT insert_comodo ($1)', [req.body.id_comodo], function (ret) {
    if (ret.rows[0].insert_comodo) {
      res.render('sucesso');
    } else {
      var values = {};
      values.comodo = 'Comodo';
      values.cadastrar = true;
      values.cadastrar_comodo = true;
      values.id_comodo = req.body.id_comodo;

      res.render('formularios/form_comodo', values);
    }
  }, function (err) {
    var values = {};
    values.comodo = 'Comodo';
    values.cadastrar = true;
    values.cadastrar_comodo = false;
    values.erro = err;

    res.render('formularios/form_comodo', values);
  });
});

router.post('/CadastrarComodo/CadastrarComodo', function (req, res) {
  db.query('SELECT insert_republica ($1, $2)', 
    [req.body.id_comodo, 
    req.body.id_republica],
    function (ret) {
      res.render('sucesso');
    },
    function (err) {
      var values = {};
      values.comodo = 'Comodo';
      values.cadastrar = true;
      values.cadastrar_comodo = true;
      values.id_comodo = req.body.id_comodo;
      values.id_republica = req.body.id_republica;
      values.erro = err;

      res.render('formularios/form_comodo', values);
    });
});

/* Alterar cadastros */

router.get('/AlterarFuncionario', function (req, res) {
  res.render('formularios/alterar_funcionario');
})

router.get('/AlterarServico', function (req, res) {
  res.render('formularios/alterar_servico');
})

router.get('/AlterarFuncionario/AlterarPessoa', function (req, res) {
  res.render('formularios/form_pessoa', {
    pessoa: 'Pessoa',
    cadastrar: false,
    cadastrar_pessoa: false
  });
});

// POST - Alterar Pessoa com o CPF
// Deve atribuir no formulario os dados cadastrados para alteracao
router.post('/AlterarFuncionario/AlterarPessoa', function (req, res) {
  db.query('SELECT * FROM view_pessoa WHERE cpf = $1', [req.body.cpf], function (ret) {
    var values = {};
    if (ret.rowCount == 0) {
      var values = {};
      values.pessoa = 'Pessoa';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = 'CPF não cadastrado';
    } else {
      values.pessoa = 'Pessoa';
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
    res.render('formularios/form_pessoa', values);
  }, function (err) {
    var values = {};
    values.pessoa = 'Pessoa';
    values.cadastrar = false;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_pessoa', values);
  });
});

// POST - Alterar todos os dados de Pessoa
// Deve alterar os dados no banco
router.post('/AlterarFuncionario/AlterarPessoaPessoa', function (req, res) {
  db.query('SELECT update_pessoa ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      if (ret.rows[0].update_pessoa) {
        res.render('sucesso');
      } else {
        var values = {};
        values.pessoa = 'Pessoa';
        values.cadastrar = false;
        values.cadastrar_pessoa = false;
        values.erro = 'CPF não cadastrado';
        res.render('formularios/form_pessoa', values);
      }
    },
    function (err) {
      var values = {};
      values.pessoa = 'Pessoa';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = err;

      res.render('formularios/form_pessoa', values);
    });
});

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
        res.render('sucesso');
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
        res.render('sucesso');
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

//GET - Alterar Nutricionista
router.get('/AlterarFuncionario/AlterarNutricionista', function (req, res) {
  res.render('formularios/form_nutricionista', {
    pessoa: 'Nutricionista',
    cadastrar: false,
    cadastrar_pessoa: false
  });
});

// POST - Alterar Nutricionista com o CPF
// Deve atribuir no formulario os dados cadastrados para alteracao
router.post('/AlterarFuncionario/AlterarNutricionista', function (req, res) {
  db.query('SELECT * FROM view_nutricionista WHERE cpf = $1', [req.body.cpf], function (ret) {
    var values = {};
    if (ret.rowCount == 0) {
      var values = {};
      values.pessoa = 'Nutricionista';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = 'CPF não cadastrado';
    } else {
      values.pessoa = 'Nutricionista';
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
    res.render('formularios/form_nutricionista', values);
  }, function (err) {
    var values = {};
    values.pessoa = 'Nutricionista';
    values.cadastrar = false;
    values.cadastrar_pessoa = false;
    values.erro = err;

    res.render('formularios/form_nutricionista', values);
  });
});

// POST - Alterar todos os dados de Nutricionista
// Deve alterar os dados no banco
router.post('/AlterarFuncionario/AlterarPessoaNutricionista', function (req, res) {
  db.query('SELECT update_nutricionista ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
    function (ret) {
      if (ret.rows[0].update_nutricionista) {
        res.render('sucesso');
      } else {
        var values = {};
        values.pessoa = 'Nutricionista';
        values.cadastrar = false;
        values.cadastrar_pessoa = false;
        values.erro = 'CPF não cadastrado';
        res.render('formularios/form_nutricionista', values);
      }
    },
    function (err) {
      var values = {};
      values.pessoa = 'Nutricionista';
      values.cadastrar = false;
      values.cadastrar_pessoa = false;
      values.erro = err;

      res.render('formularios/form_nutricionista', values);
    });
});

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
        res.render('sucesso');
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

router.get('/ListaFuncionarios', function (req, res) {
  res.render('listas/funcionarios/funcionarios');
});

router.get('/ListaServicos', function (req, res) {
  res.render('listas/servicos/servicos');
});

router.get('/ListaFuncionarios/ListaPessoa', function (req, res) {
  db.query('SELECT * FROM view_pessoa ORDER BY nome_prenome ASC', null, function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('listas/funcionarios/pessoa', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
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
      res.render('bd_error', {
        error: err
      });
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
      res.render('bd_error', {
        error: err
      });
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
      res.render('bd_error', {
        error: err
      });
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
      res.render('bd_error', {
        error: err
      });
    });
});

router.get('/ListaRepublicas', function (req, res) {
  db.query('SELECT * FROM view_republica ORDER BY id_republica', null, function (ret) {
      res.render('listas/republicas/republica', {
        'republicas': ret.rows
      });
    },
    function (err) {
      res.render('bd_error', {
        error: err
      });
    });
});

router.get('/ListaComodos', function (req, res) {
  db.query('SELECT * FROM view_comodo ORDER BY id_republica', null, function (ret) {
      res.render('listas/republicas/comodo', {
        'comodos': ret.rows
      });
    },
    function (err) {
      res.render('bd_error', {
        error: err
      });
    });
});


/* Delecoes */

router.get('/ApagarFuncionario', function (req, res) {
  res.render('apagar/funcionarios/funcionarios');
});

router.get('/ApagarServico', function (req, res) {
  res.render('apagar/servicos/servicos');
});

router.get('/ApagarFuncionario/ApagarPessoa', function (req, res) {
  db.query('SELECT DISTINCT cpf, nome_prenome, nome_sobrenome, rg, data_de_nascimento, email ' +
    'FROM view_pessoa ORDER BY nome_prenome ASC', null,
    function (ret) {
      ret.rows.forEach(function (elemento) {
        elemento.data_de_nascimento = moment(elemento.data_de_nascimento).format('DD/MM/YYYY');
      });
      res.render('apagar/funcionarios/pessoa', {
        'funcionarios': ret.rows
      });
    },
    function (err) {
      console.log(err);
    });
});

router.post('/ApagarFuncionario/ApagarPessoa', function (req, res) {
  db.query('SELECT delete_pessoa ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarPessoa');
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
      res.render('bd_error', {
        error: err
      });
    });
});

router.post('/ApagarFuncionario/ApagarReparador', function (req, res) {
  db.query('SELECT delete_reparador ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarReparador');
    },
    function (err) {
      res.render('bd_error', {
        error: err
      });
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
      res.render('bd_error', {
        error: err
      });
    });
});

router.post('/ApagarFuncionario/ApagarCozinheira', function (req, res) {
  db.query('SELECT delete_cozinheira ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarCozinheira');
    },
    function (err) {
      res.render('bd_error', {
        error: err
      });
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
      res.render('bd_error', {
        error: err
      });
    });
});

router.post('/ApagarFuncionario/ApagarNutricionista', function (req, res) {
  db.query('SELECT delete_nutricionista ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarFuncionario/ApagarNutricionista');
    },
    function (err) {
      res.render('bd_error', {
        error: err
      });
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
      res.render('bd_error', {
        error: err
      });
    });
});

router.post('/ApagarMorador', function (req, res) {
  db.query('SELECT delete_morador ($1)', [req.body.cpf], function (ret) {
      res.redirect('/ApagarMorador');
    },
    function (err) {
      res.render('bd_error', {
        error: err
      });
    });
});

module.exports = router;