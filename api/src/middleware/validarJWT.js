const jwt = require ('jsonwebtoken')
const {CLAVE_TOKEN} = process.env


const validarJWTAdmin= (req,res,next)=>{
    
    let token = req.header('x-token');
    
    
    if (!token){
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

    try {
        const {uid,nombre,admin} = jwt.verify(
            token,
            CLAVE_TOKEN
        )
        req.uid=uid
        req.nombre=nombre
        req.admin=admin
        admin=== true?  next() : res.status(500).json({ok:false,msg:'ruta no permitida'})

    } catch (error) {
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

}

const validarJWTUser= (req,res,next)=>{
   
    let token = req.header('x-token');
    if (!token){
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

    try {
        const {uid,nombre,admin} = jwt.verify(
            token,
            CLAVE_TOKEN
        )
        req.uid=uid
        req.nombre=nombre
        req.admin=admin
       
    next()
    } catch (error) {
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

}

module.exports={
    validarJWTUser,
    validarJWTAdmin
}
