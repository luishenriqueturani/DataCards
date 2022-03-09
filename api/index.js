const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.post("/salvar-pokemons", function(req, res){
    let body = req.body;

    console.log(body);
    
    fs.writeFile('pokemons.json', JSON.stringify(body), function(err, data){
        if (err) {
            console.error(JSON.stringify(err));
            res.end(JSON.stringify({
                data: 'Deu ruim'
            }))
        }else{
            res.end(JSON.stringify({
                data: 'Arquivo salvo com sucesso!'
            }))
        }
    })
    
})

app.listen(4001, function(){ console.log('Rodando na porta 4001') })
