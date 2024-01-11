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

Users.hasMany(Projects, { foreignKey: 'instructorId' });
Projects.belongsTo(Users, { foreignKey: 'instructorId' });

Teams.hasMany(TeamMembers, { foreignKey: 'teamId' });
TeamMembers.belongsTo(Teams, { foreignKey: 'teamId' });

Projects.hasOne(Teams, { foreignKey: 'projectId' });
Teams.belongsTo(Projects, { foreignKey: 'projectId' });

Users.hasOne(Sessions, { foreignKey: 'userId', onDelete: "CASCADE" });
Sessions.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE" });

Projects.hasMany(Tasks, { foreignKey: 'projectId' });
Tasks.belongsTo(Projects, { foreignKey: 'projectId' });

TeamMembers.hasMany(Tasks, { foreignKey: 'teamMemberId' });
Tasks.belongsTo(TeamMembers, { foreignKey: 'teamMemberId' });

Users.hasMany(Teams, { foreignKey: 'teamLeader' });
Teams.belongsTo(Users, { foreignKey: 'teamLeader' });


Users.hasMany(Teams, { foreignKey: 'instructorId' });
Teams.belongsTo(Users, { foreignKey: 'instructorId' });

Users.hasMany(Users, {
    foreignKey: "instructorId",
    useJunctionTable: false,
});


const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models }