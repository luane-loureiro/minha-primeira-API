const express = require("express") //iniciando o express
const router = express.Router()// configurando a primeira parte da rota
const cors = require ("cors") //trazendo o pacote cors que permite consumir essa api do front-end

const conectaBancoDeDados = require('./bancoDeDados')// ligando ao arquivo de banco de dados
conectaBancoDeDados()// chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express()// iniciando o app
app.use(express.json())
app.use(cors())
const porta = 3333;// criando porta

//GET
async function mostraMulheres(request, response){
    try { 
        const mulheresVindasDoDB = await Mulher.find()
        response.json(mulheresVindasDoDB)

    }catch(erro){
        console.log(erro)
    }

}

// POST
async function criaMulher(request, response){
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        citacao: request.body.citacao,
        minibio: request.body.minibio,
    })

    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch(erro){
        console.log(erro)
    }

}

//PATCH
async function corrigeMulher(request, response) {
    try{
        let mulherEncontrada = await Mulher.findById(request.params.id) 
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
 
        }
        console.log(request.body) 
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.imagem) {
            mulherEncontrada = request.body.imagem
        }

        if (request.body.citacao) {
            mulherEncontrada = request.body.citacao
        }

        console.log(mulherEncontrada)
        const mulherAtualizadaNoDB = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoDB)

    } catch (erro){
        console.log(erro)
    }

   }

// DELETE
async function apagaMulher(request, response) {
    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "mulher deletada com sucesso"})

    }catch(erro){
        console.log(erro)
    }
}
// porta
function mostraPorta (){
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulheres', mostraMulheres)) // configuta rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // configura rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher )) // configura rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', apagaMulher)) // configura a rota delet /mulheres/:id

app.listen(porta, mostraPorta) // server ouvindo a porta