const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json({limit:200000000}),function(req, res, next) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/salvar-pokemons", function(req, res){
    
    let body = req.body;

    console.log(body);

    if(body == null || body == undefined){
        res.end(JSON.stringify({
            data: 'Body veio vazio'
        }))
    }
    
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
