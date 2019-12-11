const { getPaletteFromURL  } = require('color-thief-node');
var fs = require('fs');


module.exports.findColor = async (path) => {

    var color = "";
    var palette = await getPaletteFromURL(path);

    var redCount = 0;
    var greenCount = 0;
    var blueCount = 0;

    console.log(palette)
    for (var i = 0; i < palette.length; i++) {
        var color = palette[i];
        redCount += color[0];
        greenCount += color[1];
        blueCount += color[2]

    }
    redCount /= 5;
    greenCount /= 5;
    blueCount /= 5;

    console.log(`red: ${redCount}. green: ${greenCount}. blue: ${blueCount}.`)
    if (redCount > greenCount && redCount > blueCount) {
        console.log("red");
        color = "red";
    } else if (greenCount > redCount && greenCount > blueCount) {
        console.log("green")
        color = "green";
    } else if (blueCount > redCount && blueCount > greenCount) {
        console.log("blue")
        color = "blue";
    }

    return color;

}