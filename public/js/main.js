console.log("js file loaded");

let count = 0;
let loading = false;
let container = document.getElementById("container");
container.style.display = "none";
let load = document.getElementById("load");

async function loadPokemon() {
    if (!loading) {
        loading = true;

        let card = document.getElementById("pokemonList");
        let cardArray = [];
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${count}&limit=10`);
        let jsonObj = await response.json();

        for (pokemon of jsonObj.results) {
            let response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            let jsonObj2 = await response2.json();

            cardArray.push(
                `<div class="card" style="width: 500px;">
                    <img src="${jsonObj2.sprites.other['official-artwork'].front_default}" class="card-img-top">
                    <div class="card-body" style="background-color:#f8f8f8;">
                        <h3 class="card-title">${pokemon.name}</h3>
                    </div>
                </div>
            `)
        }

        for (cards of cardArray) {
            card.innerHTML += cards;
        }

        count += 10;
        loading = false;
    }

}
loadPokemon();

load.addEventListener("click", async function () {

    container.style.display = "flex";
    load.style.display = "none";
    await new Promise(resolve => setTimeout(resolve, 3000));
    loadPokemon();

    container.style.display = "none";
    load.style.display = "block";

});

// document.addEventListener("scroll", function () {
//     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//     let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     if (scrollTop + clientHeight >= scrollHeight - 200) {
//         console.log("End of page reached");
//         loadPokemon();
//     }
// });

