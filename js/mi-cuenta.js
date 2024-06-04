document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("formulario-datos-personales").style.display = "block";

    //Variables sesión
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    //Formularios
    const miCuentaForm = document.getElementById('miCuentaForm');
    const cambiarContrasenaForm = document.getElementById('cambiarContrasenaForm');
    //Botones
    const btnDatosPersonales = document.getElementById('btnDatosPersonales');
    const btnCambiarContrasena = document.getElementById('btnCambiarContrasena');
    //Texto
    const nombreUsuarioCuenta = document.getElementById('nombreUsuarioCuenta');

    function mostrarFormulario(formulario) {
        const formularios = ['datos-personales', 'cambiar-contrasena'];
        formularios.forEach(form => {
            const elemento = document.getElementById('formulario-' + form);
            elemento.style.display = form === formulario ? 'block' : 'none';
        });
    }

    function obtenerDatosSesion() {
        if (datosSesion) {
            nombreUsuarioCuenta.textContent = datosSesion.nombreUsuario;
            obtenerDatosUsuario(datosSesion.emailUsuario);
        } else {
            nombreUsuarioCuenta.textContent = 'MI CUENTA';
            mostrarMensajeAlerta('Error', 'Debe iniciar sesión para modificar datos.');
            setTimeout(() => {
                window.location.href = 'index.html'
            }, 3000);
        }
    }

    function obtenerDatosUsuario(email) {
        const usuario = usuarios.find(user => user.email === email);
        if (usuario) {
            document.getElementById('txtNombre').value = usuario.nombre;
            document.getElementById('txtApellido').value = usuario.apellido;
            document.getElementById('txtDireccion').value = usuario.direccion;
            document.getElementById('txtTelefono').value = usuario.telefono;
        }
    }

    btnDatosPersonales.addEventListener('click', function (event) {
        mostrarFormulario('datos-personales');
    });

    btnCambiarContrasena.addEventListener('click', function (event) {
        mostrarFormulario('cambiar-contrasena')
    });

    obtenerDatosSesion();

    //#region Modificar datos personales
    miCuentaForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const nombre = document.getElementById('txtNombre').value;
        const apellido = document.getElementById('txtApellido').value;
        const direccion = document.getElementById('txtDireccion').value;
        const telefono = document.getElementById('txtTelefono').value;

        const isValid = miCuentaForm.checkValidity();
        miCuentaForm.classList.add('was-validated');

        if (!isValid) {
            return;
        }

        if (datosSesion.length === 0) {
            mostrarMensajeAlerta('Error', 'Inicia sesión para modificar tus datos.');
            return;
        }

        const usuarioIndex = usuarios.findIndex(user => user.email === datosSesion.emailUsuario);
        if (usuarioIndex === -1) {
            mostrarMensajeAlerta('Error', 'Usuario no encontrado.');
            return;
        }

        usuarios[usuarioIndex].nombre = nombre;
        usuarios[usuarioIndex].apellido = apellido;
        usuarios[usuarioIndex].direccion = direccion;
        usuarios[usuarioIndex].telefono = telefono;

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        mostrarMensajeAlerta('Éxito', 'Cambios guardados.');
        // miCuentaForm.reset();

        nombreUsuarioCuenta.textContent = nombre;
        setTimeout(function() {
            miCuentaForm.classList.remove('was-validated');
          }, 2000);
        
    });
    //#endregion

    //#region Cambiar Contraseña
    cambiarContrasenaForm.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const contrasenaActual = document.getElementById('txtContrasenaActual').value;
        const nuevaContrasena = document.getElementById('txtNuevaContrasena').value;

        const isValid = cambiarContrasenaForm.checkValidity();
        cambiarContrasenaForm.classList.add('was-validated');

        if (!isValid) {
            return;
        }

        const usuarioIndex = usuarios.findIndex(user => user.email === datosSesion.emailUsuario);
        if (usuarioIndex === -1) {
            mostrarMensajeAlerta('Error', 'Usuario no encontrado.');
            return;
        }

        // const usuarioActual = usuarios[usuarioIndex];
        if (usuarios[usuarioIndex].contrasena !== contrasenaActual) {
            cambiarContrasenaForm.classList.remove('was-validated');
            mostrarMensajeAlerta('Error', 'La contraseña actual no es correcta.');
            return;
        }

        usuarios[usuarioIndex].contrasena = nuevaContrasena;

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        datosSesion.contrasenaUsuario = nuevaContrasena;
        localStorage.setItem('datosSesion', JSON.stringify(datosSesion));

        mostrarMensajeAlerta('Éxito', 'La contraseña fue cambiada exitosamente.');
    

        setTimeout(function() {
            cambiarContrasenaForm.classList.remove('was-validated');
            document.getElementById('txtContrasenaActual').value = '';
            document.getElementById('txtNuevaContrasena').value = '';
          }, 2000);
    });
    //#endregion

    //#region Validaciones contraseña
    document.getElementById('txtNuevaContrasena').addEventListener('change', validarContrasena);

    function validarContrasena() {
        let contrasena = document.getElementById('txtNuevaContrasena').value;

        if (contrasena !== null && contrasena !== '') {
            // Validar existencia de letra mayuscula, digitos, y largo de 6 a 18 caracteres
            if (contrasena.length < 6 || contrasena.length > 18) {
                mostrarMensajeContrasena("Largo entre 6 y 18 caracteres.");
                return false;
            }
            if (!/[A-Z]/.test(contrasena)) {
                mostrarMensajeContrasena("Debe contener al menos una letra mayúscula.");
                return false;
            }
            if (!/\d/.test(contrasena)) {
                mostrarMensajeContrasena("Debe contener al menos un número.");
                return false;
            }
        }

        // Inicializa campos con valores por defecto
        // Contraseña
        document.getElementById('txtNuevaContrasena').classList.remove('is-invalid');
        document.querySelector('.invalid-feedback.nueva-contrasena').textContent = "Este campo es obligatorio.";
        document.querySelector('.invalid-feedback.nueva-contrasena').style.display = 'none';
    }

    function mostrarMensajeContrasena(mensaje) {
        document.getElementById('txtNuevaContrasena').classList.add('is-invalid');
        document.querySelector('.invalid-feedback.nueva-contrasena').textContent = mensaje;
        document.querySelector('.invalid-feedback.nueva-contrasena').style.display = 'block';
    }
    //#endregion

    //#region Validar campos formulario registro
    const txtNombre = document.getElementById('txtNombre');
    const txtApellidoPaterno = document.getElementById('txtApellido');
    const txtDireccion = document.getElementById('txtDireccion');
    const txtTelefono = document.getElementById('txtTelefono');

    txtNombre.addEventListener('keypress', function (event) {
        validarSoloIngresoLetras(event);
    });

    txtApellidoPaterno.addEventListener('keypress', function (event) {
        validarSoloIngresoLetras(event);
    });

    txtDireccion.addEventListener('keypress', function (event) {
        validarIngresoAlphanumerico(event);
    });

    txtTelefono.addEventListener('keypress', function (event) {
        validarSoloIngresoNumeros(event);
    });

    function validarSoloIngresoLetras(event) {
        let regex = new RegExp("^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s-]+$");
        let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }

    function validarSoloIngresoNumeros(event) {
        var regex = new RegExp("^[0-9]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }

    function validarIngresoAlphanumerico(event) {
        var regex = new RegExp("^[a-zA-Z0-9 ]+$");
        var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }
    //#endregion

    //#region Mensaje alerta
    const toastLiveExample = document.getElementById('liveToast');
    const tituloAlerta = document.getElementById('txtTituloAlerta');
    const mensajeAlerta = document.getElementById('txtAlertaMensaje');

    function mostrarMensajeAlerta(titulo, mensaje) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        tituloAlerta.textContent = titulo;
        mensajeAlerta.textContent = mensaje;
        toastBootstrap.show()
    }
    //#endregion
});
