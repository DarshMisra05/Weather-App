document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");
    const form = document.querySelector('.top-banner form');
    const input = document.querySelector('.top-banner input');
    const msg = document.querySelector('.msg');
    const list = document.querySelector('.ajax-section .cities');
    const apiKey = "7e2b9d637dafdfcef1ff7c2bffadbcce";

    if (!form || !input || !msg || !list) {
        console.error("One or more required elements are not found in the DOM");
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputVal = input.value.trim();
        console.log("Form submitted with input:", inputVal);

        // Validate input
        if (!inputVal) {
            msg.textContent = "Please enter a city name.";
            return;
        }

        // Check for duplicate city
        const listItems = Array.from(list.querySelectorAll('.city'));
        if (listItems.some(item => {
            const cityNameSpan = item.querySelector('.city-name span');
            return cityNameSpan && cityNameSpan.textContent.toLowerCase() === inputVal.toLowerCase();
        })) {
            msg.textContent = "City already exists. Please search for another city.";
            form.reset();
            input.focus();
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
        console.log("Fetching data from:", url);

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                console.log("API response:", data);
                const { main, name, sys, weather } = data;
                const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

                const li = document.createElement('li');
                li.classList.add('city');
                const markup = `
                    <h2 class="city-name" data-name="${name},${sys.country}">
                        <span>${name}</span>
                        <sup>${sys.country}</sup>
                    </h2>
                    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                    <figure>
                        <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
                        <figcaption>${weather[0]["description"]}</figcaption>
                    </figure>
                `;
                li.innerHTML = markup;
                list.appendChild(li);

                msg.textContent = "";
                form.reset();
                input.focus();
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                msg.textContent = "Please search for a valid city.";
            });
    });
});