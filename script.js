const form = document.querySelector('.top-banner form');
const apiKey = "7e2b9d637dafdfcef1ff7c2bffadbcce"
const inputVal = input.value;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
const data = {main, name, sys, weather};
const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

form.addEventListener('submit', e => {
    e.preventDefault();
    const inputVal = input.value;
});

fetch(url)
    .then(response => response.json())
    .then(data => {
        // do stuff with the data
    })
    .catch(() => {
        msg.textContent = "Please search for a valid city";
    });

const li = document.createElement('li');

li.classList.add('city');
const markup = `
<h2 class="city-name" data-name="${name},${sys.country}">
<span>${name}</span>
<sup>${sys.country}</sup>
</h2>
<div class="city-temp">${Math.round(main.temp)}<sup>°C</sup>
</div>
<figure>
<img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
<figcaption>${weather[0]["description"]}</figcaption>
</figure>
`;

li.innerHTML = markup;
list.appendChild(li);