document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-container form');
    const loginResultado = document.getElementById('loginResultado');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        loginResultado.innerHTML = ''; // Limpiar mensaje previo

        // Obtener valores del formulario
        const email = document.getElementById('txtEmail').value;
        const password = document.getElementById('txtContrasena').value;

        // Validar formulario
        if (!loginForm.checkValidity()) {
            event.stopPropagation();
            loginForm.classList.add('was-validated');
            return;
        }

        // Validar credenciales
        const usuarios = JSON.parse(localStorage.getItem('usuarios'));

        const usuarioLogin = usuarios.find(user => user.email === email && user.contrasena === password);

        if(usuarioLogin && usuarioLogin.email === email && usuarioLogin.contrasena === password){
            loginResultado.innerHTML = '<p class="text-success">Inicio de sesión exitoso.</p>';
            // Aquí puedes redirigir al usuario a otra página o realizar otras acciones necesarias
            if(usuarioLogin.perfil === 'admin'){
                window.location.href = 'dashboard.html';
            }else{
                window.location.href = 'index.html';
            }
        } else {
            loginResultado.innerHTML = '<p class="text-danger">Correo electrónico o contraseña incorrectos.</p>';
        }
    });
});
