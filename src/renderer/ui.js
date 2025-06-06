const nomedousuario = document.getElementById('nomeDeUsuario');
const nomeCompleto = document.getElementById('nomeCompleto');
const idade = document.getElementById('idade');
let idade1;
const index = 0;
const dataNascimentoCampo = document.getElementById('dataNascimentoCampo');
const cargo1 = document.getElementById('cargo1');
const email1 = document.getElementById('email');

window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:8080/apiFuncionario/todos')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status)
      }
      return response.json()
    })
    .then((data) => {
      console.log(data);
      nomedousuario.textContent = data[index].username
      nomeCompleto.textContent = data[index].nome
      function calcularIdade(dataNascimento) {
        const partesData = dataNascimento.split('/');
        const nascimento = new Date(partesData[2], partesData[1] - 1, partesData[0]);
        const hoje = new Date();
        idade1 = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = nascimento.getMonth();
        const diaAtual = hoje.getDate();
        const diaNascimento = nascimento.getDate();
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
          idade1--;
        }
        
        return idade1.toString();
      }
      calcularIdade(data[index].dataNascimento1);
      idade.textContent = idade1 + " " + "Anos";
      dataNascimentoCampo.textContent = data[index].dataNascimento1;
      cargo1.textContent = data[index].cargo;
      email1.textContent = data[index].email;
    })
    .catch((error) => {
      console.error('Erro ao buscar funcionários:', error)
    })

})