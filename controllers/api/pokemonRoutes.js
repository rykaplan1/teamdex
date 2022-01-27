const router = require('express').Router();
const { User, Team, Pokemon } = require('../../models');

// GET for all pokemon in the user's teams
router.get('/', async (req, res) => {
  try {
    const dbPokemonData = await Pokemon.findAll({ include: { model: Team } });
    const pokemon = dbPokemonData.map(pokemon => pokemon.get({ plain: true }));

    if (!pokemon) {
      res.status(404).json({ message: 'No pokemon found in the database!' });
      return;
    };

    res.status(200).json(pokemon);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;
