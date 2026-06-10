// npm init
// npm i express
const express = require ("express")
const app = express ()
const port = 3000

app.get("/perfil", (req, res) => {
    res.json({nome : "Amandaaa" , idade : "15 anos"})
})

app.listen(port, () => {
    console.log ("API executando na porta" + port)
})
