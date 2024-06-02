
document.addEventListener('DOMContentLoaded', function() {
    // Simulación de base de datos en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  // Verificar si no hay usuarios y crear un usuario administrador
    if (usuarios.length === 0) {
        crearUsuarioAdmin();
    }
    // Función para registrar usuarios
    function registrarUsuario(nombre, apellido, direccion, telefono, email, contrasena) {
      console.log('Intentando registrar usuario:', { nombre, apellido, direccion, telefono, email, contrasena });
      const usuarioExistente = usuarios.find(user => user.email === email);
      
      if (usuarioExistente) {
        mostrarAlerta('El usuario ya existe.', 'danger');
        console.log('El usuario ya existe.');
        return false;
      }
      
      const perfil = 'Cliente';
      const nuevoUsuario = { nombre, apellido, direccion, telefono, email, contrasena, perfil };
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      mostrarAlerta('Usuario registrado exitosamente.', 'success');
      console.log('Usuario registrado exitosamente:', nuevoUsuario);
      return true;
    }
  
    // Función para iniciar sesión
    // function iniciarSesion(email, contrasena) {
    //   console.log('Intentando iniciar sesión:', { email, contrasena });
    //   const usuario = usuarios.find(user => (user.email === email) && user.contrasena === contrasena);
    //   if (usuario) {
    //     mostrarAlerta('Inicio de sesión exitoso.', 'success');
    //     console.log('Inicio de sesión exitoso:', usuario);
    //     return true;
    //   } else {
    //     mostrarAlerta('Email/Usuario o contraseña incorrectos.', 'danger');
    //     console.log('Email/Usuario o contraseña incorrectos.');
    //     return false;
    //   }
    // }
  
    // Función para mostrar alertas
    function mostrarAlerta(mensaje, tipo) {
      const alertaDiv = document.createElement('div');
      alertaDiv.className = `alert alert-${tipo}`;
      alertaDiv.appendChild(document.createTextNode(mensaje));
      const container = document.querySelector('.container');
      const firstChild = container.firstChild;
      
      // Insertar la alerta al principio del contenedor
      if (firstChild) {
        container.insertBefore(alertaDiv, firstChild);
      } else {
        container.appendChild(alertaDiv);
      }
  
      // Desaparecer alerta después de 3 segundos
      setTimeout(() => {
        const alerta = document.querySelector('.alert');
        if (alerta) {
          alerta.remove();
        }
      }, 6000);
    }
  
    // Exportar funciones
    window.registrarUsuario = registrarUsuario;
    //window.iniciarSesion = iniciarSesion;

    function crearUsuarioAdmin() {
      const nombre = 'Admin';
      const apellido = 'Admin';
      const direccion = 'Direccion admin';
      const telefono = '0000000000';
      const email = 'admin@reposteria.cl';
      const contrasena = 'Admin123';
      const perfil = 'admin';

      const nuevoUsuario = { nombre, apellido, direccion, telefono, email, contrasena, perfil };
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      console.log('Usuario administrador creado:', nuevoUsuario);
  }

  const btnLimpiarStorage = document.getElementById('btnLimpiarStorage');

  btnLimpiarStorage.addEventListener('click', function() {
    localStorage.removeItem('usuarios');
    alert('localStorage limpiado.');
  });

  });
  
