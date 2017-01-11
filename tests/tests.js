'use strict';

const grunt = require('grunt');
const loadGruntConfiguration = require('../tasks/load-grunt-configuration');


exports.styledown = {
    setUp: function (done) {
        done();
    },

    should_fail_when_file_not_exists: function (test) {
        test.expect(1);

        test.throws(function(){
            loadGruntConfiguration(grunt, {
                files: ['not_existing_file']
            });
        });

        test.done();
    },

    should_work_when_file_exists: function (test) {
        test.expect(1);

        test.doesNotThrow(function(){
            loadGruntConfiguration(grunt, {
                files: ['empty'],
                gruntConfigFolder: 'tests/fixtures/grunt-config'
            });
        });

        test.done();
    },

    should_work_when_no_file_to_load: function (test) {
        test.expect(1);

        test.doesNotThrow(function(){
            loadGruntConfiguration(grunt, {});
        });

        test.done();
    },

    should_inject_options_to_grunt_config: function (test) {
        test.expect(1);

        loadGruntConfiguration(grunt, {
            foo: 'bar'
        });

        test.equal(grunt.config('foo'), 'bar');
        test.done();
    },

    should_execute_config_file: function (test) {
        test.expect(1);

        loadGruntConfiguration(grunt, {
            files: ['inject-to-grunt'],
            gruntConfigFolder: 'tests/fixtures/grunt-config'
        });

        test.equal(grunt.TEST_INJECT, true);
        test.done();
    },


};