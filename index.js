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
    // abrir o arquivo
     app.get("/clientes", (req,res) => {
     try {
        const bd =  JSON.parse (fs.readFileSync ("bd.json", "utf8"))
    req.status(200).json({resposta: bd})
    } catch (erro) {
         res.status (500).json({erro: erro.message})

      }}
      ) 

app.get("/perfil", (req, res) => {
    res.json({nome : "Amandaaa" , idade : "15 anos"})
})

app.listen(port, () => {
    console.log ("API executando na porta" + port)
})

//  GET http://localhost:3000/clientes*