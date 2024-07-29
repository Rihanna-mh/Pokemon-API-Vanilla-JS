async function getMultiplePokemonData() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const numberOfPokemons = 10; // Number of Pokémon data you want to fetch
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

function displayPokemonData(dataArray) {
  const container = document.getElementById("pokemon-data");

  // Clear any existing content
  container.innerHTML = "";

  // Create and append a list item for each Pokémon's weight
  dataArray.forEach((pokemon, index) => {
    //capitalize first letter of each pokemon's name
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const weight = pokemon.weight;
    const height = pokemon.height;
    //using optional chaining
    const type1 = pokemon.types[0]?.type.name;
    const type2 = pokemon.types[1]?.type.name;

    const card = document.createElement("p");
    card.className = "card";
    card.innerHTML = `#${
      index + 1
    } <h2>${name}</h2> Weight: ${weight} Height: ${height} Type: ${type1}/${type2}`;
    container.appendChild(card);
  });
}

getMultiplePokemonData();
