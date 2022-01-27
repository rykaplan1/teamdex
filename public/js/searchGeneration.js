// Takes the user's input for which generation they want to pull from
// const searchInput = document.getElementById('#search-input');
// const searchBtn = document.getElementById('#search-btn');
const pokeSearch = require('pokemon.js');
pokeSearch.setLanguage('english');

// TODO search for pokemon from a generation
const searchGeneration = async function (num) {
    const pokemonArr = [];
    // Gets all pokemon available to specified generation (including previous)
    for (let i = num; i > 0; i--) {
        const { pokemon_species } = await pokeSearch.getGeneration(num);
        // Add all pokemon (by name) to pokemonArr
        pokemon_species.forEach(pokemon => {
            pokemonArr.push(pokemon);
        });
    }
    return pokemonArr;
}

// TODO when 'search' is clicked search a generation and display the pokemon availible to that generation to the page in a scroll-able section
// searchBtn.addEventListener('click', async function () {
// take user input to search for pokemon in a certain generation
// const generationNum = searchInput.value;
const pokeArr = searchGeneration(4);
// });
// searchGeneration();