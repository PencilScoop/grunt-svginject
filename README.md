# grunt-SVGinject

> Compile a folder of SVG files into variables in a JavaScript file, ready for injection into HTML.

This plugin creates an SVG icon system by creating a JavaScript file for injecting inline SVG into HTML. For a detailed description on how JavaScript SVG injection works - see this article [here](http://www.pencilscoop.com/2014/04/injecting-svg-with-javascript/) 

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-svginject --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svginject');
```

### Overview
In your project's Gruntfile, add a section named `svginject` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  svginject: {
    all : {
      options: {},
      files: {
        //output : input],
      }
    }
  }
})
```

### Usage Examples

#### Default Options

```js
grunt.initConfig({
 svginject: {
    all : {
      options: {},
      files: {
         'dest/SVGinject.js': ['svgs/*.svg'],
      }
    }
  }
})
```
#### An example

Using the above config, let’s go through an example. Say the folder “svgs” contains 3 .SVG files - icon1.svg, icon2.svg and icon3.svg.

Those SVG files contain something this:
```html
<svg><circle fill="#EC008C" cx="46.921" cy="57.107" r="31.759"/></svg>
```
SVGinject will then create a single JavaScript file at “dest/SVGinject.js” with the following (including the comments and in this spaced format):

```js
document.addEventListener('DOMContentLoaded', function(){


// // SVG icon 1
var SVGicon1 = document.querySelectorAll('.svg-icon1');

for (i = 0; i < SVGicon1.length; ++i) {
SVGicon1[i].innerHTML = '<svg><circle fill="#EC008C" cx="46.921" cy="57.107" r="31.759"/></svg>';
}

// // SVG icon 2
var SVGicon2 = document.querySelectorAll('.svg-icon2');

for (i = 0; i < SVGicon2.length; ++i) {
SVGicon2[i].innerHTML = '<svg><circle fill="#EC008C" cx="46.921" cy="57.107" r="31.759"/></svg>';
}

// SVG icon 3
var SVGicon3 = document.querySelectorAll('.svg-icon3');

for (i = 0; i < SVGicon3.length; ++i) {
SVGicon3[i].innerHTML = '<svg><circle fill="#EC008C" cx="46.921" cy="57.107" r="31.759"/></svg>';
}


});
```

To include those SVGs in HTML, all you would do is this:

```html
<span class="svg-icon1"></span>
<span class="svg-icon2"></span>
<span class="svg-icon3"></span>
```

Inline SVG markup will then be appended to those elements. So if the script is included in that document, the above would result in this:

```html
<span class="svg-icon1"><svg><circle fill="#EC008C" cx="46.921" cy="57.107" r="31.759"/></svg></span>
<span class="svg-icon2"><svg><circle fill="#EC008C" cx="46.921" cy="57.107" r="31.759"/></svg></span>
<span class="svg-icon3"><svg><circle fill="#EC008C" cx="46.921" cy="57.107" r="31.759"/></svg></span>
```

Note that it supports multiple classes so the below would also work :

```html
<span class="svg-icon1"></span>
<span class="svg-icon1"></span>
<span class="svg-icon1"></span>

```


### Usage Notes

The plugin will automatically minify all SVGs. This is handled when building the injection functions, so origional SVG files remain unchanged.

It will also replace any single-quotation <code> ' ' </code> marks with double-quotation marks <code>" "</code>. This is because they are placed inside single quote marks in the JavaScript out. Again this handled when the injection function is built - origional SVG files will remain unchanged.

The class names are named by the file-name with the prefix <code>svg-</code>. So a source-file named "icon1.svg" will be inserted into any class named <code>svg-icon1</code>.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
### v0.0.2 - Minor Improvements

- Added function to auto-minify of SVG files.
- Added function to auto-replace quote marks of SVG files.
- Inject compiles result for injection.
