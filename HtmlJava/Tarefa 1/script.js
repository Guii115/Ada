function validarFormulario() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var idade = document.getElementById("idade").value;
    var senha = document.getElementById("senha").value;
    var cidade = document.getElementById("cidade").value;

    var mensagemErro = document.getElementById("mensagemErro");
    mensagemErro.innerHTML = "";

    if (!nome || !email || !idade || !senha || !cidade) {
        mensagemErro.innerHTML = "Todos os campos devem ser preenchidos.";
    } else {

        alert("Formulário enviado com sucesso!");
    }
}