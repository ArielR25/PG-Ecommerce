const {Router}= require ('express');
const router = Router();

const {dbConnection}= require('../configDB/config');
const Book= require ('../models/Product')
const mongoose = require("mongoose");
const { findById } = require('../models/Product');

dbConnection();

router.post('/add', async (req,res)=>{
    const {titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio}= req.body
    
    const book= new Book({titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio,})

    await book.save((err, productStored)=>{
        err ? res.status(500).send({message:'no se pudo crear el producto'}) : res.status(201).send(productStored)
    });

    mongoose.connection.close();

});

router.put('/edit/:id',async (req,res)=>{
    const {id}=req.params
    const update= req.body

    const editBook= await Book.findByIdAndUpdate(id,update, (err, productUpdate)=>{
        err ? res.status(500).send({message:'error al actualizar'}) : res.status(201).send(productUpdate)
    })

})

module.exports= router;