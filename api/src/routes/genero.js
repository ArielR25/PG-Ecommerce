const { Router } = require("express");
const router = Router();
const { dbConnection } = require("../configDB/config");
const Genero = require("../models/Genero");
const Producto = require("../models/Producto");
const mongoose = require("mongoose");

dbConnection();

router.get('/', async (req,res)=>{
  const resp= await Genero.find({},{"genero":1,"_id":0})    

  const arrayGeneros=resp.map(e=>e.genero)

  res.status(200).send(arrayGeneros)

   /* mongoose.connection.close(); */
});

router.post("/", async (req, res) => { /* add agregar */ 
  const { genero } = req.body;

  const newGenero = new Genero({ genero });

  await newGenero.save();

  

  res.json(newGenero);

});

router.delete('/', async (req, res)=>{
  const {genero}=req.query

  await Genero.findOneAndDelete({genero})
  await Producto.updateMany({"generos":genero},{$pull:{"generos":genero}})

  res.status(200).send({ok:true})

})

module.exports = router;
