
document.addEventListener('DOMContentLoaded', function() {
    // Simulación de base de datos en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const datosSesion = JSON.parse(localStorage.getItem('datosSesion')) || [];

    //#region USUARIOS
    // Verificar si no hay usuarios y crear un usuario administrador
    if (usuarios.length === 0) {
        crearUsuarioAdmin();
    }
    
    // Función para registrar usuarios
    function registrarUsuario(nombre, apellido, direccion, telefono, email, contrasena) {
      const usuarioExistente = usuarios.find(user => user.email === email);
      
      if (usuarioExistente) {
        mostrarMensajeAlerta('Error','El usuario ya existe.');
        return false;
      }
      
      const perfil = 'Cliente';
      const nuevoUsuario = { nombre, apellido, direccion, telefono, email, contrasena, perfil };

      usuarios.push(nuevoUsuario);

      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      mostrarMensajeAlerta('Éxito','Usuario registrado exitosamente.');
      
      return true;
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
  
    //Exportar funciones
    window.registrarUsuario = registrarUsuario;
   //#endregion

   function crearUsuarioAdmin() {
    const nombre = 'Admin';
    const apellido = 'Admin';
    const direccion = 'Direccion admin';
    const telefono = '0000000000';
    const email = 'admin@reposteria.cl';
    const contrasena = '1234';
    const perfil = 'admin';

    const nuevoUsuario = { nombre, apellido, direccion, telefono, email, contrasena, perfil };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario administrador creado:', nuevoUsuario);
  }
  });
  
