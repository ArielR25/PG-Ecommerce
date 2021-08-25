const { Router } = require("express");
/* const { dbConnection } = require("../configDB/config"); */

const router = Router();
const Usuario = require ("../models/Usuario")
const Producto= require("../models/Producto");
const Orden = require("../models/Orden");
const {validarJWTUser} = require ('../middleware/validarJWT');
const Stripe = require("stripe")


const stripe = new Stripe("sk_test_51JQAouFWmGEeX4od3qJjkwW2cdTVunEMWXE9PgKcNaz0sU2DvmGqLMHAIhuix7usRB1f6oSbE9ZfkD92GKRTmVdv001bFGHwHL")

//-----guarda la compra ya hecha en el usuario y en la base de datos general que seria para el adm
//-----ruta para user y admin
router.post('/',validarJWTUser, async (req,res)=>{
    const {pago, valorTotal, productos} = req.body;
    
    try {

        await stripe.paymentIntents.create({

            amount: valorTotal, 
            currency: "USD",
            payment_method: pago,
            confirm: true
        })
    var compra= {...req.body,estado:'creada'}      
    var response= 'ok'  
    
    productos.map(async p=> {
        var book = await Producto.findById(p.producto)
        book = await Producto.findByIdAndUpdate({"_id":p.producto},{"stock":book.stock-Number(p.cantidad)},{new:true})
    })
    

    res.send(book)
    }
    catch (error){
        var compra= {...req.body,estado:'cancelada'}
        var response='pago rechazado'
    }
    finally{
        const orden= new Orden(compra);
        const id=req.uid
        orden.user=id
        await orden.save();
        await Usuario.findByIdAndUpdate(id, {$push:{"historialDeCompras": orden}})
        res.send({ok:response})
    }
});
//------busca el libro, cambia el stock y lo envia al front para el carrito

// router.get('/removeOne/:idRemoveOne',async (req,res)=>{
//     const {idRemoveOne}= req.params

//     var book = await Producto.findById(idRemoveOne)
//     book = await Producto.findByIdAndUpdate({"_id":idRemoveOne},{"stock":book.stock+1},{new:true})
//     res.send(book)
// });

// router.get('/removeAll/:idProducto/:count',async (req,res)=>{
    
// });

router.get('/:idProducto',async (req,res)=>{
    const {idProducto}= req.params

    var book = await Producto.findById(idProducto)
    // book = await Producto.findByIdAndUpdate({"_id":idProducto},{"stock":book.stock-1},{new:true})

    res.send(book)
});

module.exports = router;
