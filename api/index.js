require ('dotenv').config();
const cors = require('cors');

const express= require ('express');
const app = express();

app.use(cors());
const routes = require('./src/routes/index');


//crear servidor express
app.use(express.json())


app.use('/', routes);


//escuchar peticiones
app.listen(4000,()=>{
    console.log('Servidor corriento en el puerto 4000')
})
