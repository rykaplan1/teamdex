// Loads where the user can click on a specific pokemon from the list created by searchGeneration.js
const pokeListData = document.getElementById('pokemon-choice')
const addPokemonBtn = document.getElementById('add-pokemon-btn');

// search PokeAPI for the respective Pokemon
const searchForPokemon = async function (name) {
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const response = await fetch(pokeURL);
    const pokeData = await response.json();
    return pokeData;
}

// TODO Add pokemon to team template
const addToTeam = async function (pokeObj) {
    console.log(pokeObj);
}

// on clicking 'add to team' get the value of the datalist dropdown and fetch that pokemon's data, then display it in the team template
addPokemonBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const pokemonObj = await searchForPokemon(pokeListData.value);
    addToTeam(pokemonObj);
})