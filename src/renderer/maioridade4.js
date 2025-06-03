
const cpf = "43435463066";


window.addEventListener('DOMContentLoaded', () => {
    fetch(`http://localhost:8080/apiCliente/buscarcpf/${cpf}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status);
      }
      return response.json();
    })
    .then((data) => {
        document.getElementById("inputnome").value = data.nome;
        document.getElementById("inputcolor").value = data.cor;
        document.getElementById("inputnivel").value = data.niveldesuporte;
        document.getElementById("inputmododecor").value = data.mododecor;
        document.getElementById("inputcomorbidade").value = data.comorbidade;
        document.getElementById("inputiniciada").value = data.categoriainiciada;
        document.getElementById("inputatual").value = data.categoriaatual;
        document.getElementById("inputmeta").value = data.meta;
    })

    const atualizarCliente = () => {
        // Pegar os valores dos inputs
        const nome = document.getElementById("inputnome").value;
        const cor = document.getElementById("inputcolor").value;
        const nivel = document.getElementById("inputnivel").value;
        const mododecor = document.getElementById("inputmododecor").value;
        const comorbidade = document.getElementById("inputcomorbidade").value;
        const categoriainiciada = document.getElementById("inputiniciada").value;
        const categoriaatual = document.getElementById("inputatual").value;
        const meta = document.getElementById("inputmeta").value;

        // Objeto que será enviado para o servidor
        const clienteAtualizado = {
            nome: nome,
            cor: cor,
            niveldesuporte: nivel,
            mododecor: mododecor,
            comorbidade: comorbidade,
            categoriainiciada: categoriainiciada,
            categoriaatual: categoriaatual,
            meta: meta
        };

      fetch('http://localhost:8080/apiCliente/atualizar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
    niveldesuporte: nivel,
    comorbidade: comorbidade,
    mododecor: mododecor,
    cor: cor,
    categoriainiciada: categoriainiciada,
    categoriaatual: categoriaatual,
    meta: meta
})
      })
        .then(response => {
            if (response.ok) {
                alert('Cliente atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar cliente: ' + response.status);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert('Ocorreu um erro ao tentar atualizar os dados.');
        })
        document.getElementById("continuar").addEventListener("click", atualizarCliente);
    }});

