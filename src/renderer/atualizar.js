const params = new URLSearchParams(window.location.search);
const aa1 = params.get("nome"); 
const nome = document.getElementById('inputnome');
const cpf = document.getElementById('inputcpf');
const cargo = document.getElementById('inputcargo');
const username = document.getElementById("inputusername");
const email = document.getElementById("inputemail");
const dataNascimento1 = document.getElementById("inputdatanascimento1");
const inputsenha1 = document.getElementById("senha1");
const inputsenha2 = document.getElementById("senha2");
let idUser;
// let dataNascimentoInformada = dataNascimento1.value;

window.addEventListener('DOMContentLoaded', () => {
  //if (!aa1) {
  //  console.error('Parâmetros nome ou idade não encontrados na URL.');
  //  return;
  // }

  fetch('http://localhost:8080/apiFuncionario/buscarParaCadastroUsername/' + aa1)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json();
      
    })
    .then((data) => {
        nome.value = data.nome;
        cpf.value = data.cpf;
        cargo.value = data.cargo   
        username.value = data.username;   
        email.value = data.email;
        idUser = data.id;
    })
})
    if(inputsenha1.value === inputsenha2.value){
        document.getElementById("btnsave").addEventListener("click", () => {
      fetch('http://localhost:8080/apiFuncionario/atualizar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idUser,
        nome: nome.value,
        cpf: cpf.value,
        cargo: cargo.value,
        username: username.value,
        dataNascimento1: "12/12/2000",
        email: email.value,
        senha: senha1.value
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao atualizar os dados: ' + response.status);
      }
    })
    .then(data => {
      document.getElementById('pMessage').textContent = "Atualizado com sucesso";
      document.getElementById('pMessage').style.color = "green";
    })
    .catch(error => {
      console.error("Erro na requisição:", error);
      alert("Erro ao atualizar os dados.");
    });
  });
    }
    else
    {
        document.getElementById('pMessage').textContent = "Senhas não são iguais!";
    }
    
    