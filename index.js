/************************************
 * Episodes Data
 ************************************/

var episodes_container = document.getElementById("episodes-container")

/************************************
 * Generate HTML
 ************************************/

function make_episode(ep) {
    // ep has name, desc, and src
    let episode = document.createElement("div")
    episode.classList.add("episode")
    
    let name = document.createElement("div")
    episode.appendChild(name)
    name.classList.add("name")
    name.innerText = ep["name"]

    let index = document.createElement("div")
    episode.appendChild(index)
    index.classList.add("index")
    index.innerText = "ep:" + (episodes.length - i).toString()
    
    let desc = document.createElement("div")
    episode.appendChild(desc)
    desc.classList.add("desc")
    desc.innerHTML = ep["desc"]

    if (ep.hasOwnProperty("link")) {
        let link = document.createElement("a")
        episode.appendChild(link)
        link.classList.add("link")
        link.target = "_blank"
        link.innerText = "- Read More -"
        link.href = ep["link"]
    }

    // PLAYER

    let audio_player = document.createElement("div")
    audio_player.classList.add("audio-player")
    episode.appendChild(audio_player)
    audio_player.innerHTML = `
        <button class="audio-play"><i class="fa fa-play"></i><span>Play</span></button>
        <button class="audio-pause"><i class="fa fa-pause"></i><span>Pause</span></button>
        <div class="audio-progress-container">
            <span class="audio-currenttime audio-time">00:00:00</span>
            <progress class="audio-progress" value="0"></progress>
            <span class="audio-duration audio-time">00:00:00</span>
        </div>
        <button class="audio-speed">1x</button>
        <button class="audio-rewind"><i class="fa fa-fast-backward"></i><span>Rewind</span></button>`

    let audio_source = document.createElement("audio")
    audio_player.appendChild(audio_source)
    audio_source.src = ep.src

    connect_audio(audio_player)

    return episode
}

/************************************
 * Connect Audio
 ************************************/

var speeds = [ 1, 1.5, 2, 2.5, 3 ]

function connect_audio(audio_player) {
    let player = audio_player

    var audio = player.querySelector('audio');
    var play = player.querySelector('.audio-play');
    var pause = player.querySelector('.audio-pause');
    var rewind = player.querySelector('.audio-rewind');
    var progress = player.querySelector('.audio-progress');
    var speed = player.querySelector('.audio-speed');
    var currentTime = player.querySelector('.audio-currenttime');
    var duration = player.querySelector('.audio-duration');

    var currentSpeedIdx = 0;

    pause.style.display = 'none';

    var toHHMMSS = function ( totalsecs ) {
        var sec_num = parseInt(totalsecs, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours; }
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}

        var time = hours+':'+minutes+':'+seconds;
        return time;
    }

    audio.addEventListener('loadedmetadata', function(){
        progress.setAttribute('max', Math.floor(audio.duration));
        duration.textContent  = toHHMMSS(audio.duration);
    });

    audio.addEventListener('timeupdate', function(){
        progress.setAttribute('value', audio.currentTime);
        currentTime.textContent  = toHHMMSS(audio.currentTime);
    });

    play.addEventListener('click', function(){
        this.style.display = 'none';
        pause.style.display = 'inline-block';
        pause.focus();
        audio.play();
    }, false);

    pause.addEventListener('click', function(){
        this.style.display = 'none';
        play.style.display = 'inline-block';
        play.focus();
        audio.pause();
    }, false);

    rewind.addEventListener('click', function(){
        audio.currentTime -= 30;
    }, false);

    progress.addEventListener('click', function(e){
    audio.currentTime = Math.floor(audio.duration) * (e.offsetX / e.target.offsetWidth);
    }, false);

    speed.addEventListener('click', function(){
        currentSpeedIdx = currentSpeedIdx + 1 < speeds.length ? currentSpeedIdx + 1 : 0;
        audio.playbackRate = speeds[currentSpeedIdx];
        this.textContent  = speeds[currentSpeedIdx] + 'x';
        return true;
    }, false);
}

/************************************
 * Run
 ************************************/

for (var i = 0; i < episodes.length; i++) {
    let ep = episodes[i]
    let episode = make_episode(ep)
    episodes_container.appendChild(episode)
}