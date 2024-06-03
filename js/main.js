document.addEventListener('DOMContentLoaded', function () {
    const nombreUsuarioCuenta = document.getElementById('nombreUsuarioCuenta');
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion')) || null;

    function obtenerDatosSesion() {
        if (datosSesion !== null) {
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

    //#region Mensaje alerta
    const toastLiveExample = document.getElementById('liveToast');
    const tituloAlerta = document.getElementById('txtTituloAlerta');
    const mensajeAlerta = document.getElementById('txtAlertaMensaje');

    function mostrarMensajeAlerta(titulo,mensaje){
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        if(titulo === 'Error'){
            tituloAlerta.style.backgroundColor = 'red';
        }
        if(titulo === 'Ok'){
            tituloAlerta.style.backgroundColor = 'green';
        }
        tituloAlerta.textContent = titulo;
        mensajeAlerta.textContent = mensaje;
        toastBootstrap.show()
    }
    //#endregion
});