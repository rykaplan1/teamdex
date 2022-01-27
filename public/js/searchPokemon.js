// Loads where the user can click on a specific pokemon from the list created by searchGeneration.js
const pokeSearch = require('pokemon.js');
pokeSearch.setLanguage('english');

// TODO search PokeAPI for the respective Pokemon
const searchForPokemon = async function () {
    const { abilities, game_indices, id, moves, name, past_types, sprites, stats, types, pokedex_numbers} = await pokeSearch.getPokemon('nidoran-m');
    const returnedPokemon = { abilities, game_indices, id, moves, name, past_types, sprites, stats, types, pokedex_numbers };
    console.log(returnedPokemon);
}

// TODO search by region
const searchForRegion = async function () {
    const region = await pokeSearch.getRegion('sinnoh');
    console.log(region);
}

// TODO load a new page with that one Pokemon's data, buttons for adding to a team or not

searchForPokemon();

// searchForRegion();