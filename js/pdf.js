const btnPDF = document.getElementById("btnPDF");

btnPDF.addEventListener("click", () => {

    guardarFormulario2();

    // Guardar los datos en localStorage y abrir una nueva ventana para generar el PDF
    window.open('pdf-view.html', '_blank');

});
