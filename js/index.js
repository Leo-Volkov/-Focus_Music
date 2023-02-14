let containerAlbums = document.querySelector(`.albums`);

for (let i = 0; i < albums.length; i++) {
    let album = albums[i];
    containerAlbums.innerHTML += `
        <div class="col-lg-2 col-6">
            <a href="album_тяжёлые_будни.html?i=${i}" class="text-decoration-none ">
                <div class="card">
                    <div class="card-body">
                    <p class="card-text">${album.titel}</p>
                    </div>
                </div>
            </a>
        </div>
    `;
};