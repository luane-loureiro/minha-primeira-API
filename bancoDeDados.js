const mongoose = require("mongoose");
require ("dotenv").config()

async function conectaBancoDeDados() {
    try{
        console.log("iniciando conexão com o Banco de Dados")
        await mongoose.connect(process.env.MONGO_URL)
        console.log("conexão com o banco de dados feita com sucesso")
    }
    catch (error){
        console.log(error)
    }
}

module.exports = conectaBancoDeDados