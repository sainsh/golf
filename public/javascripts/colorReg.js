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
        if (color[0] > color[1] && color[0] > color[2]) {
            redCount++;
        } else if (color[1] > color[0] && color[1] > color[2]) {
            greenCount++;
        } else if (color[2] > color[0] && color[2] > color[1]) {
            blueCount++;
        }

    }
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