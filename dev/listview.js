let baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

function getIdFromUrl(url) {
    return url.slice(0, -1).split("/").pop()
}

const rootElm = document.querySelector("#root")

let pokeList = [];

const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC"
}

function renderList() {
    rootElm.innerHTML = "";

    // header
    let headerElm = document.createElement("header")

    headerElm.innerHTML = `
          <div class="title">
        <img class="logo" src="billede/pokeball.png" alt="Pokéball">
        <h1>Pokédex</h1>
    </div>
    <div class="controls">
        <label class="search-wrap">
           <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
<rect width="12" height="12" fill="#1E1E1E"/>
<g id="PokÃ©dex List - Sort by Name">
<rect width="360" height="640" transform="translate(-30 -65.9833)" fill="#DC0A2D"/>
<g id="Frame 29">
<g id="Filters">
<g id="Search Bar" filter="url(#filter0_i_314_3)">
<rect x="-14" y="-9.98334" width="280" height="32" rx="16" fill="white"/>
<g id="search">
<path id="Vector" d="M10.9 11.6333L6.88333 7.61667C6.55 7.90556 6.16111 8.13056 5.71667 8.29167C5.27222 8.45278 4.8 8.53333 4.3 8.53333C3.1 8.53333 2.08333 8.11667 1.25 7.28333C0.416667 6.45 0 5.44444 0 4.26667C0 3.08889 0.416667 2.08333 1.25 1.25C2.08333 0.416667 3.09444 0 4.28333 0C5.46111 0 6.46389 0.416667 7.29167 1.25C8.11944 2.08333 8.53333 3.08889 8.53333 4.26667C8.53333 4.74444 8.45555 5.20556 8.3 5.65C8.14444 6.09444 7.91111 6.51111 7.6 6.9L11.65 10.9167C11.75 11.0056 11.8 11.1194 11.8 11.2583C11.8 11.3972 11.7444 11.5222 11.6333 11.6333C11.5333 11.7333 11.4111 11.7833 11.2667 11.7833C11.1222 11.7833 11 11.7333 10.9 11.6333ZM4.28333 7.53333C5.18333 7.53333 5.95 7.21389 6.58333 6.575C7.21667 5.93611 7.53333 5.16667 7.53333 4.26667C7.53333 3.36667 7.21667 2.59722 6.58333 1.95833C5.95 1.31944 5.18333 1 4.28333 1C3.37222 1 2.59722 1.31944 1.95833 1.95833C1.31944 2.59722 1 3.36667 1 4.26667C1 5.16667 1.31944 5.93611 1.95833 6.575C2.59722 7.21389 3.37222 7.53333 4.28333 7.53333Z" fill="#DC0A2D"/>
</g>
</g>
</g>
</g>
</g>
<defs>
<filter id="filter0_i_314_3" x="-14" y="-9.98334" width="280" height="33" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_innerShadow_314_3"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_314_3"/>
</filter>
</defs>
</svg>
            <input class="search" type="text" placeholder="Search">
        </label>
        <button class="sort" type="button">A</button>
    </div>
    `
    rootElm.append(headerElm)


    let cards = ""

    for (let pokemon of pokeList) {
        let id = getIdFromUrl(pokemon.url)
        cards += `
            <li onclick="renderDetail(${id})">
                <p>#${id.padStart(3, "0")}</p>
                <img src="${baseUrl + id}.png" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
            </li>`
    }

    // main
    let mainElm = document.createElement("main")
    mainElm.innerHTML = `<ul class="pokemons">${cards}</ul>`
    rootElm.append(mainElm)
}

function renderDetail(id) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then(function (response) { return response.json() })
        .then(function (pokemon) {

            let color = typeColors[pokemon.types[0].type.name]

            let move1 = pokemon.moves[0].move.name
            let move2 = pokemon.moves[1].move.name

            let types = ""
            for (let t of pokemon.types) {
                types += `<span class="type" style="background:${typeColors[t.type.name]}">${t.type.name}</span>`
            }

            let stats = ""
            for (let p of pokemon.stats) {
                stats += `
                    <div class="stat-row">
                        <span class="stat-name">${p.stat.name}</span>
                        <span class="stat-val">${p.base_stat}</span>
                        <div class="bar"><div class="fill" style="width:${p.base_stat / 2}%; background:${color}"></div></div>
                    </div>`
            }

            rootElm.innerHTML = `
                <header class="detail-header" style="background:${color}">
                    <button class="back" onclick="renderList()">←</button>
                    <span class="id">#${String(pokemon.id).padStart(3, "0")}</span>
                    <h1>${pokemon.name}</h1>
                    <img class="detail-img" src="${baseUrl + pokemon.id}.png">
                </header>
                <main class="detail-main">
                    <div class="types">${types}</div>
                    <h3 class="section-title" style="color:${color}">About</h3>
                    <div class="about-grid">
                        <div><strong>${pokemon.weight / 10} kg</strong><br>Weight</div>
                        <div><strong>${pokemon.height / 10} m</strong><br>Height</div>
                        <div class="about-box">
                         <p class="about-value"><strong>${move1}</strong><br><strong>${move2}</strong></p>
                        <p class="about-label">Moves</p>
                    </div>
                    </div>
                    <h3 class="section-title" style="color:${color}">Base Stats</h3>
                    <div class="stats">${stats}</div>
                </main>`
        })
}

function init() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=400")
        .then(function (response) { return response.json() })
        .then(function (data) {
            pokeList = data.results
            renderList()
        })
}
init()