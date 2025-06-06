document.addEventListener("DOMContentLoaded", () => {
  const nome = document.getElementById('inputnome');
  const cargo = document.getElementById('inputcargo');
  const dataNascimento = document.getElementById('inputdatanascimento');
  const cpf = document.getElementById('inputcpf');
  const username = document.getElementById('inputusername');
  const email = document.getElementById('inputemail');
  const senha1 = document.getElementById('senha1');
  const senha2 = document.getElementById('senha2');

  // P's para mostrar erros abaixo dos campos
  const pUsername = document.getElementById('pusername');
  const pCpf = document.getElementById('pcpf');
  const pEmail = document.getElementById('pemail');
  const pMessage = document.getElementById('pMessage'); // P onde será exibida a mensagem de sucesso

  // Função para validar CPF (validação completa)
  function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Descartar CPFs como 111.111.111.11

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    if (resto < 2 ? resto !== parseInt(cpf.charAt(9)) : 11 - resto !== parseInt(cpf.charAt(9))) {
      return false;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    return resto < 2 ? resto === parseInt(cpf.charAt(10)) : 11 - resto === parseInt(cpf.charAt(10));
  }

  // Limpar mensagens de erro ao clicar no botão
  function limparMensagens() {
    pMessage.textContent = "";
    pUsername.textContent = "";
    pCpf.textContent = "";
    pEmail.textContent = "";
  }

  // Função para verificar se o dado já existe na API
  async function isDuplicado(res) {
    if (res.status === 404) return false;
    try {
      const data = await res.json();
      return !!data && Object.keys(data).length > 0;
    } catch {
      return true; // erro ao ler = assume duplicado
    }
  }

  // Diminuir a margem dos P's para evitar rolagem
  const ps = document.querySelectorAll('p');
  ps.forEach(p => {
    p.style.margin = "0px 0"; // Ajusta a margem de todos os P's
  });

  document.getElementById('btnsave').addEventListener('click', async () => {
    let erro = false;
    limparMensagens(); // Limpa os erros anteriores

    // Validação do CPF
    if (!validaCPF(cpf.value)) {
      pCpf.textContent = "CPF inválido!";
      pCpf.style.color = "red";
      erro = true;
    }

    try {
      // Verifica se o username, cpf ou email já estão em uso
      const [resUsername, resCpf, resEmail] = await Promise.all([ 
        fetch(`http://localhost:8080/apiFuncionario/buscarParaCadastroUsername/${username.value}`),
        fetch(`http://localhost:8080/apiFuncionario/buscarParaCadastroCpf/${cpf.value}`),
        fetch(`http://localhost:8080/apiFuncionario/buscarParaCadastroEmail/${email.value}`)
      ]);

      // Se algum dado for duplicado, exibe o erro correspondente
      if (await isDuplicado(resUsername)) {
        pUsername.textContent = "Este Username já está em uso!";
        pUsername.style.color = "red";
        erro = true;
      }

      if (await isDuplicado(resCpf)) {
        pCpf.textContent = "Este CPF já está em uso!";
        pCpf.style.color = "red";
        erro = true;
      }

      if (await isDuplicado(resEmail)) {
        pEmail.textContent = "Este Email já está em uso!";
        pEmail.style.color = "red";
        erro = true;
      }

    } catch (e) {
      console.error("Erro ao verificar duplicatas:", e);
      alert("Erro ao verificar dados duplicados.");
      return;
    }

    // Verifica se as senhas coincidem
    if (senha1.value !== senha2.value) {
      pMessage.textContent = "As senhas não condizem!";
      pMessage.style.color = "red";
      erro = true;
    }

    // Se houver erro, não tenta cadastrar
    if (erro) return;

    // Manipulando a data de nascimento
    const dataNascimentoValue = dataNascimento.value; // Ex: '1990-12-31'

    // Converter para formato 'dd/mm/yyyy'
    const [ano, mes, dia] = dataNascimentoValue.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`; // '31/12/1990'

    // Dados do novo funcionário
    const novoFuncionario = {
      nome: nome.value,
      cargo: cargo.value,
      datanascimento1: dataFormatada, // Envia a data formatada
      cpf: cpf.value,
      username: username.value,
      email: email.value,
      senha: senha1.value
    };

    try {
      // Faz o cadastro do novo funcionário
      const cadastroRes = await fetch('http://localhost:8080/apiFuncionario/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoFuncionario)
      });

      // Se o cadastro foi bem-sucedido
      if (cadastroRes.ok) {
        pMessage.textContent = "Funcionário cadastrado com sucesso!";
        pMessage.style.color = "green";
      } else {
        pMessage.textContent = "Erro ao cadastrar funcionário.";
        pMessage.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      pMessage.textContent = "Erro ao cadastrar funcionário.";
      pMessage.style.color = "red";
    }
  });
});
