const Producto = require("../models/Producto");
const { Router } = require("express");
const router = Router();
const {validarJWTAdmin} = require ("../middleware/validarJWT")

router.get("/", async (req, res) => {
  var books = await Producto.find({},{"editorial":0, "descripcion":0,"fecha":0, "paginas":0});
  res.status(200).json(books);
});
//---recibe id de producto por params
router.get('/:id', async(req,res)=>{
  const {id}=req.params
  const bookDetail = await Producto.findById(id, (err, productDetail)=>{
      err? res.status(404).send({message:'error al buscar libro'}) : res.status(200).send(productDetail)
  })
})
//Falta volver a meter el validatenoseque validarJWTAdmin
router.post("/", async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).send(producto);     
  } catch (error) {
    console.log(error);
    res.status(500).send(error); 
  }
});
//{ok: false, msg:' nose pudo crear el producto'}
router.post("/review", async (req, res) => { 
  try {
    const producto = await Producto.updateOne({_id: req.body._id },{ $push:{ review:req.body } })
    res.status(201).send({ msg: 'exito' });     
  } catch (error) {
    res.status(500).send({ msg:' nose pudo dejar su review' }); 
  }
});
//---recibe id de producto por params validarJWTAdmin
router.put('/edit/:id', async (req,res)=>{
  const {id}=req.params
  const update= req.body
  const editBook= await Producto.findByIdAndUpdate(id,update, {new:true}); 
  res.status(201).send(editBook);
})

module.exports = router;