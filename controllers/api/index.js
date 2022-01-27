const router = require('express').Router();
const userRoutes = require('./userRoutes');
const teamRoutes = require('./teamRoutes');
const pokemonRoutes = require('./pokemonRoutes');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/pokemon', pokemonRoutes);

module.exports = router;
