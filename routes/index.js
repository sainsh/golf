var express = require('express');
var router = express.Router();
var colorReg = require('../public/javascripts/colorReg');
var multer = require('multer');
var upload = multer({
  dest: '../tmp',
});
var fs = require('fs')
const PiCamera = require('pi-camera');
const myCamera = new PiCamera({
  mode: 'photo',
  output: `${ __dirname }/test.jpg`,
  width: 640,
  height: 480,
  nopreview: true,
});/*
var PiMotion = require('node-pi-motion');

var options = {
  throttle: 10000
}

var nodePiMotion = new PiMotion(options);

nodePiMotion.on('DetectedMotion', async function() {
  console.log('Motion detected! Now do something.');
  console.log("taking picture")
  await  myCamera.snap()
  .then(async(result) => {
    console.log("picture taken");
    var color = await colorReg.findColor(__dirname + '/test.jpg');
    console.log(color);
    fs.unlinkSync(__dirname + '/test.jpg');
    if(color == "red")ledRed.digitalWrite(1)
    if(color == "green")ledGreen.digitalWrite(1)
    if(color == "blue")ledBlue.digitalWrite(1)
  })
  .catch((error) => {
     // Handle your error
  });
});

var Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO
ledRed = new Gpio(4, {mode: Gpio.OUTPUT}), //use GPIO pin 4 as output for RED
ledGreen = new Gpio(17, {mode: Gpio.OUTPUT}), //use GPIO pin 17 as output for GREEN
ledBlue = new Gpio(27, {mode: Gpio.OUTPUT}), //use GPIO pin 27 as output for BLUE
redRGB = 0, //set starting value of RED variable to off (0 for common cathode)
greenRGB = 0, //set starting value of GREEN variable to off (0 for common cathode)
blueRGB = 0; //set starting value of BLUE variable to off (0 for common cathode)

//RESET RGB LED
ledRed.digitalWrite(0); // Turn RED LED off
ledGreen.digitalWrite(0); // Turn GREEN LED off
ledBlue.digitalWrite(0); // Turn BLUE LED off

*/
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'ColorReg' });
});

router.post('/', upload.single('pic'), async (req, res, next) => {
  var color = await colorReg.findColor(req.file.path)
  fs.unlinkSync(req.file.path);
  res.render('index', { title: 'ColorReg', color: color });
})

router.post('/pic/', async (req,res,next) =>{
  myCamera.snap()
  .then(async(result) => {
    var color = await colorReg.findColor(__dirname + '/test.jpg');
    console.log(color);
    fs.unlinkSync(__dirname + '/test.jpg');
    res.render('index', {title: 'ColorReg', color: color})
  })
  .catch((error) => {
     // Handle your error
  });
})

process.on('SIGINT', function () { //on ctrl+c
  ledRed.digitalWrite(0); // Turn RED LED off
  ledGreen.digitalWrite(0); // Turn GREEN LED off
  ledBlue.digitalWrite(0); // Turn BLUE LED off
  process.exit(); //exit completely
});

module.exports = router;

