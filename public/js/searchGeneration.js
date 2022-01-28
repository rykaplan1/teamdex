// Takes the user's input for which generation they want to pull from
const searchInput = document.getElementById('pokemon-search'); // Drop down list for generations
const searchBtn = document.getElementById('search-btn'); // Search/submit button for searching a generation
// const pokeSearch = require('pokemon.js');
// pokeSearch.setLanguage('english');
let pokeAPIURL = 'https://pokeapi.co/api/v2/generation/';

// Search for all pokemon from a generation
const searchGeneration = async (num) => {
    const pokemonArr = [];
    // Gets all pokemon available to specified generation (including previous)
    // for (let i = num; i > 0; i--) {
    pokeAPIURL += num;
    const pokeData = await fetch(pokeAPIURL);
    console.log(pokeData);
    // Add all pokemon (by name) to pokemonArr
    // await pokemon_species.forEach(pokemon => {
    //     pokemonArr.push(pokemon);
    // });
    // }
}

// TODO Generate list of pokemon to the page
const displayPokemonBulk = async function (pokemon) {
    // create li for each pokemon in array, append to ol
    // each element includes name, (is a) button to go to detailed page for that pokemon, ?Generation added?-stretch goal
    console.log(pokemon);
}

// TODO when 'search' is clicked search a generation and display the pokemon availible to that generation to the page in a scroll-able section
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // take user input to search for pokemon in a certain generation
    const pokeArr = searchGeneration(searchInput.value);
    // displayPokemonBulk(pokeArr);
});
