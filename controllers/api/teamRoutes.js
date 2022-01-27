const router = require('express').Router();
const { User, Team, Pokemon } = require('../../models');

// GET for all teams in db
router.get('/', async (req, res) => {
  try {
    const dbTeamData = await Team.findAll({ include: [{ model: User, attributes: { exclude: 'password' } }] });
    const teams = dbTeamData.map(team => team.get({ plain: true }));
    res.status(200).json(teams);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// GET for team by the teams id
router.get('/:id', async (req, res) => {
  try {
    const dbTeamData = await Team.findByPk(req.params.id, { include: [{ model: User, attributes: { exclude: 'password' } }] });
    const team = dbTeamData.get({ plain: true });
    res.status(200).json(team)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;
