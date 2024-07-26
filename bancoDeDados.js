const mongoose = require("mongoose");

async function conectaBancoDeDados() {
    try{
        console.log("iniciando conexão com o Banco de Dados")
        await mongoose.connect('mongodb+srv://luachan:ChobitS123@cluster0.zhlrdio.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("conexão com o banco de dados feita com sucesso")
    }
    catch (error){
        console.log(error)
    }
}

module.exports = conectaBancoDeDados