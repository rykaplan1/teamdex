// Loads where the user can click on a specific pokemon from the list created by searchGeneration.js
const pokeListData = document.getElementById('pokemon-choice');
const addPokemonBtn = document.getElementById('add-pokemon-btn');
const newTeamDisplay = document.getElementById('new-team-display');

let newTeamLength = 0;

// search PokeAPI for the respective Pokemon
const searchForPokemon = async function (name) {
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const response = await fetch(pokeURL);
    const pokeData = await response.json();
    return pokeData;
}

// TODO Add pokemon to team template
const addToTeam = function (pokeObj) {
    // pull relevent data from pokemon object
    const newPokemon = {
        name: pokeObj.name.charAt(0).toUpperCase() + pokeObj.name.slice(1),
        type: pokeObj.types,
        sprite: pokeObj.sprites.front_default
    }
    // condensing dom traversal
    const currentTeamSlot = newTeamDisplay.children[newTeamLength];
    // Pokemon Name
    currentTeamSlot.children[0].innerHTML = newPokemon.name;
    // Description
    if (newPokemon.type[1]) {
        currentTeamSlot.children[1].innerHTML = `Types: ${newPokemon.type[0].type.name}, ${newPokemon.type[1].type.name}`;
    } else {
        currentTeamSlot.children[1].innerHTML = `Type: ${newPokemon.type[0].type.name}`;
    }
    // Sprite
    currentTeamSlot.children[2].setAttribute('src', newPokemon.sprite);
    currentTeamSlot.children[2].setAttribute('alt', newPokemon.name);
    newTeamLength++;
}

// on clicking 'add to team' get the value of the datalist dropdown and fetch that pokemon's data, then display it in the team template
addPokemonBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // check if team is full
    if (newTeamLength >= 6) {
        alert('Team at capacity, max 6')
    } else {
        const pokemonObj = await searchForPokemon(pokeListData.value);
        addToTeam(pokemonObj);
    }
})