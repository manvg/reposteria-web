document.addEventListener('DOMContentLoaded', function () {
    const nombreUsuarioCuenta = document.getElementById('nombreUsuarioCuenta');
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion')) || [];

    function obtenerDatosSesion() {
        if (datosSesion.length > 0) {
            nombreUsuarioCuenta.textContent = datosSesion.nombreUsuario;
            document.querySelector('.inicio-sesion').style.display = 'none';
            document.querySelector('.registro-usuario').style.display = 'none';
            document.querySelector('.cerrar-sesion').style.display = '';

        } else {
            nombreUsuarioCuenta.textContent = 'MI CUENTA';
            document.querySelector('.inicio-sesion').style.display = '';
            document.querySelector('.registro-usuario').style.display = '';
            document.querySelector('.cerrar-sesion').style.display = 'none';
        }
    }
    obtenerDatosSesion();

    // Selecciona el botón por su ID
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', function() {
        cerrarSesion();
    });

    function cerrarSesion(){
        localStorage.removeItem('datosSesion');
        window.location.href = 'index.html';
    }
});