document.addEventListener("DOMContentLoaded", function () {
    const userId = sessionStorage.getItem("userId"); 
    const guestMenu = document.getElementById("guest-menu");
    const userMenu = document.getElementById("user-menu");

    if (userId) {
        guestMenu.style.display = "none"; // Приховуємо кнопки входу та реєстрації
        userMenu.style.display = "flex";  // Відображаємо меню користувача
    } else {
        guestMenu.style.display = "flex";  // Відображаємо кнопки входу та реєстрації
        userMenu.style.display = "none";   // Приховуємо меню користувача
    }

    // Відкриття випадаючого меню
    document.getElementById("user-avatar").addEventListener("click", function () {
        document.getElementById("dropdown-menu").classList.toggle("show");
    });

    // Закриття меню при кліку поза ним
    document.addEventListener("click", function (event) {
        let menu = document.getElementById("dropdown-menu");
        let avatar = document.getElementById("user-avatar");

        if (!menu.contains(event.target) && !avatar.contains(event.target)) {
            menu.classList.remove("show");
        }
    });

    // Додавання обробника виходу
    document.getElementById("logout-btn").addEventListener("click", function () {
        sessionStorage.removeItem("userId");
        window.location.href = "/index.html"; // Після виходу переходимо на головну сторінку
    });
});
