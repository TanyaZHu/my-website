document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("/backend/login.php", {
        method: "POST",
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem("userId", data.id);
            sessionStorage.setItem("userRole", data.role);
            alert("¡Inicio de sesión exitoso!");
            window.location.href = "/pages/user.html";
        } else {
            alert("Error: " + data.message);
        }
    })
    .catch(error => console.error("Error:", error));
});
