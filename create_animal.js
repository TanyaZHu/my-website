document.getElementById("animal-form").addEventListener("submit", async function (event) {
    event.preventDefault();


    const formData = {
        add_animal: true,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        species: document.getElementById("species").value,
        gender: document.getElementById("gender").value,
        description: document.getElementById("description").value,
        health_info: document.getElementById("health_info").value,
        owner_id: 1, // ID власника (замініть на реальний)
        photos: document.getElementById("photos").value.split(",")
    };


    let response = await fetch("http://localhost/api.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });


    let result = await response.json();
    alert(result.message);
    if (result.status === "success") window.location.href = "user.html";
});