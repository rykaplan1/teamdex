const sequelize = require('../config/connection');
const { User, Pokemon, Team } = require('../models');

const userData = require('./userData.json');
const teamData = require('./teamData.json');
const pokemonData = require('./pokemonData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (let i = 0; i < 3; i++) {
    await User.create({
      ...userData[i]
    });
  }

  await Team.create({
    ...teamData[0],
    user_id: 1,
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
  });

  for (let i = 2; i < 4; i++) {
    await Pokemon.create({
      ...pokemonData[i],
      team_id: 2
    });
  }

  for (let i = 2; i < teamData.length; i++) {
    await Team.create({
      ...teamData[i],
      user_id: 2,
    });
  }

  let addedPokemon = 0;
  let ashTeamId = 3;
  for (let i = 4; i < pokemonData.length; i++) {
    console.log(i);
    console.log(ashTeamId);
    await Pokemon.create({
      ...pokemonData[i],
      team_id: ashTeamId
    });
    addedPokemon++;
    console.log(addedPokemon);
    if (addedPokemon === 6) {
      addedPokemon = 0;
      ashTeamId++;
    }
  }

  process.exit(0);
};

seedDatabase();
