const form = document.querySelector("#search-form");
const input = document.querySelector("#artist-input");
const message = document.querySelector("#message");
const results = document.querySelector("#results");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const artistName = input.value;

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=album`;

    message.textContent = "Searching...";
    results.innerHTML = "";

    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
    message.textContent = "No albums found.";
    return;
    }

    data.results.forEach(function(album) {
        
        const date = new Date(album.releaseDate).getFullYear();
    results.innerHTML += `
        <div class="album">
        <img src="${album.artworkUrl100}">
        <h2>${album.collectionName}</h2>
        <p>${album.artistName}</p>
        <p>${date}</p>
        <a href="${album.collectionViewUrl}" target="_blank">View Album</a>
        </div>
    `;
    });

    message.textContent = `Found ${data.results.length} albums.`;
});