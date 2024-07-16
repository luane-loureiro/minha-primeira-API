const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333;

function mostraMulher(request, response) {
    response.json(
        {
            nome:"Luane Loureiro",
            imagem:"https://avatars.githubusercontent.com/luane-loureiro.png",
            miniBio:"Sou vidrada em comunicação visual e tecnologia, estudei na escola de belas artes da UFRJ e Desenho industrial na universidade Estácio de Sá, com bolsa integral.  Atualmente tenho minha própria empresa com marca registrada no INPI, onde eu sou responsavel pelo site e toda a parte de Design.  Depois de anos a frente da minha empresa, busco novos desafios na área de Design, Games e tecnologia.  Nos tempos livres gosto de ler, jogar video game, desenhar e Faço aulas de Balé."
        }
    )
}


function mostraPorta (){
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)


