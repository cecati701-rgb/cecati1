/**
 * Módulo de Reglas de Negocio para Validación de Formularios
 * Aplica el principio de mínimo de utilidad y encapsulación
 */

const ReglasNegocio = (function() {
    
    // Validaciones de texto
    const validarTextoVacio = function(valor) {
        return valor && valor.trim() !== "";
    };

    const validarLongitudMinima = function(valor, minima) {
        return valor && valor.length >= minima;
    };

    const validarLongitudMaxima = function(valor, maxima) {
        return valor && valor.length <= maxima;
    };

    const validarRangoLongitud = function(valor, minima, maxima) {
        return valor && valor.length >= minima && valor.length <= maxima;
    };

    // Validaciones de números
    const validarNumeroPositivo = function(valor) {
        const num = parseFloat(valor);
        return !isNaN(num) && num > 0;
    };

    const validarNumeroNoNegativo = function(valor) {
        const num = parseFloat(valor);
        return !isNaN(num) && num >= 0;
    };

    const validarRangoNumerico = function(valor, minimo, maximo) {
        const num = parseFloat(valor);
        return !isNaN(num) && num >= minimo && num <= maximo;
    };

    // Validaciones de fechas
    const validarFormatoFecha = function(valor) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(valor);
    };

    const validarFechaValida = function(valor) {
        if (!validarFormatoFecha(valor)) return false;
        const fecha = new Date(valor);
        return !isNaN(fecha.getTime());
    };

    const validarFechaNoFutura = function(valor) {
        if (!validarFechaValida(valor)) return false;
        const fecha = new Date(valor);
        const hoy = new Date();
        return fecha <= hoy;
    };

    const validarFechaPosterior = function(valor, fechaReferencia) {
        if (!validarFechaValida(valor) || !validarFechaValida(fechaReferencia)) return false;
        const fecha = new Date(valor);
        const referencia = new Date(fechaReferencia);
        return fecha > referencia;
    };

    const validarEdad = function(valor) {
        const edad = parseInt(valor);
        if (isNaN(edad)) return false;
        return edad >= 15 && edad <= 100;
    };

    // Validaciones de formatos específicos
    const validarEmail = function(valor) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(valor);
    };

    const validarTelefono = function(valor) {
        const regex = /^\d{10}$/;
        return regex.test(valor.replace(/\s/g, ""));
    };

    const validarCodigoPostal = function(valor) {
        const regex = /^\d{5}$/;
        return regex.test(valor);
    };

    const validarCURP = function(valor) {
        const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]\d$/;
        return regex.test(valor.toUpperCase());
    };

    const validarRFC = function(valor) {
        // RFC para personas físicas: 4 letras + 6 dígitos + 3 alfanuméricos
        // RFC para personas morales: 3 letras + 6 dígitos + 3 alfanuméricos
        const regex = /^[A-Z]{3,4}\d{6}[A-Z0-9]{3}$/;
        return regex.test(valor.toUpperCase());
    };

    // Validaciones específicas del formulario
    const validarNombre = function(valor) {
        return validarTextoVacio(valor) && validarRangoLongitud(valor, 2, 100);
    };

    const validarApellido = function(valor) {
        return validarTextoVacio(valor) && validarRangoLongitud(valor, 2, 100);
    };

    const validarCURPCompleto = function(valor) {
        return validarTextoVacio(valor) && validarCURP(valor);
    };

    const validarRFCCompleto = function(valor) {
        return validarTextoVacio(valor) && validarRFC(valor);
    };

    const validarCorreoElectronico = function(valor) {
        return validarTextoVacio(valor) && validarEmail(valor);
    };

    const validarTelefonoCompleto = function(valor) {
        return validarTextoVacio(valor) && validarTelefono(valor);
    };

    const validarCP = function(valor) {
        return validarTextoVacio(valor) && validarCodigoPostal(valor);
    };

    const validarFechaNacimiento = function(valor) {
        return validarTextoVacio(valor) && validarFechaValida(valor) && validarFechaNoFutura(valor);
    };

    const validarFechaIngreso = function(valor, fechaNacimiento) {
        if (!validarTextoVacio(valor)) return false;
        if (!validarFechaValida(valor)) return false;
        if (fechaNacimiento) {
            return validarFechaPosterior(valor, fechaNacimiento);
        }
        return true;
    };

    const validarIngresos = function(valor) {
        return validarNumeroNoNegativo(valor);
    };

    const validarCantidadPagada = function(valor) {
        return validarNumeroNoNegativo(valor);
    };

    const validarPersonasTrabajan = function(valor) {
        return validarNumeroNoNegativo(valor);
    };

    const validarCostoInscripcion = function(valor) {
        return validarNumeroNoNegativo(valor);
    };

    // Validaciones de campos obligatorios
    const validarCampoObligatorio = function(valor) {
        return validarTextoVacio(valor);
    };

    // Validación de radio buttons
    const validarRadioSeleccionado = function(nombreGrupo) {
        const seleccionado = document.querySelector(`input[name="${nombreGrupo}"]:checked`);
        return seleccionado !== null;
    };

    // Validación completa de un campo con mensaje de error
    const validarCampo = function(valor, tipoValidacion, params = {}) {
        switch(tipoValidacion) {
            case 'texto':
                return validarCampoObligatorio(valor);
            case 'nombre':
                return validarNombre(valor);
            case 'apellido':
                return validarApellido(valor);
            case 'curp':
                return validarCURPCompleto(valor);
            case 'rfc':
                return validarRFCCompleto(valor);
            case 'edad':
                return validarEdad(valor);
            case 'email':
                return validarCorreoElectronico(valor);
            case 'telefono':
                return validarTelefonoCompleto(valor);
            case 'codigoPostal':
                return validarCP(valor);
            case 'fecha':
                return validarFechaValida(valor);
            case 'fechaNacimiento':
                return validarFechaNacimiento(valor);
            case 'fechaIngreso':
                return validarFechaIngreso(valor, params.fechaNacimiento);
            case 'numeroPositivo':
                return validarNumeroPositivo(valor);
            case 'numeroNoNegativo':
                return validarNumeroNoNegativo(valor);
            case 'ingresos':
                return validarIngresos(valor);
            case 'cantidadPagada':
                return validarCantidadPagada(valor);
            case 'personasTrabajan':
                return validarPersonasTrabajan(valor);
            case 'costoInscripcion':
                return validarCostoInscripcion(valor);
            default:
                return validarCampoObligatorio(valor);
        }
    };

    // Obtener mensaje de error según tipo de validación
    const obtenerMensajeError = function(tipoValidacion, nombreCampo) {
        const mensajes = {
            'texto': `${nombreCampo} es obligatorio`,
            'nombre': `${nombreCampo} debe tener entre 2 y 100 caracteres`,
            'apellido': `${nombreCampo} debe tener entre 2 y 100 caracteres`,
            'curp': `${nombreCampo} no tiene el formato correcto (4 letras, 6 dígitos, letra, 5 letras, 1 carácter alfanumérico, 1 dígito)`,
            'rfc': `${nombreCampo} no tiene el formato correcto (4 letras, 6 dígitos, 3 caracteres alfanuméricos)`,
            'edad': `${nombreCampo} debe estar entre 15 y 100 años`,
            'email': `${nombreCampo} no tiene el formato correcto`,
            'telefono': `${nombreCampo} debe tener 10 dígitos`,
            'codigoPostal': `${nombreCampo} debe tener 5 dígitos`,
            'fecha': `${nombreCampo} no tiene el formato correcto (YYYY-MM-DD)`,
            'fechaNacimiento': `${nombreCampo} no es válida o es futura`,
            'fechaIngreso': `${nombreCampo} debe ser posterior a la fecha de nacimiento`,
            'numeroPositivo': `${nombreCampo} debe ser un número positivo`,
            'numeroNoNegativo': `${nombreCampo} debe ser un número no negativo`,
            'ingresos': `${nombreCampo} debe ser un número válido`,
            'cantidadPagada': `${nombreCampo} debe ser un número válido`,
            'personasTrabajan': `${nombreCampo} debe ser un número válido`,
            'costoInscripcion': `${nombreCampo} debe ser un número válido`
        };
        return mensajes[tipoValidacion] || `${nombreCampo} es inválido`;
    };

    // API pública
    return {
        validarCampo: validarCampo,
        validarRadioSeleccionado: validarRadioSeleccionado,
        obtenerMensajeError: obtenerMensajeError,
        // Validaciones individuales expuestas para uso directo si es necesario
        validarTextoVacio: validarTextoVacio,
        validarNumeroPositivo: validarNumeroPositivo,
        validarNumeroNoNegativo: validarNumeroNoNegativo,
        validarEmail: validarEmail,
        validarTelefono: validarTelefono,
        validarCURP: validarCURP,
        validarRFC: validarRFC,
        validarCodigoPostal: validarCodigoPostal,
        validarFechaValida: validarFechaValida,
        validarEdad: validarEdad
    };

})();
