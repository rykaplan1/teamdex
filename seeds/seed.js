const sequelize = require('../config/connection');
const { User, Pokemon } = require('../models');

const userData = require('./userData.json');
const pokemonData = require('./pokemonData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Pokemon.bulkCreate(pokemonData);

  process.exit(0);
};

seedDatabase();
