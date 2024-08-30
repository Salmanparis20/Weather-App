const weatherForm = document.querySelector('.form');
const cityInput = document.querySelector(".cityInput");
const search = document.querySelector(".search");
const WeatherResult = document.querySelector(".result");

const apiKey = 'f10a07e4d02974aa7962774bdfa78468';


async function WeatherSets(City) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${apiKey}`;
    const urlResponse = await fetch(apiUrl);
    console.log(urlResponse);
    if (!urlResponse.ok) {
        throw new Error("Data Not Found");
    }
    else {
        return urlResponse.json();
    }
}
function setError(message) {
    const DisplayError = document.createElement('p');
    DisplayError.textContent = message;
    WeatherResult.textContent = ' ';
    WeatherResult.style.display = "flex";
    WeatherResult.appendChild(DisplayError);
}


weatherForm.addEventListener('submit', async e => {
    e.preventDefault();

    const City = cityInput.value;

    if (City) {
        try {
            const data = await WeatherSets(City)
            console.log(data)
            DisplayWeather(data);
        }
        catch (error) {
            console.log(error);
            // setError(error);
        }
    }
    else {
        setError("Data not found");
        // console.log(error);
    }
})


function DisplayWeather(data) {
    const {
        name,
        main: { humidity, temp },
        weather: [{ description, id }],
    } = data;

    WeatherResult.textContent = ' ';
    WeatherResult.style.display = "flex";

    const dcity = document.createElement('h2');
    const dhumidity = document.createElement('p');
    const dtemp = document.createElement('p');
    const ddescription = document.createElement('p');
    const dimg = document.createElement('p');

    dcity.textContent = name;
    dtemp.textContent = `Temp:${((temp - 273.15)).toFixed(1)}°C`;
    dhumidity.textContent = `Humidity:${humidity}%`;
    ddescription.textContent = description;
    dimg.textContent = WeatherImage(id);


    dcity.classList.add('name');
    dtemp.classList.add('temp');
    dhumidity.classList.add('humidity');
    ddescription.classList.add('description');
    dimg.classList.add('WeatherImage');

    WeatherResult.appendChild(dcity);
    WeatherResult.appendChild(dtemp);
    WeatherResult.appendChild(dhumidity);
    WeatherResult.appendChild(ddescription);
    WeatherResult.appendChild(dimg);

}


function WeatherImage(id) {
    switch (true) {
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 400):
            return "🌧️";
        case (id >= 500 && id < 600):
            return "🌦️";
        case (id >= 600 && id < 700):
            return "❄️";
        case (id >= 600 && id <= 700):
            return "❄️";
        case (id >= 701 && id < 800):
            return "💨";
        case (id === 800):
            return "☀️";
        case (id >= 801 && id < 810):
            return "🌤️";
        default:
            return "❔"
    }
}
