const sequelize = require("../bin/dbConnection");
const Trainees = require("./definitions/trainees");
const Instructors = require("./definitions/instructors");
const Requests = require("./definitions/requests");
const Projects = require("./definitions/projects");
const Teams = require("./definitions/teams");
const Tasks = require("./definitions/tasks");
const TeamMembers = require("./definitions/teamMembers");
const Sessions = require("./definitions/sessions");

const models = { Sessions, Trainees, Requests, Instructors, Projects, Teams, Tasks, TeamMembers };


Trainees.hasMany(TeamMembers, { foreignKey: 'traineeId', onDelete: "CASCADE" });
TeamMembers.belongsTo(Trainees, { foreignKey: 'traineeId', onDelete: "CASCADE" });

Instructors.hasMany(Projects, { foreignKey: 'instructorId', onDelete: "CASCADE" });
Projects.belongsTo(Instructors, { foreignKey: 'instructorId', onDelete: "CASCADE" });

Teams.hasMany(TeamMembers, { foreignKey: 'teamId', onDelete: "CASCADE" });
TeamMembers.belongsTo(Teams, { foreignKey: 'teamId', onDelete: "CASCADE" });

Projects.hasOne(Teams, { foreignKey: 'projectId', onDelete: "CASCADE" });
Teams.belongsTo(Projects, { foreignKey: 'projectId', onDelete: "CASCADE" });

// Assuming you have Trainees and Instructors models
// Assuming you have Trainees and Instructors models

// Assuming you have Trainees and Instructors models

Trainees.hasOne(Sessions, {
    foreignKey: 'traineeId', // Use traineeId as the foreign key for Trainees
    constraints: false,
    scope: {
        sessionType: 'trainee',
    },
    as: 'session',
    onDelete: 'CASCADE',
});

Instructors.hasOne(Sessions, {
    foreignKey: 'instructorId', // Use instructorId as the foreign key for Instructors
    constraints: false,
    scope: {
        sessionType: 'instructor',
    },
    as: 'session',
    onDelete: 'CASCADE',
});

Sessions.belongsTo(Trainees, {
    foreignKey: 'traineeId', // Use traineeId as the foreign key for Trainees
    constraints: false,
    as: 'traineeSession',
});

Sessions.belongsTo(Instructors, {
    foreignKey: 'instructorId', // Use instructorId as the foreign key for Instructors
    constraints: false,
    as: 'instructorSession',
});



Projects.hasMany(Tasks, { foreignKey: 'projectId', onDelete: "CASCADE" });
Tasks.belongsTo(Projects, { foreignKey: 'projectId', onDelete: "CASCADE" });

TeamMembers.hasMany(Tasks, { foreignKey: 'teamMemberId', onDelete: "CASCADE" });
Tasks.belongsTo(TeamMembers, { foreignKey: 'teamMemberId', onDelete: "CASCADE" });

Instructors.hasMany(Tasks, { foreignKey: 'instructorId', onDelete: "CASCADE" });
Tasks.belongsTo(Instructors, { foreignKey: 'instructorId', onDelete: "CASCADE" });

Instructors.hasMany(Teams, { foreignKey: 'instructorId' });
Teams.belongsTo(Instructors, { foreignKey: 'instructorId' });

Instructors.hasMany(Requests, { foreignKey: 'instructorId', onDelete: "CASCADE" });
Requests.belongsTo(Instructors, { foreignKey: 'instructorId', onDelete: "CASCADE" });

Trainees.hasMany(Requests, { foreignKey: 'traineeId', onDelete: "CASCADE" });
Requests.belongsTo(Trainees, { foreignKey: 'traineeId', onDelete: "CASCADE" });

Instructors.hasMany(Trainees, { foreignKey: 'instuctorId' });
Trainees.belongsTo(Instructors, { foreignKey: 'instuctorId' });
const db = {};

db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models }