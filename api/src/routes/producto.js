const { dbConnection } = require("../configDB/config");
const Producto = require("../models/Producto");
const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();



dbConnection();

router.get("/", async (req, res) => {
  var books = await Producto.find({});
  res.json(books);
});

router.get('/:id', async(req,res)=>{
  const {id}=req.params
  const bookDetail = await Producto.findById(id, (err, productDetail)=>{
      err? res.status(404).send({message:'error al buscar libro'}) : res.status(200).send(productDetail)
  })
})

router.post("/", async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).send(producto);     
  } catch (error) {
    res.status(500).send({ok: false, msg:' nose pudo crear el producto'}); 
  }
});

router.put('/edit/:id',async (req,res)=>{
  const {id}=req.params
  const update= req.body
  const editBook= await Producto.findByIdAndUpdate(id,update); 
  res.status(201).send(editBook);
})



module.exports = router;
