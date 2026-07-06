/* 
Instale as bibliotecas e o cliente de API:
npm init
npm i express
Procure pela extensão RapidAPI Client no VSCode.
*/
// Para executar a API no terminal: node index.js
// Link para testar a API: http://localhost:3000/famosos
const express = require("express")
const app = express()
const port = 3000
app.use(express.json()) // configura API para usar JSON.
const fs = require('fs') // importa leitura e escrita de arquivos.

app.post("/famosos", (req, res) => {
    const famosos = req.body
    try {
        // abrir o arquivo
        const bd = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        // adicionar o cliente
        bd.push(famosos)
        // salvar o arquivo
        fs.writeFileSync("famosos.json", JSON.stringify(bd), "utf8")
        // resposta
        res.status(201).json({resposta: "Famoso cadastrado!"})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.get("/famosos", (req, res) => {
    try {
        const famosos = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        res.status(200).json({resposta: famosos})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.get("/famosos/:id", (req, res) => {
    const id = req.params.id
    try {
        const famoso = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        const famosos = famoso.find((famosos) => famosos.id == id)
        if(!famosos) {
            return res.status(404).json({erro: "O famoso não existe no BD!"})
        }
        res.status(200).json({resposta: famosos})
    } catch (erro) {
        res.status(500).json({erro: erro.message})
    }
})


app.delete("/famosos/:id", (req, res) => {0
    // pegar o id
    const id = req.params.id
    try {
        // abrir o banco de dados
        const bd = JSON.parse(fs.readFileSync("famosos.json", "utf8"))
        // encontrar o índice do cliente a ser excluido
        const indiceFamosos = bd.findIndex((famosos) => famosos.id == id)
        // remover o indice da lista
        if (indiceFamosos == -1) {
            return res.status(404).json({erro: "O famoso não existe"})
        }
        bd.splice(indiceFamosos, 1)
        // atualizar o arquivo
        fs.writeFileSync("famosos.json", JSON.stringify(bd), "utf8")
        // dar uma resposta para o cliente
        res.status(200).json({resposta: "Famoso excluído com sucesso!"})
    } catch (error){

        res.status(500).json({erro: error.message})
    }
})


// Execução da API:
app.listen(port, ()=>{
    console.log("API rodando na porta " + port)
})