/* IMPORTAÇÃO DO SEQUELIZE */
const sequelize  = require('sequelize');

/* IMPORTAÇÃO DA CONEXÃO COM O BANCO DE DADOS */
const connection = require('../database/database');

/* IMPORTAÇÃO DA MODEL DE CATEGORIA */
const categoria = require('./categoriaModel');

const livro = connection.define(
    'tbl_livro',
    {
        titulo:{
            type:sequelize.STRING(255),
            allowNull:false
        },
        preco:{
            type:sequelize.STRING(255),
            allowNull:false
        },
        preco:{
            type:sequelize.STRING(255),
            allowNull:false
        },
        img_peq:{
            type:sequelize.STRING(255),
            allowNull:false
        },
        img_grd:{
            type:sequelize.STRING(255),
            allowNull:false
        },
        detalhes:{
            type:sequelize.TEXT,
            allowNull:false
        }
    }
);
/* CHAVE PRIMARIA DE CATEGORIA (1) VIRA CHAVE ESTRANGEIRA (N) EM LIVRO */
categoria.hasMany(livro);

/* CHAVE ESTRANGEIRA DE LIVRO (N) É A CHAVE PRIMARIA DE CATEGORIA (1) */
livro.belongsTo(categoria);

//livro.sync({force:true});


module.exports = livro;