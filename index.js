/* 
Instale as bibliotecas e o cliente de API:
npm init
npm i express
Procure pela extensão RapidAPI Client no VSCode.
*/
// Para executar a API no terminal: node index.js
// Link para testar a API: http://localhost:3000/rota
const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.

app.post("/musicas", (req, res) => {
    const musicas = req.body
    try {
        // abrir o arquivo
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        // adicionar o cliente
        bd.push(musicas)
        // salvar o arquivo
        fs.writeFileSync("bd.json", JSON.stringify(bd), "utf8")
        // resposta
        res.status(201).json({resposta: "Música cadastrada!"})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.get("/musicas", (req, res) => {
    try {
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        res.status(200).json({resposta: bd})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.delete("/musicas/:id", (req, res) => {
    // pegar o id
    const id = req.params.id
    try {
        // abrir o banco de dados
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        // encontrar o índice do cliente a ser excluido
        const indiceMusicas = bd.findIndex((musica) => musica.id == id)
        // remover o indice da lista
        if (indiceMusicas == -1) {
            return res.status(404).json({erro: "A música não existe"})
        }
        bd.splice(indiceMusicas, 1)
        // atualizar o arquivo
        fs.writeFileSync("bd.json", JSON.stringify(bd), "utf8")
        // dar uma resposta para o cliente
        res.status(200).json({resposta: "Música excluída com sucesso!"})
    } catch (error){

        res.status(500).json({erro: error.message})
    }
})


// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})