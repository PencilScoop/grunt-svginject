/*
 * grunt-svginject
 * https://github.com/PencilScoop/grunt-SVGinject
 *
 * Copyright (c) 2014 Joe Howard
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {

  grunt.registerMultiTask('svginject', 'Compile SVG to JS file', function () {
    var options = this.options({
      namespace: "document.addEventListener('DOMContentLoaded', function(){" + "\n\n",
      processContent: function (src) {
        return src;
      },
      processName: function (name) {
        return name;
      }
    });
    var processName = options.processName || function (name) { return name; };
    var escaper = /\\|'|\r|\n|\t/g;
    var escapes = {
      "'": '"',
      '\\': '\\',
      '\r': ' ',
      '\n': ' ',
      '\t': ' '
    };
    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function (f) {
      var output = f.src.filter(function (filepath) {
        var exists = grunt.file.exists(filepath);
        if (!exists) {
          grunt.log.warn('File "' + filepath + '" not found.');
        }
        return exists;
      })
      .map(function (filepath) {
        var src = options.processContent(grunt.file.read(filepath));
        var compiled = src.replace(escaper, function (match) {
          return escapes[match];
        });

        var filename = processName(filepath);
        var theFile = filename.match(/\/([^/]*)$/)[1];
        var variableName = theFile.slice(0, -4);

        return  "// SVG " + variableName + "\n" + "var SVG" + variableName + " = document.querySelectorAll('.svg-" + variableName + "');" + "\n\n" + "for (i = 0; i < SVG"+ variableName +".length; ++i) {" + "\n" + "SVG"+variableName+"[i].innerHTML = '" + compiled + "';" + "\n}" + "\n\n";
      });

      output.unshift(options.namespace);
      output.push('});');

      grunt.file.write(f.dest, output.join(grunt.util.normalizelf(grunt.util.linefeed)));
      grunt.log.writeln('File "' + f.dest + '" created.');

    });

  });
};
