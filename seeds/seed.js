const sequelize = require('../config/connection');
const { User, Pokemon, Team } = require('../models');

const userData = require('./userData.json');
const teamData = require('./teamData.json');
const pokemonData = require('./pokemonData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Team.create({
    ...teamData[0],
    user_id: 1,
    pokemon_ids: "[1, 2]"
  });

  for (let i = 0; i < 2; i++) {
    await Pokemon.create({
      ...pokemonData[i],
      team_id: 1,
    });
  }

  await Team.create({
    ...teamData[1],
    user_id: 3,
    pokemon_ids: "[3, 4]"
  });

  for (let i = 2; i < 4; i++) {
    await Pokemon.create({
      ...pokemonData[i],
      team_id: 2
    });
  }

  for (let i = 2; i < teamData.length; i++) {
    const pokemonIds = [];
    for (let j = 0; j < 6; j++) {
      pokemonIds.push(3 + 6 * (i - 2) + j);
    }
    await Team.create({
      ...teamData[i],
      user_id: 3,
      pokemon_ids: JSON.stringify(pokemonIds)
    })
  }

  let addedPokemon = 0;
  let ashTeamId = 3;
  for (let i = 4; i < pokemonData.length; i++) {
    await Pokemon.create({
      ...pokemonData[i],
      team_id: ashTeamId
    })
    addedPokemon++;

    if (addedPokemon === 6) {
      addedPokemon = 0;
      ashTeamId++;
    }
  }

  process.exit(0);
};

seedDatabase();
