document.addEventListener("DOMContentLoaded", async function () {
    let animalsList = document.getElementById("animals-list");
    let searchInput = document.getElementById("search");
    let filterCheckboxes = document.querySelectorAll(".filters input[type='checkbox']");
    let locationRadios = document.querySelectorAll(".filters input[name='location']");
    let genderRadios = document.querySelectorAll(".filters input[name='gender']");

    // Завантаження всіх тварин
    async function loadAnimals() {
        let response = await fetch("/backend/animals.php");
        let data = await response.json();

        if (data.success) {
            displayAnimals(data.animals);
        } else {
            animalsList.innerHTML = "<p>Помилка завантаження даних.</p>";
        }
    }

    // Відображення тварин
    function displayAnimals(animals) {
        animalsList.innerHTML = "";
        animals.forEach(animal => {
            if (matchesFilters(animal)) {
                let div = document.createElement("div");
                div.classList.add("animal-card");
                div.innerHTML = `
                    <img src="${animal.photo || '../images/default-animal.png'}" alt="${animal.name}">
                    <h4>${animal.name}</h4>
                    <p>${animal.species}, ${animal.age} років</p>
                    <button onclick="viewAnimal(${animal.id})">Revisar</button>
                `;
                animalsList.appendChild(div);
            }
        });
    }

    // Перевірка відповідності фільтрам
    function matchesFilters(animal) {
        let searchTerm = searchInput.value.toLowerCase();
        let selectedCategories = [...filterCheckboxes].filter(c => c.checked).map(c => c.value);
        let selectedLocation = [...locationRadios].find(r => r.checked)?.value;
        let selectedGender = [...genderRadios].find(r => r.checked)?.value;

        let matchesSearch = animal.name.toLowerCase().includes(searchTerm);
        let matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(animal.species.toLowerCase());
        let matchesLocation = !selectedLocation || animal.location === selectedLocation;
        let matchesGender = !selectedGender || animal.gender === selectedGender;

        return matchesSearch && matchesCategory && matchesLocation && matchesGender;
    }

    searchInput.addEventListener("input", loadAnimals);
    filterCheckboxes.forEach(c => c.addEventListener("change", loadAnimals));
    locationRadios.forEach(r => r.addEventListener("change", loadAnimals));
    genderRadios.forEach(r => r.addEventListener("change", loadAnimals));

    // Перехід на сторінку тварини
    function viewAnimal(animalId) {
        window.location.href = `/pages/animal.html?id=${animalId}`;
    }

    loadAnimals();
});
