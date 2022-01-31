// List of pokemon
const dataList = document.getElementById('pokemon-list');
// List of games
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
    // Remove previous list data
    while (dataList.firstChild) {
        dataList.removeChild(dataList.firstChild);
    }
    // Create and append pokemon to the list
    pokemon.forEach(pokeName => {
        const listEntry = document.createElement('option');
        newName = pokeName.name.charAt(0).toUpperCase() + pokeName.name.slice(1);
        listEntry.value = newName;
        listEntry.innerHTML = newName;
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
}

// When a new game is selected, update the list of available pokemon
gameList.addEventListener('input', async (event) => {
    event.preventDefault();
    const pokeArr = await searchGeneration(gameList.options[selectedGame.selectedIndex].getAttribute('data-generation'));
    displayPokemonBulk(pokeArr);
})

// Populate the pokemon list once on page load with the default value of the game list (Red-Blue)
async function onPageLoad() {
    generateGamesList();
    const pokeArr = await searchGeneration(gameList.options[selectedGame.selectedIndex].getAttribute('data-generation'));
    displayPokemonBulk(pokeArr);
}

onPageLoad();