const express = require('express');
const fs = require('fs');
const cors = require('cors');

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
    
});

app.get("/get-pokemons", cors({origin: '*'}), async function(req, res) {
    let arquivo
    try{
        const data = await fs.readFileSync("files/pokemons.json", 'utf8')
    
        console.log('entrou em ler arquivo')

        arquivo = JSON.parse(data)

        res.send(arquivo);

    }catch(err){
        console.log('caiu em erro')
        res.send(err);
    }
});



app.listen(4001, function(){ console.log('Rodando na porta 4001') })
