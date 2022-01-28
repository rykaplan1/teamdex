const router = require('express').Router();
const { User, Team, Pokemon } = require('../../models');

// GET for all pokemon logged into teams
router.get('/', async (req, res) => {
  try {
    const dbPokemonData = await Pokemon.findAll({ include: { model: Team, include: { model: User, attributes: { exclude: 'password' } } } });
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
    const dbPokemonData = await Pokemon.findByPk(req.params.id, { include: { model: Team, include: { model: User, attributes: { exclude: 'password' } } } });
    const pokemon = dbPokemonData.get({ plain: true });

    if (!pokemon) {
      res.status(404).json({ message: 'No pokemon found with this id!' });
      return;
    };

    res.status(200).json(pokemon);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// Add pokemon
// TODO: Add withAuth after testing with insomnia
router.post('/', async (req, res) => {
  try {
    const newPokemon = await Pokemon.create({
      pokemon_name: req.body.pokemon_name,
      type_1: req.body.type_1,
      type_2: req.body.type_2,
      team_id: req.body.team_id,
      sprite: req.body.sprite
    });

    res.status(200).json(newPokemon);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// Edit pokemon
// TODO: Add withAuth after testing with insomnia
router.put('/:id', async (req, res) => {
  try {
    const updatedPokemon = await Pokemon.update({
      type_1: req.body.type_1,
      type_2: req.body.type_2
    },
    {
      where: {
        id: req.params.id,

        // TODO: Commented out for testing, uncomment for final testing and deployment
        // user_id: req.session.user_id
      }
    });

    if (!updatedPokemon) {
      res.status(404).json({ message: 'No pokemon found with this id!' });
      return;
    };
    res.status(200).json(updatedPokemon);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// Delete pokemon
// TODO: Add withAuth after testing with insomnia
router.delete('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.destroy({
      where: {
        id: req.params.id,

        // TODO: Commented out for testing, uncomment for final testing and deployment
        // user_id: req.session.user_id,
      }
    });

    if (!pokemon) {
      res.status(404).json({ message: 'No pokemon found with this id!' });
      return;
    };

    res.status(200).json(pokemon);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
