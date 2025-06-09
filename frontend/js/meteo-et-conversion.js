// *************************** Taux de change de L'euro en Yen **********************************************************
// Remplacez 'VOTRE_CLE_API_EXCHANGERATE' par votre clé API réelle
const EXCHANGE_RATE_API_KEY = 'c5f1a09d7a03d22021f6bf88'; // <<< REMPLACEZ CECI !!!

async function getExchangeRate() {
    // API ExchangeRate-API pour EUR vers JPY
    const apiUrl = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/EUR`;
    console.log("apiUrl : ", apiUrl);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        const data = await response.json();
        console.log("Données de devise reçues:", data);

        if (data.result === "success" && data.conversion_rates && data.conversion_rates.JPY) {
            const eurToJpy = data.conversion_rates.JPY.toFixed(2); // Arrondi à 2 décimales
            document.getElementById('eur-jpy-rate').textContent = eurToJpy;
        } else {
            console.error("Données de taux de change non trouvées ou API erreur.", data);
            document.getElementById('eur-jpy-rate').textContent = 'N/A';
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du taux de change:", error);
        document.getElementById('eur-jpy-rate').textContent = 'Erreur';
    }
}

// *************************** Meteo Paris Tokyo **********************************************************

async function getWeatherData(city, latitude, longitude) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloudcover&hourly=rain`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        const data = await response.json();

        if (data.current && data.hourly && data.hourly.rain) {
            displayWeatherData(city, data.current, data.hourly.rain[0]);
        } else {
            console.error(`Données météo actuelles non trouvées pour ${city}.`, data);
            displayMenuErrorMessage(city);
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données météo pour ${city}:`, error);
        displayMenuErrorMessage(city);
    }
}

function displayWeatherData(city, currentData, rainData) {
    const temperatureId = city === "Paris" ? "paris-temperature" : "tokyo-temperature";
    const cloudcoverId = city === "Paris" ? "paris-cloudcover" : "tokyo-cloudcover";
    const rainId = city === "Paris" ? "paris-rain" : "tokyo-rain";

    document.getElementById(temperatureId).textContent = `${currentData.temperature_2m || 'N/A'} °C`;
    document.getElementById(cloudcoverId).textContent = `${currentData.cloudcover !== undefined && currentData.cloudcover !== null ? currentData.cloudcover : 'N/A'} %`;
    document.getElementById(rainId).textContent = `${rainData !== undefined && rainData !== null ? rainData : '0'} mm`;
}

function displayMenuErrorMessage(city) {
    const cityWeatherContainerId = city === "Paris" ? "paris-weather-menu" : "tokyo-weather-menu";
    const errorMessage = "Erreur de chargement";
    document.getElementById(cityWeatherContainerId).innerHTML = `<div class="city-name">Météo ${city}</div><div class="weather-data">${errorMessage}</div>`;
}

// Coordonnées de Paris
const parisLatitude = 48.8566;
const parisLongitude = 2.3522;

// Coordonnées de Tokyo
const tokyoLatitude = 35.6762;
const tokyoLongitude = 139.6503;

// *************************** Appels initiaux des fonctions **********************************************************
// Ces appels seront exécutés dès que le script est chargé et ajouté au DOM
getWeatherData("Paris", parisLatitude, parisLongitude);
getWeatherData("Tokyo", tokyoLatitude, tokyoLongitude);
getExchangeRate();

// Optionnel: Mettre à jour le taux de change toutes les 30 minutes
setInterval(getExchangeRate, 30 * 60 * 1000);