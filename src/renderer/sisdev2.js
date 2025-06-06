document.getElementById("pesquisa").addEventListener("click", () => {
  const nome = document.getElementById("inputnome").value;
  const cpf = document.getElementById("inputcpf").value;

  fetch("http://localhost:8080/apiCliente/buscarsisdev2/" + nome + "/" + cpf)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const resposta = document.getElementById("presposta");
      resposta.textContent = "Cliente encontrado com sucesso";
      resposta.style.color = "green";

      setTimeout(() => {
        function calcularIdade(dataNascimentoStr) {
          const [dia, mes, ano] = dataNascimentoStr.split("/").map(Number);
          const dataNascimento = new Date(ano, mes - 1, dia);
          const hoje = new Date();

          let idade = hoje.getFullYear() - dataNascimento.getFullYear();

          if (
            hoje.getMonth() < dataNascimento.getMonth() ||
            (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate())
          ) {
            idade--;
          }

          return idade;
        }

        const cpfEncode = encodeURIComponent(data.cpf); // para evitar problemas com caracteres especiais

        if (calcularIdade(data.datanascimento1) >= 18) {
          window.location.href = `maiorIdade1.html?cpf=${cpfEncode}`;
        } else {
          window.location.href = `menorIdade1.html?cpf=${cpfEncode}`;
        }

      }, 3000);
    })
    .catch(error => {
      console.error("Erro ao buscar cliente:", error);
    });
});
