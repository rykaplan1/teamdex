const router = require('express').Router();
const { User, Team, Pokemon } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage with 10 newest teams
router.get('/', async (req, res) => {
  try {
    const topTenTeamData = await Team.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Pokemon,
          attributes: ['pokemon_name', 'sprite']
        }
      ],
      limit: 10,
      order: [['created_at', 'DESC']]
    });

    const topTenTeams = topTenTeamData.map((team) => team.get({ plain: true }));

    res.render('homepage', {
      topTenTeams,
      logged_in: req.session.loggedIn
    })

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET page for specific top 10 team
router.get('/top-team/:id', async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id, { include: [{ model: User, attributes: { exclude: 'password' } }, { model: Pokemon }] });
    const team = teamData.get({ plain: true });

    if (!team) {
      res.status(404).json({ message: 'No team found with this id!' });
      return;
    };

    res.render('userteam', {
      ...team,
      logged_in: req.session.loggedIn
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET team creation page
router.get('/create-team', async (req, res) => {
  const { game } = req.body;
  
  res.render('createteam', {
    game,
    logged_in: true
  });
});

// GET Dashboard if logged in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userTeamData = await Team.findAll({
       include: [{ model: Pokemon }],
       where: { user_id: req.session.userId } 
    });

    const userTeams = userTeamData.map((team) => team.get({ plain: true }));

    res.render('dashboard', {
      userTeams,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET specific team from dashboard
router.get('/dashboard/team/:id', async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id, { include: [{ model: User, attributes: { exclude: 'password' } }, { model: Pokemon }] });
    const team = teamData.get({ plain: true });
  
    res.render('userteam', {
      ...team,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Login Page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// GET Signup Page
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
})

module.exports = router;

