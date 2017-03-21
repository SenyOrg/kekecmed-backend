'use strict';

/**
 * Model configuration and booting
 *
 * @author Selcuk Kekec <skekec@kekecmed.com>
 * @version 0.1
 */

/**
 * IMPORTS
 */
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../../../src/config/database.json')[env];
var db        = {};
var Logger    = require('../../util/logger').default;

/**
 * Handle Environment
 */
if (config.use_env_variable) {
    var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/**
 * Locate models
 */
fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(function (file) {
    var model      = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

/**
 * Setting up model associations
 */
Object.keys(db).forEach(function (modelName) {
    // Check for 'associate' method in model
    if (db[modelName].options.classMethods.associate) {
        // Setup associations of model
        Logger.verbose('Setting up associations of ' + modelName);
        db[modelName].options.classMethods.associate(db);
    }
});

/**
 * Insert sequelize instance
 */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export Database
module.exports = db;
