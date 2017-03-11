var imageGrayScale = require('image-grayscale');

var fs = require('fs');

var readStream = fs.createReadStream('./images/alpha.png');

imageGrayScale(readStream, {
  logProgress: 1
})
  .then(() => {
    console.log('finish');
  })
  .catch(err => {
    if (err) console.log(err);
  });
