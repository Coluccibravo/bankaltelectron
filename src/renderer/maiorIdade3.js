document.getElementById("fotohome").addEventListener("click", () => {
    window.location.href = "login.html"
})
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const cpf = params.get("cpf");
    if (!cpf) {
        console.warn("CPF não encontrado na URL.");
        return;
    }
    fetch(`http://localhost:8080/apiCliente/buscarporcpf/${cpf}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            const clienteId = data.id;

            // Buscar renda
            return fetch(`http://localhost:8080/apiRenda/buscarPorClienteId/${clienteId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição: ' + response.status);
                    }
                    return response.json();
                })
                .then((rendaData) => {
                    document.getElementById('plans').value = rendaData.plano;
                    document.getElementById('account').value = rendaData.tipo;


                    return fetch(`http://localhost:8080/apiCartao/buscarPorClienteId/${clienteId}`);
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição do cartão: ' + response.status);
                    }
                    return response.json();
                })
                .then((cartaoData) => {
                    const select = document.getElementById("selectCartoes");
                    cartaoData.forEach((cartao) => {
                        const option = document.createElement("option");
                        option.value = cartao.id; // ou cartao.numero, dependendo do que você precisa
                        option.textContent = `${cartao.tipo} - **** ${cartao.numero.slice(-4)}`;

                        select.appendChild(option);
                    });
                    let validade = cartaoData.datavalidade || '';
                    if (validade) {
                        const partes = validade.split('/');
                        if (partes.length === 3) {
                            validade = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
                        }
                    }
                    document.getElementById("selectCartoes").addEventListener("change", function () {
                        const cartaoSelecionado = cartaoData.find(c => c.id == this.value);

                        if (cartaoSelecionado) {
                            document.getElementById("cardNumber").value = cartaoSelecionado.numero;
                            document.getElementById("nome").value = cartaoSelecionado.nome;
                            document.getElementById("securityCode").value = cartaoSelecionado.cvv;

                            // Converter validade de yyyy-mm-dd para dd/mm/yyyy
                            // ...existing code...
                            if (cartaoSelecionado.datavalidade) {
                                const partes = cartaoSelecionado.datavalidade.split("/");
                                if (partes.length === 3) {
                                    const [dia, mes, ano] = partes;
                                    validadeFormatada = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
                                } else {
                                    validadeFormatada = cartaoSelecionado.datavalidade; // fallback
                                }
                            }
                            document.getElementById("validity").value = validadeFormatada;

                        } else {
                            // Limpar inputs se nenhum cartão estiver selecionado
                            document.getElementById("cardNumber").value = "";
                            document.getElementById("nome").value = "";
                            document.getElementById("securityCode").value = "";
                            document.getElementById("validity").value = "";
                        }
                    });
                })
                .catch((error) => {
                    console.error('Erro ao buscar dados:', error);
                });
            document.getElementById('continuar').addEventListener('click', () => {
                window.location.href = `maiorIdade4.html?cpf=${cpf}`;
            });
            document.getElementById('voltar').addEventListener('click', () => {
                window.location.href = `maiorIdade2.html?cpf=${cpf}`;
            });
        });
})
