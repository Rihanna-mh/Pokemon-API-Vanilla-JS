async function getMultiplePokemonData() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const numberOfPokemons = 30; // Number of Pokémon data you want to fetch
  const dataArray = [];

  for (let i = 1; i <= numberOfPokemons; i++) {
    const url = `${baseUrl}${i}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      const data = await res.json();
      dataArray.push(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  console.log(dataArray);
  displayPokemonData(dataArray);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayPokemonData(dataArray) {
  const container = document.getElementById("pokemon-data");

  // Clear any existing content
  container.innerHTML = "";

  // Create and append a list item for each Pokémon's weight
  dataArray.forEach((pokemon, index) => {
    //capitalize first letter of each pokemon's name
    const name = capitalizeFirstLetter(pokemon.name);
    const weight = pokemon.weight;
    const height = pokemon.height;
    //using optional chaining & ternary operator
    const type1 = pokemon.types[0]?.type.name
      ? capitalizeFirstLetter(pokemon.types[0].type.name)
      : "";
    const type2 = pokemon.types[1]?.type.name
      ? "/" + capitalizeFirstLetter(pokemon.types[1].type.name)
      : "";

    //adding card class to the created p element
    const card = document.createElement("p");
    card.className = "card";
    card.innerHTML = `#${index + 1}<br>`;
    container.appendChild(card);

    const image = document.createElement("img");
    image.src = `${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"}${
      index + 1
    }${".png"}`;
    image.alt = `${name} photo`;
    image.width = 120;
    card.appendChild(image);

    const pokemonIdSpan = document.createElement("span");
    pokemonIdSpan.innerHTML = `<h2>${name}</h2> Weight &nbsp;&nbsp;&nbsp; Height <br> <b>${weight}kg</b> <b>${height}m</b> <br> <br> Type: <b>${type1}${type2}</b>`;
    card.appendChild(pokemonIdSpan);
  });
}

getMultiplePokemonData();
