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

    db.query('SELECT insert_pessoa ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
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

    db.query('SELECT insert_faxineira ($1, $2, $3, $4, $5, $6, $7)', [req.body.cpf, req.body.sexo, req.body.rg, req.body.prenome, req.body.sobrenome, req.body.data_de_nascimento, req.body.email],
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

router.get('/CadastrarServicos', function (req, res) {
    res.render('cadastrar/servicos/servicos');
});

router.get('/CadastrarServicos/CadastrarReceita', function (req, res) {
    res.render('cadastrar/servicos/receita', {
    });
});

router.post('/CadastrarServicos/CadastrarReceita', function (req, res) {

    db.query('SELECT insert_receita ($1, $2)',
            [req.body.nome_receita, req.body.descricao_receita]
            , function (ret) {
                res.render('sucesso');
            }
    , function (err) {
        var values = {};
        values.nome_receita = req.body.nome_receita;
        values.descricao_receita = req.body.descricao_receita;
        values.erro = err;
        res.render('cadastrar/servicos/receita', values);
    });
});


router.get('/CadastrarServicos/CadastrarIngrediente', function (req, res) {
    res.render('cadastrar/servicos/ingredientes', {});
});

router.post('/CadastrarServicos/CadastrarIngrediente', function (req, res) {

    db.query('SELECT insert_ingrediente ($1, $2, $3)',
            [req.body.id_receita, req.body.id_produto, req.body.quantidade]
            , function (ret) {
                res.render('sucesso');
            }
    , function (err) {
        var values = {};
        values.quantidade = req.body.quantidade;
        values.id_receita = req.body.id_receita;
        values.id_produto = req.body.id_produto;
        values.erro = err;
        res.render('cadastrar/servicos/ingredientes', values);
    });
});

// CadastrarServico
router.get('/CadastrarServicos/CadastrarReparo', function (req, res) {
    res.render('cadastrar/servicos/reparo', {
    });
});

router.post('/CadastrarServicos/CadastrarReparo', function (req, res) {
    db.query('SELECT insert_reparo ($1, $2)',
            [req.body.cpf_reparador, req.body.id_servico]
            , function (ret) {
                res.render('sucesso');
            }
    , function (err) {
        var values = {};
        values.id_servico = req.body.id_servico;
        values.cpf_reparador = req.body.cpf_reparador;

        values.erro = err;
        res.render('cadastrar/servicos/reparo', values);
    });
});

// GET - Cadastrar Serviço
router.get('/CadastrarServicos/CadastrarNovoServico', function (req, res) {
    res.render('formularios/form_servico', {
        servico: 'Novo Serviço',
        cadastrar: true,
        cadastrar_servico: false
    });
});

// POST - Cadastrar serviço
router.post('/CadastrarServicos/CadastrarNovoServico', function (req, res) {
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

router.post('/CadastrarServicos/CadastrarNovoServicoNovoServico', function (req, res) {
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
                values.servico = 'Novo Serviço';
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
router.get('/CadastrarServicos/CadastrarFaxina', function (req, res) {
    res.render('formularios/cadastrar_faxina', {
        servico: 'Faxina',
        cadastrar: true,
        cadastrar_servico: false
    });
});

// POST - Cadastrar faxina
router.post('/CadastrarServicos/CadastrarFaxina', function (req, res) {
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

router.post('/CadastrarServicos/CadastrarNovoServicoFaxina', function (req, res) {
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
router.get('/CadastrarServicos/CadastrarAlimentacao', function (req, res) {
    res.render('formularios/cadastrar_alimentacao', {

        servico: 'Alimentação',
        cadastrar: true,
        cadastrar_servico: false
    });
});

// GET - Cadastrar alimentação
router.get('/CadastrarServicos/CadastrarAlimentacao', function (req, res) {
    res.render('formularios/cadastrar_alimentacao', {
        servico: 'Alimentação',
        cadastrar: true,
        cadastrar_servico: false
    });
});

// POST - Cadastrar alimentação
router.post('/CadastrarServicos/CadastrarAlimentacao', function (req, res) {
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

router.post('/CadastrarServicos/CadastrarNovoServicoAlimentacao', function (req, res) {
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

    db.query('INSERT INTO view_produto_fornecedor ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.id_fornecedor, req.body.id_produto, req.body.nome_fornecedor, req.body.nome, req.body.marca, req.body.categoria, req.body.preco, req.body.descricao], function (ret) {
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
<<<<<<< HEAD
  if (!Array.isArray(req.body.tipo)) {
    req.body.tipo = [req.body.tipo];
  }


  db.query('SELECT inserefornecedor ($1, $2)', [req.body.id_fornece, req.body.nome_fornecedor],
   function (ret) { 
      res.render('sucesso');
   }, 
  function (err) {
    var values = {};
    values.pessoa = 'Fornecedor';
    values.cadastrar = true;
    values.id_fornece_value = req.body.id_fornece;
    values.nome_fornecedor_value = req.body.nome_fornecedor;
    res.render('formularios/form_fornecedor', values);
    values.erro = err;
  });
=======
    if (!Array.isArray(req.body.tipo)) {
        req.body.tipo = [req.body.tipo];
    }

    db.query('SELECT inserefornecedor ($1, $2)', [req.body.id_fornece, req.body.nome_fornecedor],
            function (ret) {
                res.render('Sucesso');
            },
            function (err) {
                var values = {};
                values.pessoa = 'Fornecedor';
                values.cadastrar = true;
                values.pessoa = 'Fornecedor';
                values.cadastrar = true;
                values.id_fornece_value = req.body.id_fornece;
                values.nome_fornecedor_value = req.body.nome_fornecedor;
                res.render('formularios/form_fornecedor', values);
                values.erro = err;

                res.render('formularios/form_fornecedor', {
                    title: 'Falhou!'
                });
            });
});
>>>>>>> master

// GET - Cadastrar Republica
router.get('/CadastrarRepublica', function (req, res) {
    res.render('formularios/form_republica', {
        cadastrar: true
    });
});

// POST - Cadastrar Republica
router.post('/CadastrarRepublica/Cadastrar', function (req, res) {
    db.query('SELECT insert_republica ($1, $2, $3, $4, $5, $6, $7)', [req.body.id_republica,
        req.body.status,
        req.body.endereco_cep,
        req.body.endereco_logradouro,
        req.body.endereco_numero,
        req.body.endereco_complemento,
        req.body.endereco_observacoes
    ],
            function (ret) {
                res.render('sucesso');
            },
            function (err) {
                var values = {};
                values.cadastrar = true;
                values.id_republica = req.body.id_republica;
                values.status = req.body.status;
                values.endereco_cep = req.body.endereco_cep;
                values.endereco_logradouro = req.body.endereco_logradouro;
                values.endereco_complemento = req.body.endereco_complemento;
                values.endereco_observacoes = req.body.endereco_observacoes;
                values.erro = err;

                res.render('formularios/form_republica', values);
            });
});

// GET - Cadastrar Comodo
router.get('/CadastrarComodo', function (req, res) {
    res.render('formularios/form_comodo', {
        cadastrar: true
    });
});

// POST - Cadastrar Comodo
router.post('/CadastrarComodo/Cadastrar', function (req, res) {

    db.query('SELECT insert_comodo ($1, $2)', [req.body.id_comodo,
        req.body.id_republica
    ],
            function (ret) {
                res.render('sucesso');
            },
            function (err) {
                var values = {};
                values.cadastrar = true;
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

router.get('/AlterarServicos', function (req, res) {
    res.render('alterar/servicos/servicos');
});

router.get('/AlterarServicos/AlterarIngrediente', function (req, res) {
    res.render('alterar/servicos/ingredientes');
});
router.post('/AlterarServicos/AlterarIngrediente', function (req, res) {

    db.query('SELECT update_ingrediente ($1, $2, $3)',
            [req.body.id_produto, req.body.id_receita, req.body.quantidade],
            function (ret) {
                if (ret.rows[0].update_ingrediente) {
                    res.render('sucesso');
                } else {
                    var values = {};
                    values.id_produto = req.body.id_produto;
                    values.quantidade = req.body.quantidade;
                    values.id_receita = req.body.id_receita;

                    values.erro = 'CPF e/ou receita não cadastrados';

                    res.render('alterar/servicos/ingredientes', values);
                }
            },
            function (err) {

                var values = {};
                values.id_produto = req.body.id_produto;
                values.quantidade = req.body.quantidade;
                values.id_receita = req.body.id_receita;

                values.erro = err;

                res.render('alterar/servicos/ingredientes', values);
            });

});

router.get('/AlterarServicos/AlterarAlimentacao', function (req, res) {
    res.render('alterar/servicos/alimentacao');
});
router.post('/AlterarServicos/AlterarAlimentacao', function (req, res) {

    db.query('SELECT update_alimentacao ($1, $2, $3)',
            [req.body.id_servico, req.body.cpf_cozinheira, req.body.cpf_nutricionista],
            function (ret) {
                if (ret.rows[0].update_alimentacao) {
                    res.render('sucesso');
                } else {
                    var values = {};
                    values.id_servico = req.body.id_servico;
                    values.cpf_cozinheira = req.body.cpf_cozinheira;
                    values.cpf_nutricionista = req.body.cpf_nutricionista;

                    values.erro = 'CPF da nutricionista e/ou CPF da cozinheira não estão cadastrados no sistema';

                    res.render('alterar/servicos/alimentacao', values);
                }
            },
            function (err) {

                var values = {};
                values.id_servico = req.body.id_servico;
                values.cpf_cozinheira = req.body.cpf_cozinheira;
                values.cpf_nutricionista = req.body.cpf_nutricionista;

                values.erro = err;

                res.render('alterar/servicos/alimentacao', values);
            });

});


router.get('/AlterarServicos/AlterarReceita', function (req, res) {
    res.render('alterar/servicos/receita');
});

router.post('/AlterarServicos/AlterarReceita', function (req, res) {

    db.query('SELECT update_receita ($1, $2, $3)',
            [req.body.id_receita, req.body.nome_receita, req.body.descricao_receita],
            function (ret) {
                if (ret.rows[0].update_receita) {
                    res.render('sucesso');
                } else {
                    var values = {};
                    values.id_receita = req.body.id_receita;
                    values.nome_receita = req.body.nome_receita;
                    values.descricao_receita = req.body.descricao_receita;

                    values.erro = 'Receita não cadastrada no sistema!';

                    res.render('alterar/servicos/receita', values);
                }
            },
            function (err) {

                var values = {};
                values.id_receita = req.body.id_receita;
                values.nome_receita = req.body.nome_receita;
                values.descricao_receita = req.body.descricao_receita;

                values.erro = err;

                res.render('alterar/servicos/receita', values);
            });

});

router.get('/AlterarServicos/AlterarReceita', function (req, res) {
    res.render('alterar/servicos/reparo', {
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

router.get('/ListaServicos', function (req, res) {
    res.render('listas/servicos/servicos');
});

router.get('/ListaServicos/ListarIngrediente', function (req, res) {

    db.query('SELECT * FROM view_ingredientes_receita ORDER BY nome_receita, id_produto', null, function (ret) {
        ret.rows.forEach(function (elemento) {

        });
        res.render('listas/servicos/ingredientes', {
            'ingredientes': ret.rows
        });
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});

router.get('/ListaServicos/Listarfaxina', function (req, res) {

    db.query("SELECT * FROM view_operador_servico WHERE tipo = 'F' ORDER BY hora_inicio DESC", null, function (ret) {
        ret.rows.forEach(function (elemento) {
            elemento.hora_inicio = moment(elemento.hora_inicio).format('DD/MM/YYYY hh:mm');
            elemento.hora_fim = moment(elemento.hora_fim).format('DD/MM/YYYY hh:mm');
        });
        res.render('listas/servicos/faxina', {
            'faxinas': ret.rows
        });
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});

router.get('/ListaServicos/ListarAlimentacao', function (req, res) {

    db.query("SELECT * FROM view_alimentacao55 ORDER BY hora_inicio DESC", null, function (ret) {
        ret.rows.forEach(function (elemento) {
            elemento.hora_inicio = moment(elemento.hora_inicio).format('DD/MM/YYYY hh:mm');
            elemento.hora_fim = moment(elemento.hora_fim).format('DD/MM/YYYY hh:mm');
        });
        res.render('listas/servicos/alimentacao', {
            'alimentacao': ret.rows
        });
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});

router.get('/ListaServicos/ListarReparo', function (req, res) {

    db.query("SELECT * FROM view_operador_servico WHERE tipo = 'R' ORDER BY hora_inicio DESC", null, function (ret) {
        ret.rows.forEach(function (elemento) {
            elemento.hora_inicio = moment(elemento.hora_inicio).format('DD/MM/YYYY hh:mm');
            elemento.hora_fim = moment(elemento.hora_fim).format('DD/MM/YYYY hh:mm');
        });
        res.render('listas/servicos/reparo', {
            'reparos': ret.rows
        });
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});

router.get('/ListaServicos/ListarReceita', function (req, res) {

    db.query("SELECT * FROM receita ORDER BY nome_receita ASC", null, function (ret) {

        res.render('listas/servicos/receita', {
            'receitas': ret.rows
        });
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});


router.get('/ListaFornecedor', function (req, res) {
    db.query('SELECT * FROM fornecedor ORDER BY id_fornecedor ASC', null, function (ret) {
        res.render('listas/produtos/fornecedores', {
            'fornecedor': ret.rows
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

router.get('/ListaProduto', function (req, res) {
    db.query('SELECT * FROM view_produto_fornecedor ', null, function (ret) {
        res.render('listas/produtos/produtos', {
            'produto': ret.rows
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

router.get('/ApagarServicos', function (req, res) {
    res.render('apagar/servicos/servicos', {});
});

router.get('/ApagarServicos/ApagarIngrediente', function (req, res) {

    db.query('SELECT * FROM view_ingredientes_receita ORDER BY nome_receita, id_produto', null, function (ret) {
        ret.rows.forEach(function (elemento) {});
        res.render('apagar/servicos/ingredientes', {
            'ingredientes': ret.rows
        });
    }, function (err) {
        console.log(err);
    });
});
router.post('/ApagarServicos/ApagarIngrediente', function (req, res) {

    var aux = req.body.pk_receita.split("+");
    //1 receita, 2 produto
    db.query('SELECT delete_ingrediente ($1, $2)', [aux[0], aux[1]], function (ret) {
        res.redirect('/ApagarServicos/ApagarIngrediente');
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});


router.get('/ApagarServicos/ApagarFaxina', function (req, res) {

    db.query("SELECT * FROM view_operador_servico WHERE tipo = 'F' ORDER BY hora_inicio DESC", null, function (ret) {
        ret.rows.forEach(function (elemento) {
            elemento.hora_inicio = moment(elemento.hora_inicio).format('DD/MM/YYYY hh:mm');
            elemento.hora_fim = moment(elemento.hora_fim).format('DD/MM/YYYY hh:mm');
        });

        res.render('apagar/servicos/faxina', {
            'faxinas': ret.rows
        });

    }, function (err) {
        console.log(err);
    });

});
router.post('/ApagarServicos/ApagarFaxina', function (req, res) {

    db.query('SELECT delete_faxina ($1)', [req.body.id_servico], function (ret) {
        res.redirect('/ApagarServicos/ApagarFaxina');
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});


router.get('/ApagarServicos/ApagarAlimentacao', function (req, res) {

    db.query('SELECT * FROM view_alimentacao55 ORDER BY hora_inicio DESC', null, function (ret) {
        ret.rows.forEach(function (elemento) {
            elemento.hora_inicio = moment(elemento.hora_inicio).format('DD/MM/YYYY hh:mm');
            elemento.hora_fim = moment(elemento.hora_fim).format('DD/MM/YYYY hh:mm');
        });
        res.render('apagar/servicos/alimentacao', {
            'alimentacao': ret.rows
        });
    }, function (err) {
        console.log(err);
    });

});
router.post('/ApagarServicos/ApagarAlimentacao', function (req, res) {
    db.query('SELECT delete_alimentacao ($1)', [req.body.id_servico], function (ret) {
        res.redirect('/ApagarServicos/ApagarAlimentacao');
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});


router.get('/ApagarServicos/ApagarReceita', function (req, res) {

    db.query('SELECT * FROM receita ORDER BY nome_receita asc', null, function (ret) {
        ret.rows.forEach(function (elemento) {
        });
        res.render('apagar/servicos/receita', {
            'receitas': ret.rows
        });
    }, function (err) {
        console.log(err);
    });

});
router.post('/ApagarServicos/ApagarReceita', function (req, res) {
    db.query('SELECT delete_receita ($1)', [req.body.id_receita], function (ret) {
        res.redirect('/ApagarServicos/ApagarReceita');
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
    });
});


router.get('/ApagarServicos/ApagarReparo', function (req, res) {
    db.query("SELECT * FROM view_operador_servico WHERE tipo = 'R' ORDER BY hora_inicio DESC", null, function (ret) {
        ret.rows.forEach(function (elemento) {
            elemento.hora_inicio = moment(elemento.hora_inicio).format('DD/MM/YYYY hh:mm');
            elemento.hora_fim = moment(elemento.hora_fim).format('DD/MM/YYYY hh:mm');
        });
        res.render('apagar/servicos/reparo', {
            'reparos': ret.rows
        });
    }, function (err) {
        console.log(err);
    });

});
router.post('/ApagarServicos/ApagarReparo', function (req, res) {
    db.query('SELECT delete_reparo ($1)', [req.body.id_servico], function (ret) {
        res.redirect('/ApagarServicos/ApagarReparo');
    }, function (err) {
        res.render('bd_error', {
            error: err
        });
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