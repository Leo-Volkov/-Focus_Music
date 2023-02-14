let containerAlbum = document.querySelector(`.album`);

let search = new URLSearchParams(window.location.search);

let i = search.get(`i`);

// готово! i это нужное нам число
let album = albums[i];

if (!album) {
    containerAlbum.innerHTML += `ОШИБКА, редирект на главную страницу произойдёт через 5 сикунд`;
    setTimeout(() => {
        window.location.pathname = `index.html`;
    }, 5000);

} else {

    containerAlbum.innerHTML += `
        <div class="card">
            <div class="row">
                <div class="col-4">
                    <img src="assets/альбомы/${album.img}.png" alt="иконка альбома" class="img-fluid rounded-start">
                </div>
                <div class="col-8">
                    <div class="card-bode">
                    <h5 class="card-title">${album.titel}</h5>
                    <p class="card-text">${album.description}</p>
                    <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></p>
                    </div>
                </div>
            </div>
        </div>
    `;

    let containerPlaylist = document.querySelector(`.playlist`);

    var tracks = album.tracks;

    for (let j = 0; j < tracks.length; j++) {
        let track = tracks[j];
        containerPlaylist.innerHTML += `
            <li class="track list-group-item d-flex align-items-center">
                <img src="assets/page 1/play.png" alt="play" class="img-play me-3" width="40px">
                <img src="assets/page 1/пауза.png" alt="пауза" class="img-pause me-3 d-none" width="40px">
                <div>
                    <div>${track.title}</div>
                    <div class="text-secondary">${track.author}</div>
                </div>
                <div>
                    <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 0%;"></div>
                </div>
                <div class="ms-auto time">${track.time}</div>
                <audio class="audio" src="${track.src}"></audio>
            </li>
        `;
    }
};


function setupAudio() {

    // Найди коллекцию с треками
    let trackNodes = document.querySelectorAll(`.track`);

    for (let i = 0; i < trackNodes.length; i++) {

        // Один элемент
        let track = tracks[i];
        let node = trackNodes[i];
        let timeNode = node.querySelector(`.time`);
        let imgPause = node.querySelector(`.img-pause`);
        let imgPlay = node.querySelector(`.img-play`);
        let progress = node.querySelector(`.progress-bar`);

        // Тег аудио внутри этого элемента
        let audio = node.querySelector(`.audio`);

        node.addEventListener(`click`, function () {
            
            // Если трек сейчас играет...
            if (track.isPlaying) {
                track.isPlaying = false;
                // Поставить на паузу
                audio.pause();

                imgPause.classList.add(`d-none`);
                imgPlay.classList.remove(`d-none`);

                // Если трек сейчас не играет...
            } else {
                track.isPlaying = true;

                // Включить проигрывание
                audio.play();

                imgPause.classList.remove(`d-none`);
                imgPlay.classList.add(`d-none`);
                updateProgress();
            };
        });
        
        function updateProgress() {

            // Нарисовать актуальное время 
            let time = grtTime(audio.currentTime);
            if(timeNode.innerHTML != time){
                timeNode.innerHTML = time;
            };

            if (track.isPlaying) {
                requestAnimationFrame(updateProgress);
                progress.style.width = audio.currentTime*100/audio.duration + `%`;
            }

        };
    };

};

    setupAudio();
    function grtTime(time){
        let currentSeconds = Math.floor(time);
        let minutes = Math.floor(currentSeconds/60);
        let seconds = Math.floor(currentSeconds%60);

        if (minutes < 10) {
            minutes = `0` + minutes;
        }//01:50
        if (seconds < 10) {
            seconds = `0` + seconds;
        }
        return `${minutes}:${seconds}`
    }

    