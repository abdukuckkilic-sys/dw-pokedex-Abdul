let baseurl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/"
let pokeurl = "https://pokeapi.co/api/v2/pokemon/1/"


function getIdFromUrl(url) {
    return url.slice(0, -1).split("/").pop()
}

let newString = getIdFromUrl(pokeurl)
console.log(newString)

let imageString = baseurl + getIdFromUrl(pokeurl) + '.png'

console.log(imageString)



// <img="${baseurl + getIdFromUrl(pokeurl) + '.png'}"