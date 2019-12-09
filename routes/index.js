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
});
const path = require('path');
const MotionDetectionModule = require('pi-motion-detection');
const motionDetector = new MotionDetectionModule({
  captureDirectory: path.resolve(__dirname),
});

motionDetector.on('motion', () => {
  console.log('motion!');
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
});
 
motionDetector.on('error', (error) => {
  console.log(error);
});
 
motionDetector.watch();


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

module.exports = router;
