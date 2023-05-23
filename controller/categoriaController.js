const express = require('express');

const categoriaModel = require('../model/categoriaModel');

/* GERENCIADOR DE ROTAS*/
const router = express.Router();

/* ROTA DE INSERÇÃO DE CATEGORIA(POST)*/
router.post('/categoria/inserir', (req,res)=>{

    let nome_categoria = req.body.nome_categoria;
    
    categoriaModel.create(
        {nome_categoria}
    ).then(
        ()=>{
            //res.send('CATEGORIA INSERIDA');
            return res.status(201).json({
                errorStatus:false,
                mensagenStatus:'CATEGORIA INSERIDA COM SUCESSO'
            });
        }   
    ).catch(
        (error)=>{
            return res.status(500).json({
                errorStatus:true,
                mensagenStatus: error
            })
        }
    );

    //res.send('ROTA DE CATEGORIA DE INSERÇÃO!');

});

/* ROTA DE SELEÇÃO DE CATEGORIA(GET)*/
router.get('/categoria/selecionar', (req,res)=>{
    
    categoriaModel.findAll()
    .then(
        (categorias)=>{
            //console.log(categorias);
            res.json(categorias);
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

/* ROTA DE ALTERAÇÃO DE CATEGORIA(PUT)*/
router.put('/categoria/alterar', (req,res)=>{

    let id = req.body.id;
    let nome_categoria = req.body.nome_categoria;

    categoriaModel.update(
        {nome_categoria},
        {where:{id}}
    ).then(
        ()=>{
            return res.status(200).json({
                errorStatus:false,
                mensagenStatus:'CATEGORIA ALTERADA COM SUCESSO'
            });
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
    //res.send('ROTA DE CATEGORIA DE ALTERAÇÃO!');
    

});

/* ROTA DE EXCLUSÃO DE CATEGORIA(DELETE)*/
router.delete('/categoria/excluir/:id', (req,res)=>{

    let id = req.params.id;
    //console.log('ID: '+ id) ;
    categoriaModel.destroy(
        {where:{id}}
    ).then(
        ()=>{
            return res.status(200).json({
                errorStatus:false,
                mensagenStatus:'CATEGORIA EXCLUIDA COM SUCESSO'
            });
        }
    )
    //res.send('ROTA DE CATEGORIA DE EXCLUSÃO!');
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