module.exports = function (grunt, projectOptions) {
    'use strict';

    const extend = require('extend');

    // Merge default options and project options
    const options = extend({
        // Configuration files to load
        // Relative to path.gruntConfig
        files: [],

        // Folder containing grunt configuration files
        gruntConfigFolder: 'grunt-config',

        // Path to package.json
        packageJsonPath: 'package.json'

    }, projectOptions);


    require('@lahautesociete/load-grunt-tasks')(grunt, {
        config: options.packageJsonPath,
        requireResolution: true
    });


    // Init grunt configuration
    grunt.config.merge({
        pkg: grunt.file.readJSON(options.packageJsonPath),
    });

    grunt.config.merge(options);


    grunt.log.subhead('Load configuration files : ');
    options.files.forEach(file => {
        // Read configuration file
        let currentConfiguration = require(process.cwd() + '/' + options.gruntConfigFolder + '/' + file + '.js')(grunt);
        currentConfiguration     = currentConfiguration || {};

        // Inject into grunt configuration
        grunt.config.merge(currentConfiguration);

        grunt.log.oklns('Loaded : ' + file);
    })

};
