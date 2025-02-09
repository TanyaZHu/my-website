document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        alert("Por favor, inicie sesión.");
        window.location.href = "/pages/login.html";
        return;
    }

    let response = await fetch(`/backend/applications_received.php?owner_id=${userId}`);
    let data = await response.json();

    if (data.success) {
        let table = document.getElementById("applications-table");
        table.innerHTML = "";

        data.applications.forEach(app => {
            let row = `<tr>
                <td>${app.id}</td>
                <td>${app.animal_name}</td>
                <td>${app.user_name}</td>
                <td>${app.status}</td>
                <td>
                    ${app.status === 'pending' ? 
                        `<button onclick="approveApplication(${app.id}, '${app.user_email}', '${app.user_phone}')">Aprobar</button>
                         <button onclick="rejectApplication(${app.id})">Rechazar</button>` 
                        : app.status === 'approved' ? 
                        `<button onclick="leaveReview(${app.user_id})">Dejar una reseña</button>` 
                        : "Revisado"}
                </td>
            </tr>`;
            table.innerHTML += row;
        });
    } else {
        alert("Error al cargar solicitudes.");
    }
});
