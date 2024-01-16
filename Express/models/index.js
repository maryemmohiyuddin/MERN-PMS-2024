const sequelize = require("../bin/dbConnection");
const Users = require("./definitions/users");
const Projects = require("./definitions/projects");
const Teams = require("./definitions/teams");
const Tasks = require("./definitions/tasks");
const TeamMembers = require("./definitions/teamMembers");
const Sessions = require("./definitions/sessions");




const models = { Sessions, Users, Projects, Teams, Tasks, TeamMembers };


Users.hasMany(TeamMembers, { foreignKey: 'userId', onDelete: "CASCADE" });
TeamMembers.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE" });

Users.hasMany(Projects, { foreignKey: 'instructorId', onDelete: "CASCADE" });
Projects.belongsTo(Users, { foreignKey: 'instructorId', onDelete: "CASCADE" });

Teams.hasMany(TeamMembers, { foreignKey: 'teamId', onDelete: "CASCADE" });
TeamMembers.belongsTo(Teams, { foreignKey: 'teamId', onDelete: "CASCADE" });

Projects.hasOne(Teams, { foreignKey: 'projectId', onDelete: "CASCADE" });
Teams.belongsTo(Projects, { foreignKey: 'projectId', onDelete: "CASCADE" });

Users.hasOne(Sessions, { foreignKey: 'userId', onDelete: "CASCADE" });
Sessions.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE" });

Projects.hasMany(Tasks, { foreignKey: 'projectId', onDelete: "CASCADE" });
Tasks.belongsTo(Projects, { foreignKey: 'projectId', onDelete: "CASCADE" });

TeamMembers.hasMany(Tasks, { foreignKey: 'teamMemberId', onDelete: "CASCADE" });
Tasks.belongsTo(TeamMembers, { foreignKey: 'teamMemberId', onDelete: "CASCADE" });

Users.hasMany(Teams, { foreignKey: 'teamLeader', onDelete: "CASCADE" });
Teams.belongsTo(Users, { foreignKey: 'teamLeader', onDelete: "CASCADE" });


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