function guardarFormulario1(){

    let datos = {

        fechaInscripcion: document.getElementById("fechaInscripcion").value,
        numeroSolicitud: document.getElementById("numeroSolicitud").value,
        apellido1: document.getElementById("apellido1").value,
        apellido2: document.getElementById("apellido2").value,
        nombre: document.getElementById("nombre").value,
        curp: document.getElementById("curp").value,
        rfc: document.getElementById("rfc").value,
        edad: document.getElementById("edad").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        estadoCivil: document.getElementById("estadoCivil").value,
        domicilioText: document.getElementById("domicilioText").value,
        colonia: document.getElementById("colonia").value,
        codigoPostal: document.getElementById("codigoPostal").value,
        municipio: document.getElementById("municipio").value,
        estadoText: document.getElementById("estadoText").value,
        fechaIngreso: document.getElementById("fechaIngreso").value,
        escolaridad: document.getElementById("escolaridad").value,
        tipoSangre: document.getElementById("tipoSangre").value,
        padecimiento: document.getElementById("padecimiento").value,
        nacionalidad: document.getElementById("nacionalidad").value,
        pas: document.getElementById("pais").value,
        especialidad: document.getElementById("especialidad").value,
        claveCurso: document.getElementById("claveCurso").value,
        nombreCurso: document.getElementById("nombreCurso").value,
        horario: document.getElementById("horario").value,

        sexo: document.querySelector('input[name="sexo"]:checked')?.value || "",
        discapacidad: document.querySelector('input[name="discapacidad"]:checked')?.value || "",

        acta: document.getElementById("acta").checked,
        curpDoc: document.getElementById("curpDoc").checked,
        ine: document.getElementById("ine").checked,
        domicilio: document.getElementById("domicilio").checked,
        cartillaMilitar: document.getElementById("cartillaMilitar").checked,
        licenciaManejo: document.getElementById("licenciaManejo").checked,
        credencialImssIssste: document.getElementById("credencialImssIssste").checked,
        comprobanteEstudios: document.getElementById("comprobanteEstudios").checked,
        fotografias: document.getElementById("fotografias").checked,
        cartillaVacunacion: document.getElementById("cartillaVacunacion").checked,
        comprobanteEstancia: document.getElementById("comprobanteEstancia").checked
    };

    localStorage.setItem("formulario1", JSON.stringify(datos));
}

function obtenerFormulario1(){
    return JSON.parse(localStorage.getItem("formulario1"));
}

function guardarFormulario2(){

    let datos = {

        medio: document.getElementById("medio").value,
        motivo: document.getElementById("motivo").value,
        personasTrabajan: document.getElementById("personasTrabajan").value,
        ingresos: document.getElementById("ingresos").value,

        lavadora: document.getElementById("lavadora").checked,
        celular: document.getElementById("celular").checked,
        automovil: document.getElementById("automovil").checked,
        internet: document.getElementById("internet").checked,
        computadora: document.getElementById("computadora").checked,
        calentador: document.getElementById("calentador").checked,
        lineaTelefonica: document.getElementById("lineaTelefonica").checked,
        televisionCable: document.getElementById("televisionCable").checked,
        aspiradora: document.getElementById("aspiradora").checked,
        tostadora: document.getElementById("tostadora").checked,
        serviciosPlanta: document.getElementById("serviciosPlanta").checked,

        tipoInscripcion: document.getElementById("tipoInscripcion").value,
        numeroRecibo: document.getElementById("numeroRecibo").value,
        cantidadPagada: document.getElementById("cantidadPagada").value,

        becaPlantel: document.getElementById("becaPlantel").value,
        reciboBeca: document.getElementById("reciboBeca").value,
        costoInscripcion: document.getElementById("costoInscripcion").value,

        quienOtorga: document.getElementById("quienOtorga").value,
        reciboOtroBeca: document.getElementById("reciboOtroBeca").value,
        cantidadOtroBeca: document.getElementById("cantidadOtroBeca").value
    };

    localStorage.setItem("formulario2", JSON.stringify(datos));
}

function obtenerFormulario2(){
    return JSON.parse(localStorage.getItem("formulario2"));
}
