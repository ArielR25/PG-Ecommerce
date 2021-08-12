const {Router}= require ('express');
const router = Router();

const {dbConnection}= require('../configDB/config');
const book= require ('../models/Product')
const Genero= require('../models/Genero')
const mongoose = require("mongoose");

dbConnection();

router.get('/', async (req,res)=>{
    
    const resp= await book.find({},{"generos":1,"_id":0})

    var array=resp.map(e=>e.generos)
    array=[].concat.apply([], array)
    
    const arrayFiltrado= array.filter((valor, indice) => {
        return array.indexOf(valor) === indice;
    })
    res.status(200).send(arrayFiltrado)

    mongoose.connection.close();
});

router.post('/', async (req,res)=>{
    const {genero}= req.body

    const newGenero= new Genero({genero})

    await newGenero.save();

   res.json(newGenero)

   mongoose.connection.close();
});

module.exports= router;