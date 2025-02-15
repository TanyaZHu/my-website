document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(this);
    let jsonData = Object.fromEntries(formData.entries());

    fetch("/includes/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("✅ Registration successful! You can now log in.");
            window.location.href = "/pages/login.html";
        } else {
            alert("⚠️ Error: " + data.message);
        }
    })
    .catch(error => console.error("❌ Fetch error:", error));
});
