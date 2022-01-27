// Takes the user's input for which generation they want to pull from
const pokeSearch = require('pokemon.js');
pokeSearch.setLanguage('english');

// TODO get user input from the search bar

// TODO search for pokemon from a generation
const searchGeneration = async function (num) {
    // const 
    const generation = await pokeSearch.getGeneration(3);
    console.log(generation);
}

searchGeneration();