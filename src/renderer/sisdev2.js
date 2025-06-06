
document.getElementById("pesquisa").addEventListener("click", () => {
    const nome = document.getElementById("inputnome").value;
    const cpf = document.getElementById("inputcpf").value;
    fetch("http://localhost:8080/apiCliente/buscarsisdev2/"+ nome + "/" + cpf)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    return response.json();
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then((data) => {
    document.getElementById("presposta").textContent = "Cliente encontrado com sucesso";
    document.getElementById("presposta").style.color = "green";
  })
  .catch(error => {
    console.error("Erro ao buscar cliente:", error);
  });
} )