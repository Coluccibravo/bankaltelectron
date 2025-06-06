

document.getElementById("ButtonPageLoginEntrar").addEventListener("click", function() {
    let inputusername = document.getElementById("inputusername").value;
    let inputsenha = document.getElementById("inputsenha").value;
    fetch('http://localhost:8080/apiFuncionario/login/' + inputusername + '/' + inputsenha)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status)
      }
      return response.json()
    })
    .then((data) => {
        if(data.username == inputusername && data.senha == inputsenha){
            
            const url = "ui.html?nome=" + encodeURIComponent(inputusername) +
                        "&idade=" + encodeURIComponent(inputsenha);
            
            window.location.href = url;
            
    }})
    .catch((error) => {
        document.getElementById("erradosenha").textContent = "Username ou senha incorretos!";
        document.getElementById("erradosenha").style.color = "red";
      })
    })