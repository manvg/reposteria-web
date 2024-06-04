document.addEventListener('DOMContentLoaded', function() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    function listarUsuarios() {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        if (usuarios.length === 0) {
            userList.innerHTML = '<p class="text-warning">No hay usuarios registrados.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'table table-striped';

        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Perfil</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.direccion}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.email}</td>
                <td>${usuario.perfil}</td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        userList.appendChild(table);
    }

    listarUsuarios();

    const btnLimpiarStorage = document.getElementById('btnLimpiarStorage');

    btnLimpiarStorage.addEventListener('click', function() {
      localStorage.removeItem('usuarios');
      localStorage.removeItem('datosSesion');
      alert('localStorage limpiado.');
      window.location.href = 'login.html'
    });
    
});
