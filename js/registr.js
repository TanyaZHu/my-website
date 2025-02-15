document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    console.log("📤 Sending data:", formData); // Логування відправлених даних

    fetch("/includes/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("📥 Server response:", data); // Вивід відповіді сервера в консоль

        if (data.success) {
            alert("✅ Registration successful! You can now log in.");
            window.location.href = "/pages/login.html";
        } else {
            alert("⚠️ Error: " + data.message);
        }
    })
    .catch(error => console.error("❌ Fetch error:", error));
});
