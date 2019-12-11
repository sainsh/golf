const { StillCamera } = require("pi-camera-connect");
var colorReg = require('./colorReg');

const stillCamera = new StillCamera();

module.exports.takePicture = async () => {

    
 
    await stillCamera.takeImage().then(async (image) => {
     
        await fs.writeFileSync("still-image.jpg", image);

    });
    var color = await colorReg.findColor("still-image.jpg")

    return color
}