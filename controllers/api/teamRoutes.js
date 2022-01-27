const router = require('express').Router();
// Change destructured object with whatever the model classes will be
const { Team, Pokemon } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const dbTeamData = await Team.findAll({ include: [{ model: User, attributes: { exclude: 'password' } }] });
    const teams = dbTeamData.map(team => team.get({ plain: true }));
    res.status(200).json(teams)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

module.exports = router;
