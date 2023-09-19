
var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
scanner.addListener('scan', function (content) {


  let data = content.split('"')


  console.log(data);
  // cdFicha = '239582987'

})


Instascan.Camera.getCameras()
  .then(function (cameras) {
    self.cameras = cameras;
      if (cameras.length > 0) {
        console.log(cameras);
        self.activeCameraId = cameras.id;
        self.scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
  }).catch(function (e) {
    console.error(e);
  });



