// npm init
// npm i express
// instalar Rapidapi Client
const express = require ("express")
const app = express ()
const port = 3000
app.use (express.json())
const fs = require ('fs')

app.post("/clientes", (req,res) => {
  const cliente = req.body
    // abrir o arquivo
  try { 
    const bd =  JSON.parse (fs.readFileSync ("bd.json", "utf8"))
    
    // adicionar o cliente
    bd.push (cliente)
    
    //salvar o arquivo
    fs.writeFileSync ("bd.json", JSON.stringify (bd), "utf8")
   
    //resposta
    res.status(200).json({resposta: "Cliente cadastrado!"})
     } 
 catch (erro){ 
    res.status(500). json ({erro: erro.message})
   }
    })
    // abrir o arquivo/ banco de dados
     app.get("/clientes", (req,res) => {
        try {
        const bd =  JSON.parse (fs.readFileSync ("bd.json", "utf8"))
    res.status(200).json({resposta: bd})
    } catch (erro) {
         res.status (500).json({erro: erro.message})

      }}

      ) 

app.get("/perfil", (req, res) => {
    res.json({nome : "Amandaaa" , idade : "15 anos"})
})


app.get("/clientes/:cpf", (req,res) => {
   //pegar cpf
    const cpf = req.params.cpf
    try {
        const bd = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        const cliente =  bd.find((cliente) => cliente.cpf == cpf)
    if(!cliente){
        return res.status(404).json({})
    }
        res.status (200).json({resposta: cliente})
    } catch (erro){
          res.status (500).json({erro: erro.message})
}
})

app.delete("/cliente/ : cpf", (req,res) => {
   //pegar o cpf da rota
         const cpf = req.params.cpf
   try {
    // abrir o banco de dados
         const bd = JSON.parse (fs.readFileSync ("bd.json", "utf8"))
    //encontrar o índice  do cliente a ser removido
         const indiceCliente = bdfindIndex ((cliente) => cliente.cpf == cpf ) 
        
   //remover o índice da lista
        if(!indiceCliente == -1) {
             return res.status (404).json ({erro: "O cliente não existe"})
   }
         bd.splice(indiceCliente,1)
   //dar uma resposta para o cliente
     res.status (200).json ({resposta: "Cliente excluído com sucesso"})
   } catch (erro) {} 
      res.status(500).json({erro: erro.message})
})


app.listen(port, () => {
    console.log ("API executando na porta" + port)
})
                            
//  GET http://localhost:3000/clientes
// TESTAR TODAS AS ROTAS: post, get geral e get cpf