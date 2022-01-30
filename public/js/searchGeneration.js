// Takes the user's input for which generation they want to pull from
const searchInput = document.getElementById('pokemon-search'); // Drop down list for generations
const searchBtn = document.getElementById('search-btn'); // Search/submit button for searching a generation
const dataList = document.getElementById('pokemon-list');
const gameList = document.getElementById('game-list');

const gameListData = [
    {
        name: 'Red-Blue',
        generation: 1
    },
    {
        name: 'Yellow',
        generation: 1
    },
    {
        name: 'Gold-Silver',
        generation: 2
    },
    {
        name: 'Crystal',
        generation: 2
    },
    {
        name: 'Ruby-Sapphire',
        generation: 3
    },
    {
        name: 'Emerald',
        generation: 3
    },
    {
        name: 'Firered-Leafgreen',
        generation: 3
    },
    {
        name: 'Diamond-Pearl',
        generation: 4
    },
    {
        name: 'Platinum',
        generation: 4
    },
    {
        name: 'Heartgold-Soulsilver',
        generation: 4
    },
    {
        name: 'Black-White',
        generation: 5
    },
    {
        name: 'Black 2-White 2',
        generation: 5
    },
    {
        name: 'X-Y',
        generation: 6
    },
    {
        name: 'Omeaga Ruby-Alpha Sapphire',
        generation: 6
    },
    {
        name: 'Sun-Moon',
        generation: 7
    },
    {
        name: 'Ultra Sun-Ultra Moon',
        generation: 7
    },
    {
        name: 'Sword-Shield',
        generation: 8
    }
]

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

// Generate list of games (data value for the generation)
const generateGamesList = function () {
    gameListData.forEach(game => {
        const listEntry = document.createElement('option');
        listEntry.innerHTML = game.name;
        listEntry.setAttribute('data-generation', game.generation);
        gameList.append(listEntry);
    });
    console.log(gameList);
}

// when 'search' is clicked search a generation and display the pokemon availible to that generation to the page in a scroll-able section
searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // take user input to search for pokemon in a certain generation
    const pokeArr = await searchGeneration(searchInput.value);
    displayPokemonBulk(pokeArr);
});

generateGamesList();
