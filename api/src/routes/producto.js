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

router.post('/', async (req,res)=>{
    const {titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio}= req.body
    
    const producto= new Producto({titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio,})

    await producto.save();

    mongoose.connection.close();

    res.status(201).send(producto)

});

router.put('/edit/:id',async (req,res)=>{
    const {id}=req.params
    const update= req.body
    const editBook= await Producto.findByIdAndUpdate(id,update) 
    res.status(201).send(editBook)
});

module.exports= router;