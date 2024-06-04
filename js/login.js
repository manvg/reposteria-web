document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-container form');
    const loginResultado = document.getElementById('loginResultado');
    const containerLogin = document.getElementById('iniciarSesion');

    //#region Iniciar sesión
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        loginResultado.innerHTML = ''; //Limpiar mensaje previo

        const email = document.getElementById('txtEmail').value;
        const password = document.getElementById('txtContrasena').value;

        if (!loginForm.checkValidity()) {
            event.stopPropagation();
            loginForm.classList.add('was-validated');
            return;
        }

        //Validar credenciales
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));

        const usuarioLogin = usuarios.find(user => user.email === email && user.contrasena === password);

        if(usuarioLogin && usuarioLogin.email === email && usuarioLogin.contrasena === password){
            guardarDatosSesion(usuarioLogin);

            loginResultado.innerHTML = '<p class="text-success">Inicio de sesión exitoso.</p>';

            if(usuarioLogin.perfil === 'admin'){
                window.location.href = 'dashboard.html';
            }else{
                window.location.href = 'mi-cuenta.html';
            }
        } else {
            mostrarMensajeAlerta('Error','Correo electrónico o contraseña incorrectos.')
        }
    });
    //#endregion
    
    //#region Datos sesión
    function guardarDatosSesion(usuarioLogin) {
        let datosSesion = {
            emailUsuario: usuarioLogin.email,
            nombreUsuario: usuarioLogin.nombre,
            perfilUsuario: usuarioLogin.perfil,
            contrasenaUsuario: usuarioLogin.contrasena
        }
        const datosSesionJSON = JSON.stringify(datosSesion);
        localStorage.setItem('datosSesion', datosSesionJSON);

        return true;
    }

    //Función para obtener los datos de inicio de sesión desde localStorage
    function obtenerDatosSesion() {
        return localStorage.getItem('datosSesion');
    }

    //#endregion

    //#region Recuperar contraseña
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordContainer = document.getElementById('forgotPasswordContainer');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    forgotPasswordContainer.style.display = 'none';//Por defecto

    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        containerLogin.style.display = 'none';
        forgotPasswordContainer.style.display = '';
    });

    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('forgotEmail').value;
        mostrarMensajeAlerta('Éxito','Si este email posee una cuenta, se enviará un enlace de recuperación a ' + email);
        containerLogin.style.display = '';
        forgotPasswordContainer.style.display = 'none';
        
    });
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
