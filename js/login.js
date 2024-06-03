document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-container form');
    const loginResultado = document.getElementById('loginResultado');
    const containerLogin = document.getElementById('iniciarSesion');

    //Iniciar sesión
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
            guardarDatosSesion(usuarioLogin.email, usuarioLogin.nombre, usuarioLogin.perfil);

            loginResultado.innerHTML = '<p class="text-success">Inicio de sesión exitoso.</p>';

            if(usuarioLogin.perfil === 'admin'){
                window.location.href = 'dashboard.html';
            }else{
                window.location.href = 'mi-cuenta.html';
            }
        } else {
            loginResultado.innerHTML = '<p class="text-danger">Correo electrónico o contraseña incorrectos.</p>';
        }
    });

    //#region Datos sesión
    function guardarDatosSesion(email,nombreUsuario, perfil) {
        let datosSesion = {
            emailUsuario: email,
            nombreUsuario: nombreUsuario,
            perfilUsuario: perfil
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
        mostrarAlerta('Se ha enviado un enlace de recuperación a ' + email, 'success');
        containerLogin.style.display = '';
        forgotPasswordContainer.style.display = 'none';
        
    });

    function mostrarAlerta(mensaje, tipo) {
        const alertaDiv = document.createElement('div');
        alertaDiv.className = `alert alert-${tipo}`;
        alertaDiv.appendChild(document.createTextNode(mensaje));
        loginResultado.appendChild(alertaDiv); //Agregar la alerta al div loginResultado
    
        //Desaparecer alerta después de 3 segundos
        setTimeout(() => {
            const alerta = document.querySelector('.alert');
            if (alerta) {
                alerta.remove();
            }
        }, 3000);
    }
    //#endregion
});
