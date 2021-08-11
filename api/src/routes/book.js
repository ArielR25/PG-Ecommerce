const {Router}= require ('express');
const router = Router();

const {dbConnection}= require('../configDB/config');
const Book= require ('../models/Book')
const mongoose = require("mongoose");

dbConnection();

router.post('/', async (req,res)=>{
    const {titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, precio}= req.body

    const book= new Book({titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, precio,})

    await book.save();

    mongoose.connection.close();

   res.json({ok:true})
})

module.exports= router;