const express = require('express');

const livroModel = require('../model/livroModel');

/* GERENCIADOR DE ROTAS*/
const router = express.Router();



/* ROTA DE INSERÇÃO DE LIVRO(POST)*/
router.post('/livro/inserir', (req, res) => {

    let { titulo, preco, img_peq, img_grd, detalhes, tblCategoriumId } = req.body;

    livroModel.create(
        {
            titulo,
            preco,
            img_peq,
            img_grd,
            detalhes,
            tblCategoriumId
        }
    ).then(
        ()=>{
            //res.send('CATEGORIA INSERIDA');
            return res.status(201).json({
                errorStatus:false,
                mensagenStatus:'LIVRO INSERIDO COM SUCESSO'
            });
        }   
    ).catch(
        (error)=>{
            return res.status(500).json({
                errorStatus:true,
                mensagenStatus: error
            });
        }
    );
});

/* ROTA DE SELEÇÃO DE LIVRO(GET)*/
router.get('/livro/selecionar', (req, res) => {

    livroModel.findAll()
    .then(
        (livros)=>{
            res.json(livros);
        }
    )
    .catch(
        (error)=>{
            return res.status(500).json({
                errorStatus:true,
                mensagenStatus: error
            })
        }
    );

});

router.get('/livro/selecionar/:id', (req, res) => {

    let {id} = req.params;

    livroModel.findByPk(id)
    .then(
        (livro)=>{
            res.json(livro);
        }
    )
    .catch(
        (error)=>{
            return res.status(500).json({
                errorStatus:true,
                mensagenStatus: error
            })
        }
    );

});

router.get('/livro/selecionar/:titulo', (req, res) => {

    let {titulo} = req.params;

    livroModel.findOne({where:{titulo:titulo}})
    .then(
        (livro)=>{
            res.json(livro);
        }
    )
    .catch(
        (error)=>{
            return res.status(500).json({
                errorStatus:true,
                mensagenStatus: error
            })
        }
    );

});



/* ROTA DE ALTERAÇÃO DE LIVRO(PUT)*/
router.put('/livro/alterar', (req, res) => {
    
    let {titulo, preco, img_peq, img_grd, detalhes, tblCategoriumId, id} = req.body;

    livroModel.update(
        {
            titulo,
            preco,
            img_peq,
            img_grd,
            detalhes,
            tblCategoriumId
        },
        {
            where:{id}
        }
        ).then(
            ()=>{
                return res.status(201).json({
                    errorStatus:false,
                    mensagenStatus:'LIVRO ALTERADO COM SUCESSO'
                });
            }   
        ).catch(
            (error)=>{
                return res.status(500).json({
                    errorStatus:true,
                    mensagenStatus: error
                });
            }
        );
});

/* ROTA DE EXCLUSÃO DE LIVRO(DELETE)*/
router.delete('/livro/excluir/:id', (req, res) => {
    
    let {id} = req.params;

    livroModel.destroy(
        {where:{id}}
    ).then(
        ()=>{
            return res.status(200).json({
                errorStatus:false,
                mensagenStatus:'LIVRO EXCLUIDO COM SUCESSO'
            });
        }
    )
    //res.send('ROTA DE LIVRO DE EXCLUSÃO!');
    .catch(
        (error)=>{
            return res.status(500).json({
                errorStatus:true,
                mensagenStatus: error
            })
        }
    );
});

module.exports = router;
