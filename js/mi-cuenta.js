document.addEventListener('DOMContentLoaded', function() {
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const miCuentaForm = document.getElementById('miCuentaForm');
    const cambiarContrasenaForm = document.getElementById('cambiarContrasenaForm');
    const nombreUsuarioCuenta = document.getElementById('nombreUsuarioCuenta');

    obtenerDatosSesion();

    miCuentaForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const nombre = document.getElementById('txtNombre').value;
        const apellido = document.getElementById('txtApellido').value;
        const direccion = document.getElementById('txtDireccion').value;
        const telefono = document.getElementById('txtTelefono').value;

        if (datosSesion.length === 0) {
            mostrarMensajeAlerta('Error','Inicia sesión para modificar tus datos.');
            return;
        }

        const usuarioIndex = usuarios.findIndex(user => user.email === datosSesion.emailUsuario);
        if (usuarioIndex === -1) {
            mostrarMensajeAlerta('Error','Usuario no encontrado.');
            return;
        }
    
        usuarios[usuarioIndex].nombre = nombre;
        usuarios[usuarioIndex].apellido = apellido;
        usuarios[usuarioIndex].direccion = direccion;
        usuarios[usuarioIndex].telefono = telefono;

        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
        mostrarMensajeAlerta('Éxito','Cambios guardados.');
        miCuentaForm.reset();

        nombreUsuarioCuenta.textContent = nombre;
    });

    cambiarContrasenaForm.addEventListener('submit', function(event) {
        const contrasenaActual = document.getElementById('txtNuevaContrasenaActual').value;
        const nuevaContrasena = document.getElementById('txtNuevaContrasena').value;
        
        const usuarioIndex = usuarios.findIndex(user => user.email === emailRecuperacion);
        if (usuarioIndex === -1) {
            mostrarMensajeAlerta('Error','Usuario no encontrado.');
            return;
        }

        // const usuarioActual = usuarios[usuarioIndex];
        if (usuarioActual.contrasena !== contrasenaActual) {
            mostrarMensajeAlerta('Error','La contraseña actual no es correcta.');
            return;
        }

        // Actualizar los datos de sesión si se cambió la contraseña
        if (nuevaContrasena !== usuarioActual.contrasena) {
            localStorage.setItem('datosSesion', JSON.stringify({
                emailUsuario: emailUsuario,
                nombreUsuario: nombre + ' ' + apellido // Actualizar el nombre de usuario en la sesión
            }));
        }
    });

    function obtenerDatosSesion(){
        if(datosSesion){
            nombreUsuarioCuenta.textContent = datosSesion.nombreUsuario;
            obtenerDatosUsuario(datosSesion.emailUsuario);
        }else{
            nombreUsuarioCuenta.textContent = 'MI CUENTA';
            mostrarMensajeAlerta('Error','Debe iniciar sesión para modificar datos.');
            setTimeout(() => {
                window.location.href = 'index.html'
              }, 3000);
        }
    }

    function obtenerDatosUsuario(email){
        const usuario = usuarios.find(user => user.email === email);
        if(usuario){
            document.getElementById('txtNombre').value = usuario.nombre;
            document.getElementById('txtApellido').value = usuario.apellido;
            document.getElementById('txtDireccion').value = usuario.direccion;
            document.getElementById('txtTelefono').value = usuario.telefono;
        }
    }

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
  document.querySelector('.invalid-feedback.contrasena').textContent = "Este campo es obligatorio.";
  document.querySelector('.invalid-feedback.contrasena').style.display = 'none';
}

function mostrarMensajeContrasena(mensaje) {
  document.getElementById('txtNuevaContrasena').classList.add('is-invalid');
  document.querySelector('.invalid-feedback.contrasena').textContent = mensaje;
  document.querySelector('.invalid-feedback.contrasena').style.display = 'block';
}
//#endregion

    
//#region Mensaje alerta
const toastLiveExample = document.getElementById('liveToast');
const tituloAlerta = document.getElementById('txtTituloAlerta');
const mensajeAlerta = document.getElementById('txtAlertaMensaje');

function mostrarMensajeAlerta(titulo,mensaje){
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    tituloAlerta.textContent = titulo;
    mensajeAlerta.textContent = mensaje;
    toastBootstrap.show()
}
//#endregion
});
