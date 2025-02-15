document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get("id");
    const userId = sessionStorage.getItem("userId");

    try {
        let response = await fetch(`/backend/api.php?animal_id=${animalId}`);
        let animalData = await response.json();

        document.getElementById("animal-name").textContent = animalData.name;
        document.getElementById("animal-age").textContent = animalData.age;
        document.getElementById("animal-gender").textContent = animalData.gender === "M" ? "Male" : "Female";
        document.getElementById("animal-health").textContent = animalData.health_info;
        document.getElementById("animal-description").textContent = animalData.description;

        const adoptButton = document.getElementById("adopt-btn");

        if (animalData.owner_id !== userId) {
            adoptButton.addEventListener("click", async function () {
                let adoptionRequest = await fetch("/includes/adopt.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ animal_id: animalId, user_id: userId })
                });

                let result = await adoptionRequest.json();
                alert(result.message);
            });
        } else {
            adoptButton.style.display = "none"; // Приховуємо кнопку, якщо власник переглядає свою тварину
        }
    } catch (error) {
        console.error("Error fetching animal data:", error);
    }
});
