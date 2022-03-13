let pokemons

document.addEventListener('DOMContentLoaded', async function () {

    pokemons = await buscarListaPokemons();

    let html = ``;

    for (pkmn of pokemons) {
        let imagem
        if (pkmn.sprite == null || pkmn.sprite == '') {
            imagem = 'Nenhuma imagem encontrada';
        } else {
            imagem = `<img src="${pkmn.sprite}" class="sprite-pokemon" alt="Imagem de sprite de game pixel art do pokémon ${pkmn.name}">`
        }
        html += `<tr><td class="id-pokemon">${pkmn.pokedex}</td><td class="nome-pokemon">${pkmn.name}</td><td class="tipo-pokemon">${pkmn.type}</td><td class="imagem-pokemon">${imagem}</td></tr>`
    }

    let tbDefault = $(`#tabela-modelo-default`)

    await tbDefault.find(`tbody`).html(html);

    tbDefault.DataTable({
        "scrollX": true,
        responsive: true,
        language: {
            url: `../libs/datatables/locale/dataTables.pt_br.json`
        },
    });

});

async function buscarListaPokemons() {
    return new Promise(function (resolve, reject) {
        try {
            $.getJSON(`../files/pokemons.json`, function (data) {
                //console.log(data)
                resolve(data);
            })
        } catch (error) {
            reject(error);
        }

    })


}