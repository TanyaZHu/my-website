document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");
    const currentUserId = new URLSearchParams(window.location.search).get("id") || userId;

    if (!currentUserId) {
        alert("¡Usuario no encontrado!");
        window.location.href = "/pages/login.html";
        return;
    }

    let response = await fetch(`/backend/user.php?user_id=${currentUserId}`);
    let data = await response.json();

    if (data.success) {
        let user = data.user;
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-email").textContent = user.email;
        document.getElementById("user-photo").src = user.avatar || "../assets/img/default-user.png";

        let animalList = document.getElementById("animal-list");
        animalList.innerHTML = "";

        user.animals.forEach(animal => {
            let div = document.createElement("div");
            div.innerHTML = `
                <div class="animal-card">
                    <img src="${animal.photo || '../assets/img/default-animal.png'}" alt="${animal.name}">
                    <h4>${animal.name}</h4>
                    <p>${animal.species}, ${animal.age} años</p>
                    ${userId === currentUserId ?
                        `<button onclick="editAnimal(${animal.id})">Editar</button>` :
                        `<button onclick="adoptAnimal(${animal.id})">Solicitar adopción</button>`}
                </div>`;
            animalList.appendChild(div);
        });
    } else {
        alert("Error: " + data.message);
    }
});
