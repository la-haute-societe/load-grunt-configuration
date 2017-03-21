# load-grunt-configuration

Load multiple grunt configuration files


## Installation

`npm install load-grunt-configuration --save-dev`


## Example

### Gruntfile.js
```js
module.exports = function (grunt) {
    'use strict';

   require('load-grunt-configuration')(grunt, {
        files: [
            '_tasks',
            'styles',
            //...
        ],
        otherOptions: {
            foo: 'bar'            
        }
    });
};
```

### grunt-config/_tasks.js
```js
module.exports = function (grunt) {
    'use strict';

    grunt.registerTask('dev', [
        'styles',
    ]);

    grunt.registerTask('default', [
        'dev',
        'watch'
    ]);

};
```

### grunt-config/styles.js
```js
module.exports = function (grunt) {
    'use strict';

    // Task
    grunt.registerTask('styles', [
        'less:dev',
        'autoprefixer:dev'
    ]);

    // Config
    return {
        autoprefixer: {
            // ...
        },
        less: {
            // ...
        },
        watch: {
            // ...
        }
    };
};
```

## Options

```
require('load-grunt-configuration')(grunt, options);
```

### Package configuration

#### files
List of configuration files to load. Relative to `gruntConfigFolder`. Without '.js' extension.

Example:

```
[
    '_tasks',
    'styles'
]
```

#### gruntConfigFolder
Folder containing grunt configuration `files` to load.

Default : 'grunt-config'


#### packageJsonPath
Path to `package.json` file.

Default : 'package.json'


### Project configuration
```options``` object is merged into grunt.config.

#### Example

```
require('load-grunt-configuration')(grunt, {
    files : ['example'],
    path: {
        src: './src'
    }
}});
```

Read ``src`` value : 
```
<%= path.src %>
```


## Development

### Tests

Run tests
```
grunt test
```