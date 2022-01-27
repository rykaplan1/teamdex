// Loads wherever the search bar is
const pokeSearch = require('pokemon.js');
pokeSearch.setLanguage('english');

// TODO get user input from the search bar

// TODO search PokeAPI for the respective Pokemon
const searchPokeAPI = async function () {
    const { abilities, game_indices, id, moves, name, past_types, sprites, stats, types, pokedex_numbers} = await pokeSearch.getPokemon('Pikachu');
    const returnedPokemon = { abilities, game_indices, id, moves, name, past_types, sprites, stats, types, pokedex_numbers };
    console.log(returnedPokemon);
}

// TODO load a new page with that one Pokemon's data, buttons for adding to a team or not

searchPokeAPI();