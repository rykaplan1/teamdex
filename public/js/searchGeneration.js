// Takes the user's input for which generation they want to pull from
const searchInput = document.getElementById('pokemon-search'); // Drop down list for generations
const searchBtn = document.getElementById('search-btn'); // Search/submit button for searching a generation
const dataList = document.getElementById('pokemon-list');

// Search for all pokemon from a generation
const searchGeneration = async (num) => {
    const pokemonArr = [];
    // Gets all pokemon available to specified generation (including previous)
    for (let i = num; i > 0; i--) {
    const pokeAPIURL = `https://pokeapi.co/api/v2/generation/${i}`;
    const response = await fetch(pokeAPIURL);
    const pokeData = await response.json();
    // Add all pokemon (by name) to pokemonArr
    await pokeData.pokemon_species.forEach(pokemon => {
        pokemonArr.push(pokemon);
    });
    }
    return pokemonArr;
}

// Generate list of pokemon to the page
const displayPokemonBulk = async function (pokemon) {
    // Create and append pokemon to the list
    pokemon.forEach(pokeName => {
        const listEntry = document.createElement('option');
        newName = pokeName.name.charAt(0).toUpperCase() + pokeName.name.slice(1);
        listEntry.value = newName;
        dataList.append(listEntry);
    })
}

// when 'search' is clicked search a generation and display the pokemon availible to that generation to the page in a scroll-able section
searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // take user input to search for pokemon in a certain generation
    const pokeArr = await searchGeneration(searchInput.value);
    displayPokemonBulk(pokeArr);
});
