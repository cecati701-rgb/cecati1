/**
 * Módulo de Validación de Formularios
 * Utiliza el módulo ReglasNegocio para aplicar validaciones de negocio
 */

// Definición de campos del formulario1 con sus tipos de validación
const configuracionCamposFormulario1 = {
    fechaInscripcion: { tipo: 'fecha', nombre: 'Fecha de inscripción' },
    numeroSolicitud: { tipo: 'texto', nombre: 'Número de solicitud' },
    apellido1: { tipo: 'apellido', nombre: 'Primer apellido' },
    apellido2: { tipo: 'apellido', nombre: 'Segundo apellido' },
    nombre: { tipo: 'nombre', nombre: 'Nombre(s)' },
    curp: { tipo: 'curp', nombre: 'CURP' },
    rfc: { tipo: 'rfc', nombre: 'RFC' },
    edad: { tipo: 'edad', nombre: 'Edad' },
    telefono: { tipo: 'telefono', nombre: 'Teléfono' },
    correo: { tipo: 'email', nombre: 'Correo electrónico' },
    fechaNacimiento: { tipo: 'fechaNacimiento', nombre: 'Fecha de nacimiento' },
    estadoCivil: { tipo: 'texto', nombre: 'Estado civil' },
    domicilioText: { tipo: 'texto', nombre: 'Domicilio' },
    colonia: { tipo: 'texto', nombre: 'Colonia' },
    codigoPostal: { tipo: 'codigoPostal', nombre: 'Código postal' },
    municipio: { tipo: 'texto', nombre: 'Municipio o delegación' },
    estadoText: { tipo: 'texto', nombre: 'Estado' },
    fechaIngreso: { tipo: 'fechaIngreso', nombre: 'Fecha de ingreso', dependeDe: 'fechaNacimiento' },
    escolaridad: { tipo: 'texto', nombre: 'Escolaridad' },
    tipoSangre: { tipo: 'texto', nombre: 'Tipo de sangre' },
    padecimiento: { tipo: 'texto', nombre: 'Padecimiento' },
    nacionalidad: { tipo: 'texto', nombre: 'Nacionalidad' },
    pais: { tipo: 'texto', nombre: 'PAIS' },
    especialidad: { tipo: 'texto', nombre: 'Especialidad' },
    claveCurso: { tipo: 'texto', nombre: 'Clave del curso' },
    nombreCurso: { tipo: 'texto', nombre: 'Nombre del curso' },
    horario: { tipo: 'texto', nombre: 'Horario' }
};

// Definición de campos del formulario2 con sus tipos de validación
const configuracionCamposFormulario2 = {
    medio: { tipo: 'texto', nombre: '¿Cómo se enteró?', obligatorio: false },
    motivo: { tipo: 'texto', nombre: 'Motivo de capacitación' },
    personasTrabajan: { tipo: 'personasTrabajan', nombre: 'Personas que trabajan', obligatorio: false },
    ingresos: { tipo: 'ingresos', nombre: 'Ingresos mensuales', obligatorio: false },
    tipoInscripcion: { tipo: 'texto', nombre: 'Tipo de inscripción', obligatorio: false },
    numeroRecibo: { tipo: 'texto', nombre: 'Número de recibo', obligatorio: false },
    cantidadPagada: { tipo: 'cantidadPagada', nombre: 'Cantidad pagada', obligatorio: false },
    becaPlantel: { tipo: 'texto', nombre: 'Beca del plantel', obligatorio: false },
    reciboBeca: { tipo: 'texto', nombre: 'No. recibo de beca', obligatorio: false },
    costoInscripcion: { tipo: 'costoInscripcion', nombre: 'Costo de inscripción', obligatorio: false },
    quienOtorga: { tipo: 'texto', nombre: 'Quién la otorga', obligatorio: false },
    reciboOtroBeca: { tipo: 'texto', nombre: 'No. recibo de otra beca', obligatorio: false },
    cantidadOtroBeca: { tipo: 'cantidadPagada', nombre: 'Cantidad pagada de otra beca', obligatorio: false }
};

// Validar un campo individual
function validarCampoIndividual(campoId, configuracion) {
    const campo = document.getElementById(campoId);
    if (!campo) return { valido: true, mensaje: '' };

    const valor = campo.value;
    const esObligatorio = configuracion.obligatorio !== false;

    // Si no es obligatorio y está vacío, es válido
    if (!esObligatorio && !valor.trim()) {
        return { valido: true, mensaje: '' };
    }

    // Obtener parámetros adicionales si hay dependencias
    const params = {};
    if (configuracion.dependeDe) {
        const campoDependiente = document.getElementById(configuracion.dependeDe);
        if (campoDependiente) {
            params.fechaNacimiento = campoDependiente.value;
        }
    }

    // Validar usando las reglas de negocio
    const esValido = ReglasNegocio.validarCampo(valor, configuracion.tipo, params);

    if (!esValido) {
        const mensaje = ReglasNegocio.obtenerMensajeError(configuracion.tipo, configuracion.nombre);
        return { valido: false, mensaje: mensaje };
    }

    return { valido: true, mensaje: '' };
}

// Validar formulario1
function validarFormulario1() {
    let valido = true;
    let mensajesError = [];

    limpiarErrores();

    // Validar cada campo según su configuración
    for (const [campoId, configuracion] of Object.entries(configuracionCamposFormulario1)) {
        const resultado = validarCampoIndividual(campoId, configuracion);
        
        if (!resultado.valido) {
            const campo = document.getElementById(campoId);
            if (campo) {
                campo.classList.add("error");
            }
            valido = false;
            mensajesError.push(resultado.mensaje);
        }
    }

    // Validar radio buttons de sexo
    if (!ReglasNegocio.validarRadioSeleccionado('sexo')) {
        document.querySelectorAll('input[name="sexo"]').forEach(radio => radio.classList.add("error"));
        valido = false;
        mensajesError.push("Debes seleccionar un sexo");
    }

    // Validar radio buttons de discapacidad
    if (!ReglasNegocio.validarRadioSeleccionado('discapacidad')) {
        document.querySelectorAll('input[name="discapacidad"]').forEach(radio => radio.classList.add("error"));
        valido = false;
        mensajesError.push("Debes seleccionar si presenta discapacidad");
    }

    if (!valido) {
        mostrarModalErrores(mensajesError);
    }

    return valido;
}

// Validar formulario2
function validarFormulario2() {
    let valido = true;
    let mensajesError = [];

    limpiarErrores();

    // Validar cada campo según su configuración
    for (const [campoId, configuracion] of Object.entries(configuracionCamposFormulario2)) {
        const resultado = validarCampoIndividual(campoId, configuracion);
        
        if (!resultado.valido) {
            const campo = document.getElementById(campoId);
            if (campo) {
                campo.classList.add("error");
            }
            valido = false;
            mensajesError.push(resultado.mensaje);
        }
    }

    if (!valido) {
        mostrarModalErrores(mensajesError);
    }

    return valido;
}

// Limpiar errores de validación
function limpiarErrores() {
    let inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.classList.remove("error");
    });
}

// Mostrar modal de Bootstrap con errores de validación
function mostrarModalErrores(mensajesError) {
    const listaErrores = document.getElementById('listaErrores');
    if (listaErrores) {
        listaErrores.innerHTML = '';
        mensajesError.forEach(mensaje => {
            const li = document.createElement('li');
            li.textContent = mensaje;
            li.className = 'mb-2';
            listaErrores.appendChild(li);
        });
        
        const modal = new bootstrap.Modal(document.getElementById('modalErrores'));
        modal.show();
    }
}
