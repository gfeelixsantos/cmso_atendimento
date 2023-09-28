//Funcionario
const idEmpresa = document.querySelector('#empresa')
const idCpf = document.querySelector('#cpf')
const idFicha = document.querySelector('#ficha')

// Senha
const idSenha = document.querySelector('#idSenha')
const numSenha = document.querySelector('#numSenha')

// Botoes
const btnEnviar = document.querySelector('#btnEnviar')
const btnReset = document.querySelector('#btnReset')

// Camera
const videoElement = document.getElementById('preview');

// Inicializa o leitor de QR Code
const scanner = new Instascan.Scanner({ video: videoElement });
scanner.addListener('scan', function (content) {
    
  let data = content.split('"')

  console.log(data);
  let empresa = data[3]
  let cpf = data[7]
  let ficha = data[11]  // Alterar para código sequencial da Ficha Clínica
  
  idEmpresa.setAttribute('value', empresa)
  idCpf.setAttribute('value', cpf)
  idFicha.setAttribute('value', ficha)
  

});

// Inicializa a câmera
Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('Nenhuma câmera encontrada.');
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