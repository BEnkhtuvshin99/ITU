function fetchRSSFeed() {
    const xhr = new XMLHttpRequest();
    const rssUrl = "https://api.allorigins.win/raw?url=https://ikon.mn/rss";
    xhr.open("GET", rssUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
            displayNewsItems(xmlDoc);
        } else {
            console.error(`Failed to fetch RSS feed. Status: ${xhr.status} - ${xhr.statusText}`);
        }
    };
    xhr.onerror = function () {
        console.error("Network error occurred while fetching the RSS feed.");
    };
    xhr.send();
}


function displayNewsItems(xmlDoc) {
    const items = xmlDoc.querySelectorAll("item");
    const newsList = document.getElementById("news-list");
    items.forEach((item, index) => {
        const title = item.querySelector("title").textContent;
        const description = item.querySelector("description").textContent;
        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML = description;
        const firstImage = descriptionDiv.querySelector('img');
        let imageUrl = firstImage ? (firstImage.getAttribute('src') || firstImage.getAttribute('data-src')) : '';
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `
        <h3><a href="news-detail.html?id=${index}" class="news-link">${title}</a></h3>
            ${imageUrl ? `<img src="${imageUrl}" alt="${title} image" class="news-title-image" onerror="this.onerror=null; this.style.display='none'; console.error('Image failed to load: ' + this.src)" onload="this.classList.add('loaded')">` : ""} 
            
        `;
        newsList.appendChild(newsItem);
    });
}

function fetchNewsDetails() {
    const params = new URLSearchParams(window.location.search);
    const newsId = params.get("id");
    if (!newsId) {
        document.getElementById("news-detail").textContent = "Мэдээ сонгогдсонгүй.";
        return;
    }
    const xhr = new XMLHttpRequest();
    const rssUrl = "https://api.allorigins.win/raw?url=https://ikon.mn/rss";
    xhr.open("GET", rssUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
            displayNewsDetail(xmlDoc, newsId);
        }
    };
    xhr.send();
}

function displayNewsDetail(xmlDoc, id) {
    const items = xmlDoc.querySelectorAll("item");
    const selectedItem = items[id];
    if (selectedItem) {
        const title = selectedItem.querySelector("title").textContent;
        const description = selectedItem.querySelector("description").textContent;
        const link = selectedItem.querySelector("link").textContent;
        const descriptionDiv = document.createElement('div');
        descriptionDiv.innerHTML = description;
        const images = descriptionDiv.querySelectorAll('img');
        let imageUrls = [];
        images.forEach((img) => {
            const imageUrl = img.getAttribute('src') || img.getAttribute('data-src');
            if (imageUrl) {
                imageUrls.push(imageUrl);
            }
        });
        document.getElementById("news-detail").innerHTML = `
            ${imageUrls.length > 0 ? imageUrls.map(url => `<img src="${url}" alt="${title} image" class="news-detail-image" onerror="this.onerror=null; this.style.display='none'; console.error('Image failed to load: ' + this.src)" onload="this.classList.add('loaded')">`).join('') : ""}
            <h1>${title}</h1>
            <p>${description}</p>
            <a href="index.html">Мэдээний хураангуй-руу буцах</a>

        `;
    } else {
        document.getElementById("news-detail").textContent = "Мэдээ олдсонгүй.";
    }
}

if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
    window.onload = fetchRSSFeed;
} else if (window.location.pathname.endsWith("news-detail.html")) {
    window.onload = fetchNewsDetails;
}
