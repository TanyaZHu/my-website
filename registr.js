document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("/backend/register.php", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("¡Registro exitoso! Ahora puede iniciar sesión.");
            window.location.href = "/pages/login.html";
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});
