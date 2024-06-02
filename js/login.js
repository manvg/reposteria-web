document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
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
        const usuario = JSON.parse(localStorage.getItem('usuario'));

        if (usuario && usuario.email === email && usuario.contrasena === password) {
            loginResultado.innerHTML = '<p class="text-success">Inicio de sesión exitoso.</p>';
            // Aquí puedes redirigir al usuario a otra página o realizar otras acciones necesarias
            window.location.href = 'dashboard.html'; // Ejemplo de redirección
        } else {
            loginResultado.innerHTML = '<p class="text-danger">Correo electrónico o contraseña incorrectos.</p>';
        }
    });
});
