$(document).ready(function () {
    const mainDescriptionElement = $("#main_description");
    const iconElement = $("#icon");

    const weatherToType = {
        "Clear, clear sky": ["normal", "fire"],
        "Partly Cloudy": ["dragon", "steel"],
        "Cloudsovercast": ["flying", "rock"],
        "Clouds, broken clouds": ["fairy", "ground"],
        "Rainlight rain": ["grass", "bug"],
        "Rain": ["water", "dark"],
        "Thunderstorm": ["electric", "psychic"],
        "Snow": ["ice", "fighting"],
        "Mist": ["poison", "ghost"]
    };

    mainDescriptionElement.on("DOMSubtreeModified", function () {
        const main_description = mainDescriptionElement.text().trim();
        const selectedTypes = weatherToType[main_description];

        if (selectedTypes) {
            const randomType = selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
            showPokemonByType(randomType);
        } else {
            // Clouds, broken clouds
            if (main_description === "Clearclear sky") {
                const randomType = "fire";
                showPokemonByType(randomType);
            }
            else if (main_description === "Partly Cloudy") {
                const randomType = "dragon";
                showPokemonByType(randomType);
            }
            else if (main_description === "Cloudsovercast") {
                const randomType = "flying";
                showPokemonByType(randomType);
            }
            else if (main_description === "Clouds, broken clouds") {
                const randomType = "fairy";
                showPokemonByType(randomType);
            }
            else if (main_description === "Rainlight rain") {
                const randomType = "grass";
                showPokemonByType(randomType);
            }
            else if (main_description === "Rain") {
                const randomType = "water";
                showPokemonByType(randomType);
            }
            else if (main_description === "Thunderstorm") {
                const randomType = "electric";
                showPokemonByType(randomType);
            }
            else if (main_description === "Snow") {
                const randomType = "ice";
                showPokemonByType(randomType);
            }
            else if (main_description === "Mist") {
                const randomType = "ghost";
                showPokemonByType(randomType);
            }
            else {
                // When there are no text, hide Pokemon Images
                const pkmImagesElement = $("#pkmImages");
                const pkmNameElement = $("#pkmName");
                const pkmTypesElement = $("#pkmTypes");

                pkmImagesElement.attr("src", ""); // Image URL Reset
                pkmImagesElement.attr("alt", "");
                pkmNameElement.text("");
                pkmTypesElement.text("");
            }
        }
    });

    function showPokemonByType(type) {
        const apiUrl = `https://pokeapi.co/api/v2/type/${type}`;

        $.ajax({
            url: apiUrl,
            dataType: "json",
            success: function (data) {
                const pokemonList = data.pokemon;
                if (pokemonList.length > 0) {
                    const randomIndex = Math.floor(Math.random() * pokemonList.length);
                    const randomPokemon = pokemonList[randomIndex].pokemon;

                    const pokemonName = randomPokemon.name;
                    const pokemonImageUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}.png`;

                    const pkmImagesElement = $("#pkmImages");
                    const pkmNameElement = $("#pkmName");
                    const pkmTypesElement = $("#pkmTypes");

                    pkmImagesElement.attr("src", pokemonImageUrl); // Image URL Setting
                    pkmImagesElement.attr("alt", pokemonName);
                    pkmNameElement.text(`Name: ${pokemonName}`);
                    pkmTypesElement.text(`Types: ${type}`);
                }
            },
            error: function (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        });
    }
});
