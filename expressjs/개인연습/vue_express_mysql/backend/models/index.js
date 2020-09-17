/*** models/index.js ***/

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db 객체에 User 및 Comment 모델을 담아둠
// db 객체를 require하여 User 및 Comment 모델에 접근할 수 있음.
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

/* user -> comment: 1 -> N */
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
/* comment -> user: N -> 1 */
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});

module.exports = db;