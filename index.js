var episodes_container = document.getElementById("episodes-container")

function make_episode(ep) {
    // ep has name, desc, and src
    let episode = document.createElement("div")
    episode.classList.add("episode")
    
    let name = document.createElement("div")
    name.classList.add("name")
    name.innerText = ep["name"]
    episode.appendChild(name)

    let index = document.createElement("div")
    index.classList.add("index")
    index.innerText = "ep:" + (episodes.length - i).toString()
    episode.appendChild(index)
    
    let desc = document.createElement("div")
    desc.classList.add("desc")
    desc.innerHTML = ep["desc"]
    episode.appendChild(desc)

    let player = document.createElement("div")
    player.classList.add("player")
    episode.appendChild(player)

    let player_btn = document.createElement("img")
    player_btn.classList.add("btn")
    player_btn.src = "assets/images/btn_play.png"
    player.appendChild(player_btn)

    let player_bar = document.createElement("div")
    player_bar.classList.add("bar")
    player.appendChild(player_bar)

    return episode
}

for (var i = 0; i < episodes.length; i++) {
    let ep = episodes[i]
    let episode = make_episode(ep)
    episodes_container.appendChild(episode)
}