const apiKey = 'cd52183d41e9233f4f27c8a1ff2f26f6';

function showSuggestions(input) {
    const suggestionsContainer = document.getElementById("suggestions");

    if (input.length > 0) {
        // Fetch city suggestions from a geocoding API
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    suggestionsContainer.innerHTML = '';
                    data.forEach(city => {
                        const suggestionItem = document.createElement("div");
                        suggestionItem.className = "suggestion-item";
                        suggestionItem.textContent = `${city.name}, ${city.country}`;
                        suggestionItem.addEventListener("click", () => {
                            document.getElementById("cityInput").value = `${city.name}, ${city.country}`;
                            suggestionsContainer.innerHTML = '';
                        });
                        suggestionsContainer.appendChild(suggestionItem);
                    });
                } else {
                    suggestionsContainer.innerHTML = 'No suggestions found';
                }
            })
            .catch(error => {
                console.error('Error fetching city suggestions:', error);
            });
    } else {
        suggestionsContainer.innerHTML = '';
    }
}

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    const city = cityInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { name, main, weather, wind, sys } = data;
            const temperature = main.temp;
            const description = weather[0].description;
            const humidity = main.humidity;
            const windSpeed = wind.speed;
            const country = sys.country;

            const resultHtml = `<p>City: ${name}, ${country}</p>
                                <p>Temperature: ${temperature} °C</p>
                                <p>Sky Condition: ${description}</p>
                                <p>Humidity: ${humidity}%</p>
                                <p>Wind Speed: ${windSpeed} m/s</p>`;

            weatherInfo.innerHTML = resultHtml;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. City not found';
        });
}