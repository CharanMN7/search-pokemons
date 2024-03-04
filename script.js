/* Constants */

// search functionality + random
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-pokemon");

// detials card
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

// pokemon sprite
const sprite = document.getElementById("sprite");

// stats
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// api
const api = "https://pokeapi.co/api/v2/pokemon/";

/* Fucntions */

// returns an abject containing all the required fields.
const getData = async (query) => {
  const res = await fetch(api + query);
  const data = await res.json();
  console.log(data);
  const pokemon = {};
  pokemon.name = data.name;
  pokemon.id = data.id;
  pokemon.weight = data.weight;
  pokemon.height = data.height;
  pokemon.types = [];
  data.types.forEach((obj) => {
    pokemon.types.push(obj.type.name);
  });
  data.stats.forEach((obj) => {
    pokemon[obj.stat.name] = obj.base_stat;
  });
  // pokemon.sprite = data.sprites.front_default;
  pokemon.sprite = data.sprites.other.showdown.front_default;
  return pokemon;
};

// updates the DOM with all the values recieved from API
const update = async () => {};

// fetches data using the search query given by the user
const search = async () => {};

// fetches data of a random pokemon
const random = async () => {};
