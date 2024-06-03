document.addEventListener('DOMContentLoaded', function () {
  const formRegister = document.querySelector('.needs-validation');
  formRegister.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const nombre = document.querySelector('#txtNombre').value;
    const apellido = document.querySelector('#txtApellidoPaterno').value;
    const direccion = document.querySelector('#txtDireccion').value;
    const telefono = document.querySelector('#txtTelefono').value;
    const email = document.querySelector('#txtEmail').value;
    const contrasena = document.querySelector('#txtContrasena').value;
    const repetirContrasena = document.querySelector('#txtRepetirContrasena').value;
    const perfil = 'Cliente';

    const isValid = formRegister.checkValidity();
    formRegister.classList.add('was-validated');

    if (!isValid) {
      return;
    }

    if (contrasena !== repetirContrasena) {
      mostrarMensajeAlerta('Error', 'Las contraseñas no coinciden.')
      return;
    }

    const registroExitoso = window.registrarUsuario(nombre, apellido, direccion, telefono, email, contrasena, perfil);
    if (registroExitoso) {
      formRegister.reset();
      formRegister.classList.remove('was-validated');

      //Redireccionar al login
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 2000);
      return true;
    } else {
      mostrarMensajeAlerta('Error', 'El usuario ya existe.')
    }
  }, false);
});

//#region Validaciones contraseña
document.getElementById('txtContrasena').addEventListener('change', validarContrasena);

document.getElementById('txtRepetirContrasena').addEventListener('change', function () {
  let contrasena = document.getElementById('txtContrasena').value;
  let repetirContrasena = document.getElementById('txtRepetirContrasena').value;

  if (contrasena !== null && contrasena !== '' && repetirContrasena !== null && repetirContrasena !== '') {
    // Validar igualdad de contraseñas
    if (contrasena !== repetirContrasena) {
      document.querySelector('.invalid-feedback.repetir-contrasena').textContent = "Las contraseñas no son iguales.";
      document.getElementById('txtRepetirContrasena').classList.add('is-invalid');
      document.querySelector('.invalid-feedback.repetir-contrasena').style.display = 'block';
      return false;
    }
  }

  // Repetir contraseña
  document.getElementById('txtRepetirContrasena').classList.remove('is-invalid');
  document.querySelector('.invalid-feedback.repetir-contrasena').textContent = "Este campo es obligatorio.";
  document.querySelector('.invalid-feedback.repetir-contrasena').style.display = 'none';
});

function validarContrasena() {
  let contrasena = document.getElementById('txtContrasena').value;

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
  document.getElementById('txtContrasena').classList.remove('is-invalid');
  document.querySelector('.invalid-feedback.contrasena').textContent = "Este campo es obligatorio.";
  document.querySelector('.invalid-feedback.contrasena').style.display = 'none';
}

function mostrarMensajeContrasena(mensaje) {
  document.getElementById('txtContrasena').classList.add('is-invalid');
  document.querySelector('.invalid-feedback.contrasena').textContent = mensaje;
  document.querySelector('.invalid-feedback.contrasena').style.display = 'block';
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
