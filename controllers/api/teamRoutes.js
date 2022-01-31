const router = require('express').Router();
const { User, Team, Pokemon } = require('../../models');
const withAuth = require('../../utils/auth');

// GET for all teams in db
router.get('/', async (req, res) => {
  try {
    const dbTeamData = await Team.findAll({ include: [{ model: User, attributes: { exclude: 'password' } }, { model: Pokemon }] });
    const teams = dbTeamData.map(team => team.get({ plain: true }));

    if (!teams) {
      res.status(404).json({ message: 'No team found in the database!' });
      return;
    };

    res.status(200).json(teams);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// GET for team by the teams id
router.get('/:id', async (req, res) => {
  try {
    const dbTeamData = await Team.findByPk(req.params.id, { include: [{ model: User, attributes: { exclude: 'password' } }, { model: Pokemon }] });
    const team = dbTeamData.get({ plain: true });

    if (!team) {
      res.status(404).json({ message: 'No team found with this id!' });
      return;
    };

    res.status(200).json(team);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// GET for team by logged in user
router.get('/my_teams/', withAuth, async (req, res) => {
  try {
    const dbTeamData = await Team.findAll({ where: { user_id: req.session.id }, include: { model: Pokemon } });
    const teams = dbTeamData.map(team => team.get({ plain: true }));

    if (!teams) {
      res.status(404).json({ message: 'No team found in the database!' });
      return;
    };

    res.status(200).json(teams);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// POST for user to add team
router.post('/', withAuth, async (req, res) => {
  try {
    const newTeam = await Team.create({
      team_name: req.body.team_name,
      game: req.body.game,
      user_id: req.session.userId
    });

    res.status(200).json(newTeam);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// PUT for updating a team
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedTeam = await Team.update({
      team_name: req.body.team_name
    },
      {
        where: {
          id: req.params.id,

          user_id: req.session.user_id,
        }
      });

    if (!updatedTeam) {
      res.status(404).json({ message: 'No team found with this id!' });
      return;
    };

    res.status(200).json(updatedTeam);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// DELETE for removing a team
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const team = await Team.destroy({
      where: {
        id: req.params.id,

        user_id: req.session.user_id,
      }
    });

    if (!team) {
      res.status(404).json({ message: 'No team found with this id!' });
      return;
    };

    res.status(200).json(team);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
