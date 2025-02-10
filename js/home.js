document.addEventListener("DOMContentLoaded", function () {
    fetch("/backend/news.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let newsContainer = document.getElementById("news-container");
                newsContainer.innerHTML = "";
                data.news.forEach(news => {
                    let newsItem = document.createElement("div");
                    newsItem.classList.add("news-item");
                    newsItem.innerHTML = `<h3>${news.title}</h3><p>${news.content}</p>`;
                    newsContainer.appendChild(newsItem);
                });
            }
        })
        .catch(error => console.error("Error al cargar noticias:", error));
});
