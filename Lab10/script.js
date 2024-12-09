function extractImages(htmlContent) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  const imageSelectors = [
    'img[data-src]',  // Lazy load images
    'img[src]',       // Standard images
    '.ikonlazy'       // Specific class for your feed
  ];

  const images = imageSelectors
    .flatMap(selector => Array.from(tempDiv.querySelectorAll(selector)))
    .map(img => img.getAttribute('data-src') || img.getAttribute('src'))
    .filter(src => src && src.trim() !== '');

  // Prefer higher resolution images (x974 in your case)
  return images.filter(url => url.includes('x974.jpg')) || images;
}

function fetchRSSFeed() {
  const xhr = new XMLHttpRequest();
  const rssUrl = "rss.xml";
  xhr.open("GET", rssUrl, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
      displayNewsItems(xmlDoc);
    } else {
      console.error("RSS fetch error: " + xhr.status);
    }
  };
  xhr.onerror = () => console.error("RSS request failed");
  xhr.send();
}

function displayNewsItems(xmlDoc) {
  const items = xmlDoc.querySelectorAll("item");
  const newsList = document.getElementById("news-list");

  items.forEach((item, index) => {
    const title = item.querySelector("title").textContent;
    const description = item.querySelector("description").textContent;

    const images = extractImages(description);
    const imageUrl = images[0] || '';

    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.innerHTML = `
      ${imageUrl ? `
        <img 
          src="${imageUrl}" 
          alt="${title} image"
          class="news-title-image"
          onerror="this.style.display='none'"
          onload="this.classList.add('loaded')"
        >` : ""}
      <h3><a href="news-detail.html?id=${index}" class="news-link">${title}</a></h3>
    `;
    newsList.appendChild(newsItem);
  });
}

function fetchNewsDetails() {
  const params = new URLSearchParams(window.location.search);
  const newsId = params.get("id");

  if (!newsId) {
    document.getElementById("news-detail").textContent = "No news item selected.";
    return;
  }

  const xhr = new XMLHttpRequest();
  const rssUrl = "rss.xml";
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

    const images = extractImages(description);

    document.getElementById("news-detail").innerHTML = `
      ${images.length > 0 ? images.map(url => `
        <img 
          src="${url}" 
          alt="${title} image"
          class="news-detail-image"
          onerror="this.style.display='none'"
          onload="this.classList.add('loaded')"
        >`).join('') : ""}
      <h1>${title}</h1>
      <p>${description}</p>
      <a href="${link}" target="_blank">Read Full Article</a>
    `;
  } else {
    document.getElementById("news-detail").textContent = "News item not found.";
  }
}

// Page detection logic
if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
  window.onload = fetchRSSFeed;
} else if (window.location.pathname.endsWith("news-detail.html")) {
  window.onload = fetchNewsDetails;
}