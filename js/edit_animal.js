document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get("id");

    if (!animalId) {
        alert("Тварину не знайдено!");
        window.location.href = "/pages/user.html";
        return;
    }

    // Отримуємо поточні дані тварини
    try {
        let response = await fetch(`/backend/animal.php?animal_id=${animalId}`);
        let animal = await response.json();

        if (animal.success) {
            document.getElementById("name").value = animal.data.name;
            document.getElementById("age").value = animal.data.age;
        }
    } catch (error) {
        console.error("Помилка завантаження даних:", error);
    }

    // Обробка форми редагування
    document.querySelector("form").addEventListener("submit", async function (event) {
        event.preventDefault();

        let formData = new FormData(this);
        formData.append("id", animalId);

        let response = await fetch("/includes/update_animal.php", {
            method: "POST",
            body: formData
        });

        let result = await response.json();
        if (result.success) {
            alert("Дані оновлено!");
            window.location.href = `/pages/user.html`;
        } else {
            alert("Помилка оновлення: " + result.message);
        }
    });
});
