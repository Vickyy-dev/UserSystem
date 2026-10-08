const form = document.querySelector("#formCadastro");
const buscarCep = document.querySelector("#buscarCep");
const cep = document.querySelector("#cep");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    // Corrigido ou removido se não for necessário por agora
    form.reset();
});

buscarCep.addEventListener("click", async function() {
    const valor = cep.value.replace(/\D/g, "");
    if (valor.length !== 8) {
        cep.focus();
        cep.reportValidity();
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
        const dados = await resposta.json();
        
        if (!resposta.ok || dados.erro) {
            throw new Error("CEP não encontrado");
        }
        
        document.querySelector("#logradouro").value = dados.logradouro;
        document.querySelector("#bairro").value = dados.bairro;
        document.querySelector("#cidade").value = dados.localidade;
        
        // Confirma se o ID no teu HTML é "estado" ou "uf"
        document.querySelector("#estado").value = dados.uf; // O ViaCEP retorna a sigla em 'dados.uf'

    } catch (erro) {
        alert("Erro Capturado: " + erro);
    }
});