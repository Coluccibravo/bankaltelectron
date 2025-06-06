document.getElementById('cancel').addEventListener("click",function(){
    window.location.href= "login.html"
})

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('confirma');

  if (!btn) {
    console.error("Elemento com id 'btndeletar' não encontrado!");
    return;
  }

  btn.addEventListener('click', () => {
    const username = document.getElementById('inputusername').value.trim();
    const senha = document.getElementById('inputsenha').value.trim();
    const pDelet = document.getElementById('pdelet');
    pDelet.textContent = '';

    if (!username || !senha) {
      pDelet.textContent = 'Preencha todos os campos.';
      pDelet.style.color = 'red';
      return;
    }

    fetch(`http://localhost:8080/apiFuncionario/login/${username}/${senha}`)
      .then(response => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then(() => {
        return fetch(`http://localhost:8080/apiFuncionario/deletarPorUsername/${username}`, {
          method: 'DELETE'
        });
      })
      .then(response => {
        if (response.ok) {
          pDelet.textContent = 'Usuário deletado com sucesso!';
          pDelet.style.color = 'green';
          
          // Aguarda 5 segundos e redireciona para login.html
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          pDelet.textContent = 'Erro ao deletar o usuário.';
          pDelet.style.color = 'red';
        }
      })
      .catch(() => {
        pDelet.textContent = 'Usuário ou senha inválidos.';
        pDelet.style.color = 'red';
      });
  });
});
