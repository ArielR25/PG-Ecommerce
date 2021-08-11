const {Router}= require ('express');
const router = Router();

const {dbConnection}= require('../configDB/config');
const book= require ('../models/Book')
const Genero= require('../models/Genero')
const mongoose = require("mongoose");

dbConnection();

router.get('/', async (req,res)=>{

    const resp= await book.find({},{"generos":1,"_id":0})
    const array=resp.map(e=>e.generos)

    res.send(resp)

    mongoose.connection.close();
});

router.post('/', async (req,res)=>{
    const {genero}= req.body

    const newGenero= new Genero({genero})

    await newGenero.save();

   res.json({ok:true})

   mongoose.connection.close();
});

module.exports= router;