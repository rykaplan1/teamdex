// Loads where the user can click on a specific pokemon from the list created by searchGeneration.js
const pokeListData = document.getElementById('pokemon-list');
const addPokemonBtn = document.getElementById('add-pokemon-btn');
const newTeamDisplay = document.getElementById('new-team-display');
const saveNewTeamBtn = document.getElementById('save-new-team');
const newTeamName = document.getElementById('new-team-name');
const selectedGame = document.getElementById('game-list');

const newTeam = [];

// search PokeAPI for the respective Pokemon
const searchForPokemon = async function (name) {
    const pokeURL = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    const response = await fetch(pokeURL);
    const pokeData = await response.json();
    return pokeData;
}

// Add pokemon to team template
const addToTeam = function (pokeObj) {
    // pull relevent data from pokemon object
    const newPokemon = {
        name: pokeObj.name.charAt(0).toUpperCase() + pokeObj.name.slice(1),
        type: pokeObj.types,
        sprite: pokeObj.sprites.front_default
    }
    // condensing dom traversal
    const currentTeamSlot = newTeamDisplay.children[newTeam.length];
    // Pokemon Name
    currentTeamSlot.children[0].innerHTML = newPokemon.name;
    // Types
    newPokemon.type.forEach(type => {
        const typeName = document.createElement('span');
        typeName.classList.add('card-text');
        const typeCapitilized = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
        typeName.classList.add(typeCapitilized);
        typeName.classList.add('type-text');
        typeName.innerHTML = typeCapitilized;
        currentTeamSlot.append(typeName);
    })
    // Sprite
    currentTeamSlot.children[1].setAttribute('src', newPokemon.sprite);
    currentTeamSlot.children[1].setAttribute('alt', newPokemon.name);
    newTeam.push(newPokemon);
}

// on clicking 'add to team' get the value of the datalist dropdown and fetch that pokemon's data, then display it in the team template
addPokemonBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // check if team is full
    if (newTeam.length >= 6) {
        alert('Team at capacity, max 6')
    } else {
        const pokemonObj = await searchForPokemon(pokeListData.value);
        addToTeam(pokemonObj);
    }
})

saveNewTeamBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    // save current pokemon to database
    const teamInfo = {
        team_name: newTeamName.value,
        game: selectedGame.value
    };
    // Post the team to the database (should return the team_ID)
    const postTeam = await fetch('/api/teams/', {
        method: 'POST',
        body: JSON.stringify(teamInfo),
        headers: { 'Content-Type': 'application/json' },
    });

    // console.log(postTeam);
    // const getTeam = await fetch('/api/teams/');
    // console.log(getTeam);

    // Post the pokemon to the database using the returned team_ID
    newTeam.forEach(pokemon => {
        let pokemonInfo;
        if(pokemon.type[1]) {
            pokemonInfo = {
                pokemon_name: pokemon.name,
                type_1: pokemon.type[0].type.name,
                type_2: pokemon.type[1].type.name,
                team_id: postTeam.id,
                sprite: pokemon.sprite
            }
        } else {
            pokemonInfo = {
                pokemon_name: pokemon.name,
                type_1: pokemon.type[0].type.name,
                team_id: postTeam.id,
                sprite: pokemon.sprite
            }
        }
        const postPokemon = fetch('/api/pokemon/', {
            method: 'POST',
            body: JSON.stringify(pokemonInfo),
            headers: { 'Content-Type': 'application/json' },
        });
    });

    // const getNewTeam = await fetch(`/api/teams/${postTeam.id}`, {
    //     method: 'GET'
    // });
    // console.log(getNewTeam);
})