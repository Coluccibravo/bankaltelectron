const nomedousuario = document.getElementById('nomeDeUsuario');
const nomeCompleto = document.getElementById('nomeCompleto');
const idade = document.getElementById('idade');
const dataNascimentoCampo = document.getElementById('dataNascimentoCampo');
const cargo1 = document.getElementById('cargo1');
const email1 = document.getElementById('email');
const params = new URLSearchParams(window.location.search);
const aa1 = params.get("nome");
const aa2 = params.get("idade");
let datausername = "";

window.addEventListener('DOMContentLoaded', () => {
  if (!aa1 || !aa2) {
    console.error('Parâmetros nome ou idade não encontrados na URL.');
    return;
  }

  fetch(`http://localhost:8080/apiFuncionario/login/${aa1}/${aa2}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
      datausername = data.username;
      // Log para verificar o valor de datausername
      // Verifica se os dados retornados têm as chaves necessárias
      if (data.username && data.nome && data.cargo && data.email) {
        nomedousuario.textContent = data.username;
        nomeCompleto.textContent = data.nome;

        // Verifique se a data de nascimento não é null
        if (data.dataNascimento1) {
          // Função para calcular a idade
          function calcularIdade(dataNascimento) {
            const partesData = dataNascimento.split('/');
            const nascimento = new Date(partesData[2], partesData[1] - 1, partesData[0]);
            const hoje = new Date();
            let idade1 = hoje.getFullYear() - nascimento.getFullYear();
            const mesAtual = hoje.getMonth();
            const mesNascimento = nascimento.getMonth();
            const diaAtual = hoje.getDate();
            const diaNascimento = nascimento.getDate();
            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
              idade1--;
            }
            return idade1.toString();
          }

          idade.textContent = calcularIdade(data.dataNascimento1) + " Anos";
          dataNascimentoCampo.textContent = data.dataNascimento1;
        } else {
          idade.textContent = "Data de nascimento não disponível";
          dataNascimentoCampo.textContent = "Data não informada";
        }

        cargo1.textContent = data.cargo;
        email1.textContent = data.email;
      } else {
        console.error('Dados incompletos retornados:', data);
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar funcionários:', error);
    });
});


document.getElementById('btndeletaccout').addEventListener("click", () => {
  window.location.href = "deletaccount.html";
})

document.getElementById('attinfo').addEventListener("click", ()=> {
  const url = "atualizar.html?nome=" + encodeURIComponent(datausername);
            
  window.location.href = url;
})