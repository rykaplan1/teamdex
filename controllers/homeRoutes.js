const router = require('express').Router();
const { User, Team, Pokemon } = require('../models');
const withAuth = require('../utils/auth');

// GET homepage with top 10 teams
router.get('/', async (req, res) => {
  try {
    const topTenTeamData = await Team.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ],
      limit: 10,
      order: [['upvotes', 'DESC']]
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

// GET Dashboard if logged in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userTeamData = await Team.findAll([{
       where: { user_id: req.session.userId } }, { model: Pokemon }]);

    const user = userData.get({ plain: true });

    res.render('/dashboard', {
      ...user,
      logged_in: true
    });
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

  res.render('/login');
})

module.exports = router;
