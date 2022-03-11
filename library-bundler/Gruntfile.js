module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      options: {
        livereload: true, //default port @35729
      },
      files: [
        "dist/**.*",
        "docs/index.html",
        "docs/content/**/**.*",
        "docs/scripts/**.*",
        "docs/stylesheets/**.*",
      ],
      tasks: ["typedoc", "run", "jshint", "browserify", "sass"],
    },
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: "localhost",
          base: "./docs",
          livereload: true,
          open: true,
          keepalive: true,
        },
      },
    },
    typedoc: {
      build: {
        options: {
          mode: "modules",
          module: "commonjs",
          target: "es5",
          json: "docs/content/data/typedoc.lock.json",
          excludePrivate: true,
          stripInternal: true,
          name: "<%= pkg.name %>",
          includeVersion: "<%= pkg.version %>",
        },
        src: "src/modules/**.*",
      },
    },
    run: {
      options: {
        itterable: true,
      },
      target1: {
        args: ["docs/content/siderLinks/documentationLinks.builder.js"],
      },
      target2: {
        args: ["docs/content/siderLinks/generalLinks.builder.js"],
      },
      target3: {
        args: ["docs/content/siderContents/allCustomContent.builder.js"],
      },
      target4: {
        args: ["docs/content/siderContents/documentationContent.builder.js"],
      },
    },
    jshint: {
      files: ["docs/scripts/**.js"],
      options: {
        esversion: 6,
        globals: {
          jQuery: true,
        },
      },
    },
    browserify: {
      options: {
        watch: true,
        banner:
          "/*! \n<%= pkg.name %>\nv<%= pkg.version %>\n<%= pkg.license %>\nby <%= pkg.author %>\ncontributors <%= pkg.contributors %>\n<%= pkg.description %>\n<%= pkg.homepage %>\n */",
        transform: [["babelify", { presets: ["@babel/preset-env"] }]],
      },
      build: {
        src: "docs/scripts/index.js",
        dest: "docs/bundle/scripts/bundle.js",
      },
    },
    sass: {
      dist: {
        options: {
          style: "expanded",
        },
        files: {
          "docs/bundle/stylesheets/main.css": "docs/stylesheets/index.scss",
        },
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-typedoc");
  grunt.loadNpmTasks("grunt-run");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-contrib-sass");

  // Default task(s).
  grunt.registerTask("default", [
    "watch",
    "typedoc",
    "run",
    "jshint",
    "browserify",
    "sass",
    "connect",
  ]);
};
