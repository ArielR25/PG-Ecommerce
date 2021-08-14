const { Router } = require("express");
const Producto = require("./producto.js");
const Genero = require("./genero");
const CartShopping = require ("./cartShopping")
const router = Router();

router.use("/productos", Producto);
router.use("/generos", Genero);
router.use("/cart", CartShopping)
module.exports = router;
