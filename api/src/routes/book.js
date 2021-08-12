const {Router}= require ('express');
const router = Router();

const {dbConnection}= require('../configDB/config');
const Producto= require ('../models/Product')
const mongoose = require("mongoose");

dbConnection();

router.post('/', async (req,res)=>{
    const {titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio}= req.body
    
    const book= new Producto({titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio,})

    await book.save();

    mongoose.connection.close();

   res.send(book)
})

module.exports= router;