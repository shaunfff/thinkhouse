module.exports = function(grunt) {

  // Utility to load the different option files
  // based on their names
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option);
    });

    return object;
  }

  // Initial config
  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
	sass: {
	    dist: {
	        options: {
	            style: 'compressed'
	        },
	        files: {
	            'css/source/main.css': 'css/source/main.scss'
	        }
	    } 
	},  	
    concat: {
	    js: {
	        src: [
	            'js/libs/*.js', // All JS in the libs folder
	            'js/load.js'  // This specific file
	        ],
	        dest: 'js/build/production.js',
	    },
	    css: {
	        src: 'css/source/*.css', // All CSS in the source folder
	        dest: 'css/build/production.css',
	    }    	      
    },
    uglify: {
    	build: {
	        src: 'js/build/production.js',
        	dest: 'js/build/production.min.js'
    	}
	},
	postcss: {
		options: {
		  map: false, // inline sourcemaps
		  processors: [
		    require('pixrem')(), // add fallbacks for rem units
		    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
		    require('cssnano')() // minify the result
		  ]
		},
		dist: {
		  src: 'css/build/production.css',
	      dest: 'css/build/production.min.css',		  
		}
	},
	watch: {
	    scripts: {
		    files: ['js/*.js'],
	        tasks: ['concat', 'uglify'],
	        options: {
	            spawn: false,
				maxListeners: 99	            
	        },
	    }, 
		sass: {
		    files: ['css/source/**/*.scss'],
		    tasks: ['sass', 'concat', 'postcss'],
		    options: {
		        spawn: false,
				maxListeners: 99		        
		    }
		}  
	}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');      
  grunt.loadNpmTasks('grunt-contrib-cssmin');    
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-critical');  

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'postcss', 'watch']);
  
};