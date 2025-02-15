document.addEventListener("DOMContentLoaded", async function () {
    const userId = sessionStorage.getItem("userId");
    const currentUserId = new URLSearchParams(window.location.search).get("id") || userId;

    if (!currentUserId) {
        alert("Користувача не знайдено!");
        window.location.href = "/pages/login.html";
        return;
    }

    try {
        let response = await fetch(`/backend/user.php?user_id=${currentUserId}`);
        let data = await response.json();

        if (data.success) {
            let user = data.user;
            document.getElementById("user-name").textContent = user.name;
            document.getElementById("user-email").textContent = user.email;
            document.getElementById("user-photo").src = user.avatar || "../images/default-user.png";

            let animalList = document.getElementById("animal-list");
            animalList.innerHTML = "";

            user.animals.forEach(animal => {
                let div = document.createElement("div");
                div.innerHTML = `
                    <div class="animal-card">
                        <img src="${animal.photo || '../images/default-animal.png'}" alt="${animal.name}">
                        <h4>${animal.name}</h4>
                        <p>${animal.species}, ${animal.age} років</p>
                        ${userId === currentUserId ?
                            `<button onclick="editAnimal(${animal.id})">Редагувати</button>` :
                            `<button onclick="adoptAnimal(${animal.id})">Подати заявку</button>`}
                    </div>
                `;
                animalList.appendChild(div);
            });
        }
    } catch (error) {
        console.error("Помилка при отриманні даних користувача:", error);
    }
});

// 🔹 Випадаюче меню в хедері
document.getElementById("user-avatar").addEventListener("click", function () {
    document.getElementById("dropdown-menu").classList.toggle("show");
});

// 🔹 Закриття меню при кліку поза ним
document.addEventListener("click", function (event) {
    let menu = document.getElementById("dropdown-menu");
    let avatar = document.getElementById("user-avatar");

    if (!menu.contains(event.target) && !avatar.contains(event.target)) {
        menu.classList.remove("show");
    }
});

// 🔹 Функція для редагування тварини (при натисканні на кнопку "Редагувати")
function editAnimal(animalId) {
    window.location.href = `/pages/edit_animal.html?id=${animalId}`;
}

// 🔹 Функція для подання заявки на всиновлення
function adoptAnimal(animalId) {
    fetch("/includes/adopt.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animal_id: animalId, user_id: sessionStorage.getItem("userId") })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Помилка подачі заявки:", error));
}
