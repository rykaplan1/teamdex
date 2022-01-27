const User = require('./User');
const Team = require('./Team');
const Pokemon = require('./Pokemon');

User.hasMany(Team, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Team.belongsTo(User, {
  foreignKey: 'user_id'
})

Team.hasMany(Pokemon, {
  foreignKey: 'team_id',
  onDelete: 'CASCADE'
})

Pokemon.belongsTo(Team, {
  foreignKey: 'team_id'
});

module.exports = { User, Team, Pokemon };
