const express = require("express") //iniciando o express
const router = express.Router()// configurando a primeira parte da rota
const { v4: uuidv4 } = require('uuid')

const app = express()// iniciando o app
app.use(express.json())
const porta = 3333;// criando porta

// ciando lista inicial de mulheres
const mulheres = [
    {
        id: "1",
        nome:"Luane Loureiro",
        imagem:"https://avatars.githubusercontent.com/luane-loureiro.png",
        miniBio:"Sou vidrada em comunicação visual e tecnologia, estudei na escola de belas artes da UFRJ e Desenho industrial na universidade Estácio de Sá, com bolsa integral.  Atualmente tenho minha própria empresa com marca registrada no INPI, onde eu sou responsavel pelo site e toda a parte de Design.  Depois de anos a frente da minha empresa, busco novos desafios na área de Design, Games e tecnologia.  Nos tempos livres gosto de ler, jogar video game, desenhar e Faço aulas de Balé."
    },
    {
        id: "2",
        nome:"Simara conceoção",
        imagem:"https://avatars.githubusercontent.com/simaraconceicao.png",
        miniBio:"desenvolvedora e Instrutora"
    }, 
    {
        id: "3",
        nome: 'Iana Chan',
        imagem: 'https://bit.ly/3JCXBqP',
        minibio: 'CEO & Founder da PrograMaria',
     
      },
      {
        id: "4",
        nome: 'Luana Pimentel',
        imagem: 'https://bit.ly/3FKpFaz',
        minibio: 'Senior Staff Software Engineer',
      }
]

//GET
function mostraMulheres(request, response){
    response.json(
        mulheres
    )

}

// POST
function criaMulher(request, response){
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

//PATCH
function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
      if (mulher.id === request.params.id) {
        return mulher
      }
    }
    const mulherEncontrada = mulheres.find(encontraMulher)
   
    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
    }
     
    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio
    }
   
    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem
    }
   
    response.json(mulheres)
   }

// DELETE
function apagaMulher(request, response) {
    function todasMenosEla(mulher){
        if (mulher.id !== request.params.id){
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
}

// porta
function mostraPorta (){
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulheres', mostraMulheres)) // configuta rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // configura rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher )) // configura rota PATCH /mulheres/:id
app.use(router.patch('mulher/:id', apagaMulher))// configura a rota delet /mulher/:id

app.listen(porta, mostraPorta) // server ouvindo a porta