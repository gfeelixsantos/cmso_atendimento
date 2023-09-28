const empresa = document.querySelector('#cdEmpresa')
const cpf = document.querySelector('#cpfFuncionario')
const ficha = document.querySelector('#cdFicha')

const idSenha = document.querySelector('#idSenha')
const numSenha = document.querySelector('#numSenha')

const btnEnviar = document.querySelector('#btnEnviar')
const btnReset = document.querySelector('#btnReset')


var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
scanner.addListener('scan', function (content) {


  let data = content.split('"')

  let cdEmpresa = data[3]
  let cpfFuncionario = data[7]
  let cdFicha = '239582987'  // Alterar para código sequencial da Ficha Clínica
  
  empresa.setAttribute('value', cdEmpresa)
  ficha.setAttribute('value', cdFicha)
  cpf.setAttribute('value', cpfFuncionario)

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


// Enviando o formulário
btnEnviar.addEventListener('click', () => {
  if (empresa.value, ficha.value, cpf.value, numSenha.value != ""){
    window.alert('✔ ATENDIMENTO ENVIADO')
  } else {
    alert('⚠ ATENÇÃO, VERIFIQUE OS CAMPOS !')
  }
})



// Limpando campos do formulário
btnReset.addEventListener('click', () => {
  
  empresa.removeAttribute('value')
  ficha.removeAttribute('value')
  cpf.removeAttribute('value')

})





