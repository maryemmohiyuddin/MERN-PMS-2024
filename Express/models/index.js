const sequelize = require("../bin/dbConnection");
const Users = require("./definitions/users");
const Projects = require("./definitions/projects");
const Teams = require("./definitions/teams");
const Tasks = require("./definitions/tasks");
const TeamMembers = require("./definitions/teamMembers");
const Sessions = require("./definitions/sessions");




const models = { Sessions, Users, Projects, Teams, Tasks, TeamMembers };


Users.hasMany(TeamMembers, { foreignKey: 'userId' });
TeamMembers.belongsTo(Users, { foreignKey: 'userId' });

Teams.hasMany(TeamMembers, { foreignKey: 'teamId' });
TeamMembers.belongsTo(Teams, { foreignKey: 'teamId' });

Teams.hasOne(Projects, { foreignKey: 'teamId' });
Projects.belongsTo(Teams, { foreignKey: 'teamId' });

Users.hasOne(Sessions, { foreignKey: 'userId', onDelete: "CASCADE" });
Sessions.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE" });

Projects.hasMany(Tasks, { foreignKey: 'projectId' });
Tasks.belongsTo(Projects, { foreignKey: 'projectId' });

TeamMembers.hasMany(Tasks, { foreignKey: 'teamMemberId' });
Tasks.belongsTo(TeamMembers, { foreignKey: 'teamMemberId' });

Users.hasMany(Teams, { foreignKey: 'userId' });
Teams.belongsTo(Users, { foreignKey: 'userId' });

Users.hasMany(Users, {
    foreignKey: "instructorId",
    useJunctionTable: false,
});


const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models }