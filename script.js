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
  try {
    const res = await fetch(api + query);
    const data = await res.json();
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
    if (pokemon.sprite == null) {
      pokemon.sprite = data.sprites.front_default;
    }
    return pokemon;
  } catch (err) {}
};

// updates the DOM with all the values recieved from API
const update = async (data) => {
  try {
    const pokemon = await data;
    pokemonName.textContent = pokemon.name;
    pokemonId.textContent = pokemon.id;
    weight.textContent = pokemon.weight;
    height.textContent = pokemon.height;

    let typesHtml = ``;
    pokemon.types.forEach((type) => {
      typesHtml += `<span id="${type} type">${type}</span>`;
    });
    types.innerHTML = typesHtml;

    sprite.src = pokemon.sprite;
    hp.textContent = pokemon.hp;
    attack.textContent = pokemon.attack;
    defense.textContent = pokemon.defense;
    specialAttack.textContent = pokemon["special-attack"];
    specialDefense.textContent = pokemon["special-defense"];
    speed.textContent = pokemon.speed;
  } catch (err) {
    alert("Pokemon not found");
  }
};

// fetches data using the search query given by the user
const search = async (query) => {
  const pokemon = await getData(query);
  return pokemon;
};

// fetches data of a random pokemon
const randomPokemon = async () => {
  const id = Math.ceil(Math.random() * 1025);
  console.log(id);
  searchInput.innerText = "";
  const pokemon = await search(id);
  await update(pokemon);
};

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const query = searchInput.value;
  const pokemon = await search(query);
  await update(pokemon);
});

randomButton.addEventListener("click", async (e) => {
  e.preventDefault();
  await randomPokemon();
});
