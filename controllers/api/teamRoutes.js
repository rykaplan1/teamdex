const router = require('express').Router();
const { User, Team, Pokemon } = require('../../models');

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

    res.status(200).json(team)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// GET for team by logged in user
// route for testing in insomnia
router.get('/my_teams', async (req, res) => {
  // route for deployment
  // router.get('/my_teams', async (req, res) => {
  try {
    // variable for testing insomnia
    const dbTeamData = await Team.findAll([{ where: { user_id: req.session.userId } }, { model: Pokemon }]);
    // variable for deployment
    // const dbTeamData = await Team.findAll([{ where: { user_id: req.session.userId } }, { model: Pokemon }]);
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
// TODO: Add withAuth after testing with insomnia
router.post('/', async (req, res) => {
  try {
    const newTeam = await Team.create({
      team_name: req.body.team_name,
      game: req.body.game,
      user_id: req.session.userId,
      pokemon_ids: req.body.pokemon_ids
    });
    res.status(200).json(newTeam);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// PUT for updating a team
// TODO: Add withAuth after testing with insomnia
router.put('/:id', async (req, res) => {
  try {
    const updatedTeam = await Team.update({
      team_name: req.body.team_name,
      pokemon_ids: req.body.pokemon_ids
    }, { where: { id: req.params.id } });

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
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.destroy({
      where: {
        id: req.params.id,

        // TODO: Commented out for testing, uncomment for final testing and deployment
        // user_id: req.session.user_id,
      },
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
