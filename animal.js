document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get("id") || 1; // Беремо ID тварини з URL


    try {
        let response = await fetch(`http://localhost/api.php?animal_id=${animalId}`);
        let animalData = await response.json();


        document.getElementById("animal-name").textContent = animalData.name;
        document.getElementById("animal-age").textContent = animalData.age;
        document.getElementById("animal-gender").textContent = animalData.gender === "M" ? "Male" : "Female";
        document.getElementById("animal-species").textContent = animalData.species;
        document.getElementById("animal-health").textContent = animalData.health_info;
        document.getElementById("animal-description").textContent = animalData.description;


        const gallery = document.getElementById("photo-gallery");
        gallery.innerHTML = "";
        animalData.photos.forEach(photoUrl => {
            let img = document.createElement("img");
            img.src = photoUrl;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error("Error fetching animal data:", error);
    }
});