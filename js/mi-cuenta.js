document.addEventListener('DOMContentLoaded', function() {
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const miCuentaForm = document.getElementById('miCuentaForm');
    const nombreUsuarioCuenta = document.getElementById('nombreUsuarioCuenta');

    obtenerDatosSesion();

    miCuentaForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const nombre = document.getElementById('txtNombre').value;
        const apellido = document.getElementById('txtApellido').value;
        const direccion = document.getElementById('txtDireccion').value;
        const telefono = document.getElementById('txtTelefono').value;
        const contrasenaActual = document.getElementById('txtContrasenaActual').value;
        const nuevaContrasena = document.getElementById('txtNuevaContrasena').value;

        // Aquí puedes agregar lógica para actualizar los datos en tu base de datos o localStorage
        // Por ejemplo, puedes usar las funciones registrarUsuario() o iniciarSesion() si son relevantes para tu caso

        // Limpiar formulario después de guardar cambios
        miCuentaForm.reset();
        mostrarAlerta('Cambios guardados exitosamente.', 'success');
    });

    function obtenerDatosSesion(){
        if(datosSesion){
            nombreUsuarioCuenta.textContent = datosSesion.nombreUsuario;
            obtenerDatosUsuario(datosSesion.emailUsuario);
        }else{
            nombreUsuarioCuenta.textContent = 'MI CUENTA';
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
});
