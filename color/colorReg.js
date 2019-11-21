var ColorThief = require('color-thief');
var fs = require('fs');

var colorThief = new ColorThief();

var raspiPath ='../Pictures/image.jpg'

fs.readFile('japan.png', function (err, data) {
    if (err) throw err;
    var palette = colorThief.getPalette(data, 8)

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
    if(redCount > greenCount && redCount > blueCount){
        console.log("red");
    } else if(greenCount > redCount && greenCount > blueCount){
        console.log("green")
    } else if(blueCount > redCount && blueCount > greenCount){
        console.log("blue")
    }

})
