const mongoose = require("mongoose");
const {DB_CNN}=process.env



const dbConnection = async()=>{
    try {
       await mongoose.connect(DB_CNN,{
            userNewUrlParser: true, 
            useUnifiedTopology:true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('database connect')
        
    } catch (error) {
        console.log(error);
        handleError(error)
    }
}

module.exports ={
    dbConnection
}