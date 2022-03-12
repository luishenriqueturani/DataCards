//ready
document.addEventListener("DOMContentLoaded", function(e) {

    //botão do menu
    document.querySelector(`#toggle-menu`).addEventListener("click", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelector(`#sidenav`).classList.toggle("active");
        this.classList.toggle("active");
        
        let overlay = document.querySelector(`#overlay`);

        overlay.classList.toggle("active");

    });
    document.querySelector(`#overlay`).addEventListener("click", function(e){
        e.preventDefault();
        e.stopImmediatePropagation();

        document.querySelector(`#sidenav`).classList.toggle("active");
        document.querySelector(`#toggle-menu`).classList.toggle("active");
        
        this.classList.toggle("active");

    });

});

function fadeIn(el, time, display, opacity){
    let transition = time / 10;

    el.style.transition = `${transition}s ease-in-out ${transition}s`;

    el.style.display = display;

    el.style.opacity = opacity;

}

function fadeOut(el, time){
    let transition = time / 10;

    el.style.transition = `${transition}s ease-in-out ${transition}s`;
    
    el.style.opacity = 0;
    
    el.style.display = "none";

}

let retTodos
let result

let json = [];

async function buscarPokemonsAPI(){
    retTodos = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126`);
    result = await retTodos.json()
    //console.log(result)
    for(pkmn of result.results){
        let retPkmn = await fetch(`${pkmn.url}`);
        let resultPkmn = await retPkmn.json();
        //console.log(resultPkmn);

        let tipo = resultPkmn.types[0].type.name + (resultPkmn.types.length > 1 ? ` - ${resultPkmn.types[1].type.name}` : '');

        json.push({
            pekedex: resultPkmn.id,
            name: resultPkmn.name,
            sprite: resultPkmn.sprites.front_default,
            type: tipo,

        });
        break;
    }
    console.log(json);

    let retSalvar = await fetch(`http://localhost:4001/salvar-pokemons`, {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    })
    console.log(retSalvar.json());
}