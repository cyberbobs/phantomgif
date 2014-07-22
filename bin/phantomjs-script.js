var system = require('system'),
    page = require('webpage').create();

function pad(num, size) {
    var s = String(num);
    while (s.length < size) { s = '0' + s; }
    return s;
}

if (system.args.length < 6 || system.args.length > 7) {
    console.log("Broken args");
    phantom.exit(1);
} else {
    // Parse args
    var address = system.args[1],
        targetDir = system.args[2],
        frameRate = parseInt(system.args[3]),
        range = system.args[4].split('..').map(Number),
        scale = parseFloat(system.args[5]),
        background;

    if (system.args.length === 7) {
        background = system.args[6];
    }

    page.open(address, function (status) {
        if (status === 'fail') { phantom.exit(1); }

        // Get root tag name (svg or html)
        var rootTag = page.evaluate(function () {
            return document.documentElement.tagName.toLowerCase();
        });

        // Set background color if necessary
        if (background) {
            page.evaluate(function (rootTag, color) {
                if (rootTag === 'svg') {
                    document.documentElement.setAttribute('style', 'background-color: ' + color + ';');
                } else {
                    document.body.bgColor = color;
                }
            }, rootTag, background);
        }

        // Determine the rendering rect basing on source type
        var sourceSize = page.evaluate(function (rootTag) {
            var element;
            if (rootTag === 'svg') {
                element = document.documentElement;
            } else {
                element = document.body.firstElementChild;
            }

            var size = { width: element.offsetWidth,
                         height: element.offsetHeight };

            return size;
        }, rootTag);

        page.viewportSize = { width: sourceSize.width * scale,
                              height: sourceSize.height * scale };
        page.zoomFactor = scale;

        console.log('Source size: ' + sourceSize.width + 'x' + sourceSize.height);
        console.log("Target size: " + page.viewportSize.width + 'x' + page.viewportSize.height);

        // Render frames
        var frameIndex = 0;
        window.setTimeout(function () {
            window.setInterval(function () {
                page.render(targetDir + "/render" + pad(range[0] + frameIndex, 4) + ".png");
                frameIndex++;

                if (frameIndex > range[1] - range[0]) {
                    phantom.exit();
                }
            }, 1000 / frameRate);
        }, range[0] * 1000 / frameRate);
    });
}
