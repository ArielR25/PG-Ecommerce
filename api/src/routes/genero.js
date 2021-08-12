const {Router}= require ('express');
const router = Router();

const {dbConnection}= require('../configDB/config');
const Genero= require('../models/Genero')
const mongoose = require("mongoose");

dbConnection();

router.get('/', async (req,res)=>{
    
    const resp= await Genero.find({},{"genero":1,"_id":0})

    const arrayGeneros=resp.map(e=>e.genero)


    res.status(200).send(arrayGeneros)

    mongoose.connection.close();
});

router.post('/', async (req,res)=>{
    const {genero}= req.body

    const newGenero= new Genero({genero})

    await newGenero.save();

    mongoose.connection.close();
  
    res.send(newGenero)
});

router.delete('/', async (req, res)=>{
    const {genero}=req.query

  await Genero.findOneAndDelete({genero})
//    await  Book.generos.genero().remove()

   res.sendStatus(200)

})



module.exports= router;