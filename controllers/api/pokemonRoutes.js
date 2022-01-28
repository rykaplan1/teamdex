const router = require('express').Router();
const { User, Team, Pokemon } = require('../../models');

// GET for all pokemon logged into teams
router.get('/', async (req, res) => {
  try {
    const dbPokemonData = await Pokemon.findAll({ include: [{ model: Team }, { model: User, attributes: { exclude: 'password' } }] });
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

// GET for pokemon by id
router.get('/:id', async (req, res) => {
  try {
    const dbPokemonData = await Pokemon.findByPk(req.params.id, { include: [{ model: Team }, { model: User, attributes: { exclude: 'password' } }] });
    const pokemon = dbPokemonData.get({ plain: true });

    if (!pokemon) {
      res.status(404).json({ message: 'No pokemon found in with this id!' });
      return;
    };

    res.status(200).json(pokemon);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// Add pokemon
router.post('/', async (req, res) => {
  try {
    const newPokemon = await Pokemon.create()
  } catch (err) {

  }
})

module.exports = router;
