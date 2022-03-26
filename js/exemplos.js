let pokemons

document.addEventListener('DOMContentLoaded', async function () {

    pokemons = await buscarListaPokemons();

    console.log(pokemons);

    let html = ``;

    for (pkmn of pokemons) {
        let imagem
        if (pkmn.sprite == null || pkmn.sprite == '') {
            imagem = 'Nenhuma imagem encontrada';
        } else {
            imagem = `<img src="${pkmn.sprite}" class="sprite-pokemon" alt="Imagem de sprite de game pixel art do pokémon ${pkmn.name}">`;
        }
        html += `<tr>
                    <td class="id-pokemon">${pkmn.pokedex}</td>
                    <td class="nome-pokemon">${pkmn.name}</td>
                    <td class="tipo-pokemon">${pkmn.type}</td>
                    <td class="habilidades-pokemon">${pkmn.abilities}</td>
                    <td class="peso-pokemon">${pkmn.weight} lb</td>
                    <td class="imagem-pokemon">${imagem}</td>
                </tr>`;
    }

    let tbDefault = $(`#tabela-modelo-default`);

    await tbDefault.find(`tbody`).html(html);

    await tbDefault.DataTable({
        "scrollX": true,
        responsive: true,
        language: {
            url: `../libs/datatables/locale/dataTables.pt_br.json`
        },
    });

});

function buscarListaPokemons() {
    return new Promise(async function (resolve, reject) {
        try {
            var myHeaders = new Headers();

            let response = await fetch(`http://localhost:4001/get-pokemons`,{
                method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' 
            });
            let retorno = response.json()
            console.log(retorno)
            resolve(retorno);
        } catch (error) {
            reject(error);
        }

    })


}
