

let baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

function getIdFromUrl(url) {
    return url.slice(0, -1).split("/").pop()
}

const rootElm = document.querySelector("#root")

let pokeList = [];

function render() {
    rootElm.innerHTML = "";

    // header
    let headerElm = document.createElement("header")

    headerElm.innerHTML = `
        <input class = "search" type = "text" placeholder = "search">
        <button class="">#</button>
    `
    rootElm.append(headerElm)

    // main
    let mainElm = document.createElement("main")

    mainElm.innerHTML = `
        <ul class="pokemons">
         ${pokeList.map(function (pokemon) {
        return `
             <li>
                <p>#${getIdFromUrl(pokemon.url).padStart(3, "0")}</p>
                <img src="${baseUrl + getIdFromUrl(pokemon.url) + ".png"}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
             </li>
             `
    }).join("")}
        </ul>
    `
    rootElm.append(mainElm)

}


function init() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=90")
        .then(function (response) { return response.json() })
        .then(function (data) {
            pokeList = data.results
            render()
        })


}
init()