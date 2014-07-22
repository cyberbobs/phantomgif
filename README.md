phantomgif
==========

SVG/CSS to GIF converter based on PhantomJS

Install
-------

Make sure you have installed the latest version of [node.js](http://nodejs.org)

```sh
npm install phantomgif -g
```

You will also need to install [imagemagick](http://imagemagick.org/) convert utility.

Usage
-----

    phantomgif [options] <file> [<target>]

The available options are:

```
    -h, --help            output usage information
    -V, --version         output the version number
    -r, --range <a>..<b>  [Required] Frames range (starting and ending frames for animation sequence)
    -z, --zoom <a>        Zoom level (defaults to 1)
    -f, --framerate <n>   Frame rate (defaults to 30 fps)
    -b, --background <c>  Background color
    -t, --transparent     Transform background color to transparent in resulting gif
```

Examples
--------

```sh
phantomgif https://jxnblk.github.io/loading/loading-bubbles.svg --range 0..33 -z 2 -b '#069' -t
```
