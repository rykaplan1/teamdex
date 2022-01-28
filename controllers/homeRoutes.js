const router = require('express').Router();
const { User, Team, Pokemon } = require('../models');

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
      order: 'upvotes DESC'
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

module.exports = router;
