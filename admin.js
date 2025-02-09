document.addEventListener("DOMContentLoaded", function () {
    fetch("/backend/admin.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let tableBody = document.querySelector("tbody");
                tableBody.innerHTML = "";
                data.users.forEach(user => {
                    let row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td><button onclick="deleteUser(${user.id})">Eliminar</button></td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            }
        })
        .catch(error => console.error("Error al cargar usuarios:", error));
});

function deleteUser(userId) {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        fetch(`/backend/admin.php?delete=${userId}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Usuario eliminado correctamente.");
                location.reload();
            } else {
                alert("Error: " + data.message);
            }
        });
    }
}
