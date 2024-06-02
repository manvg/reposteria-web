// Validación y almacenamiento en localStorage

document.addEventListener('DOMContentLoaded', () => {
    // Validación de contraseña
    document.getElementById('txtContrasena').addEventListener('change', validarContrasena);
    document.getElementById('txtRepetirContrasena').addEventListener('change', validarRepetirContrasena);

    // Validación de fecha de nacimiento
    // document.getElementById('dtFechaNacimiento').addEventListener('change', function () {
    //     if (this.value) {
    //         validarEdad(this.value);
    //     } else {
    //         document.getElementById('dtFechaNacimiento').classList.add('is-invalid');
    //         document.querySelector('.invalid-feedback.fecha-nacimiento').textContent = "Este campo es obligatorio.";
    //         document.querySelector('.invalid-feedback.fecha-nacimiento').style.display = 'block';
    //     }
    // });

    // Manejar el envío del formulario
    document.getElementById('registroForm').addEventListener('submit', function (event) {
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            guardarDatosEnLocalStorage();
        }
        this.classList.add('was-validated');
    });

    // Limpiar formulario
    document.getElementById('btnLimpiarFormulario').addEventListener('click', function () {
        const form = document.getElementById('registroForm');
        form.reset();
        form.classList.remove('was-validated');
    });
});

function validarContrasena() {
    let contrasena = document.getElementById('txtContrasena').value;

    if (contrasena) {
        if (contrasena.length < 6 || contrasena.length > 18) {
            mostrarMensajeContrasena("La contraseña debe tener entre 6 y 18 caracteres.");
            return false;
        }
        if (!/[A-Z]/.test(contrasena)) {
            mostrarMensajeContrasena("La contraseña debe contener al menos una letra mayúscula.");
            return false;
        }
        if (!/\d/.test(contrasena)) {
            mostrarMensajeContrasena("La contraseña debe contener al menos un número.");
            return false;
        }
    }

    document.getElementById('txtContrasena').classList.remove('is-invalid');
    document.querySelector('.invalid-feedback.contrasena').textContent = "Este campo es obligatorio.";
    document.querySelector('.invalid-feedback.contrasena').style.display = 'none';
}

function mostrarMensajeContrasena(mensaje) {
    document.getElementById('txtContrasena').classList.add('is-invalid');
    document.querySelector('.invalid-feedback.contrasena').textContent = mensaje;
    document.querySelector('.invalid-feedback.contrasena').style.display = 'block';
}

function validarRepetirContrasena() {
    let contrasena = document.getElementById('txtContrasena').value;
    let repetirContrasena = document.getElementById('txtRepetirContrasena').value;

    if (contrasena && repetirContrasena) {
        if (contrasena !== repetirContrasena) {
            document.querySelector('.invalid-feedback.repetir-contrasena').textContent = "Las contraseñas no son iguales.";
            document.getElementById('txtRepetirContrasena').classList.add('is-invalid');
            document.querySelector('.invalid-feedback.repetir-contrasena').style.display = 'block';
            return false;
        }
    }

    document.getElementById('txtRepetirContrasena').classList.remove('is-invalid');
    document.querySelector('.invalid-feedback.repetir-contrasena').textContent = "Este campo es obligatorio.";
    document.querySelector('.invalid-feedback.repetir-contrasena').style.display = 'none';
}

// function validarEdad(fechaNacimiento) {
//     const edadMinima = 13;
//     const fechaActual = new Date().toISOString().slice(0, 10);

//     let anioNacimiento = parseInt(fechaNacimiento.substring(0, 4));
//     let mesNacimiento = parseInt(fechaNacimiento.substring(5, 7)) - 1; 
//     let diaNacimiento = parseInt(fechaNacimiento.substring(8, 10));
//     let fechaNac = new Date(anioNacimiento, mesNacimiento, diaNacimiento);
//     let fechaHoy = new Date(fechaActual);
//     let edad = fechaHoy.getFullYear() - fechaNac.getFullYear();

//     if (fechaNac.getMonth() > fechaHoy.getMonth() || (fechaNac.getMonth() === fechaHoy.getMonth() && fechaNac.getDate() > fechaHoy.getDate())) {
//         edad--;
//     }

//     if (edad < edadMinima) {
//         document.getElementById('dtFechaNacimiento').classList.add('is-invalid');
//         document.querySelector('.invalid-feedback.fecha-nacimiento').textContent = "Debes ser mayor de 13 años para registrarte.";
//         document.querySelector('.invalid-feedback.fecha-nacimiento').style.display = 'block';
//         document.getElementById('btnRegistrarse').disabled = true;
//         return false;
//     } else {
//         document.getElementById('dtFechaNacimiento').classList.remove('is-invalid');
//         document.querySelector('.invalid-feedback.fecha-nacimiento').textContent = "Este campo es obligatorio.";
//         document.querySelector('.invalid-feedback.fecha-nacimiento').style.display = 'none';
//         document.getElementById('btnRegistrarse').disabled = false;
//     }
// }

function guardarDatosEnLocalStorage() {
    const nombres = document.getElementById('txtNombres').value;
    const apellido = document.getElementById('txtApellidos').value;
    const direccion = document.getElementById('txtdireccionl').value;
    const email = document.getElementById('txtEmail').value;
    const contrasena = document.getElementById('txtContrasena').value;
    const fechaNacimiento = document.getElementById('dtFechaNacimiento').value;

    const usuario = {
        nombres,
        apellido,
        direccion,
        email,
        contrasena
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    alert('Datos guardados en localStorage.');
}