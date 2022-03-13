let pokemons

document.addEventListener('DOMContentLoaded', async function() {

    

});

async function buscarListaPokemons(){

    $.getJSON(`../files/pokemons.json`, function(data){
        console.log(data)
        pokemons = data
    })

    return pokemons
}