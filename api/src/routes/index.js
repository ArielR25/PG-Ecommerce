const { Router } = require("express");

const Producto = require("./producto.js");
const Genero = require("./genero");

const router = Router();

router.use("/productos", Producto);
router.use("/generos", Genero);

module.exports = router;
