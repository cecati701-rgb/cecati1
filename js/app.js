const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {

    if(validarFormulario1()){

        guardarFormulario1();

        window.location.href = "formulario2.html";
    }

});