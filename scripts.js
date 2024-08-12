document.onreadystatechange = function () {
  var state = document.readyState;
  if (state !== "complete") {
    document.getElementById("content").style.visibility = "hidden";
  } else if (state == "complete") {
    setTimeout(function () {
      document.getElementById("loader").style.visibility = "hidden";
      document.getElementById("content").style.visibility = "visible";
    }, 1000);
  }
};

async function getMultiplePokemonData() {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const numberOfPokemons = 100; // Number of Pokémon data you want to fetch
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
    const card = document.createElement("p"); // todo: I think div is a more appropriate element choice, since a card is typically a container
    card.className = "card";
    card.innerHTML = `#${index + 1}<br>`;
    container.appendChild(card);

    // Add Pokémon image
    const image = document.createElement("img");
    image.src = `${"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"}${
      index + 1
    }${".png"}`;
    image.alt = `${name} photo`;
    image.width = 120;
    card.appendChild(image);


    // Add Pokémon name
    const nameElement = document.createElement("h2");
    nameElement.textContent = name;
    card.appendChild(nameElement);

    // Add Pokémon weight and height side by side
    const statsContainer = document.createElement("div");
    statsContainer.className = "stats-container";

    const weightDiv = document.createElement("div");
    weightDiv.className = "stat";
    weightDiv.innerHTML = `<div class="stat-label">Weight</div><div class="stat-value">${weight} kg</div>`;
    statsContainer.appendChild(weightDiv);

    const heightDiv = document.createElement("div");
    heightDiv.className = "stat";
    heightDiv.innerHTML = `<div class="stat-label">Height</div><div class="stat-value">${height} m<br></br></div>`;
    statsContainer.appendChild(heightDiv);

    card.appendChild(statsContainer);

    // Add Pokémon type
    const typeElement = document.createElement("div");
    typeElement.innerHTML = `Type: <b>${type1}${type2}</b>`;
    card.appendChild(typeElement);

    const pokemonIdSpan = document.createElement("span");
    pokemonIdSpan.innerHTML = `<h2>${name}</h2> Weight &nbsp;&nbsp;&nbsp; Height <br> <b>${weight}kg</b> <b>${height}m</b> <br> <br> Type: <b>${type1}${type2}</b>`; //todo: the spacing here likely could have been achieved with css - adding in &nbsp; isn't ideal
    card.appendChild(pokemonIdSpan);

  });
}

getMultiplePokemonData();
