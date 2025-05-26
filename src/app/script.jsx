<<<<<<< HEAD:src/app/script.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap"; 
import Image from 'next/image';
import Form from 'react-bootstrap/Form';

import windimg from '../../public/wind.png';
import humidityimg from '../../public/humidity.png';
import cloudimg from '../../public/cloud.png';
import tempimg from '../../public/temp.png';
import locationimg from '../../public/location.png';
import searchimg from '../../public/search.png'

const API_KEY = "964402627b378e490ab294704557c5c4";

const WeatherScript = ({city}) => {
  const [activeTab, setActiveTab] = useState("user");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [notFoundError,setNotFoundError]= useState(false)
  const [coordinates, setCoordinates] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  const grantAccessContainerRef = useRef(null);
  const searchFormRef = useRef(null);
  const userInfoContainerRef = useRef(null);
  const loadingScreenRef = useRef(null);

  useEffect(() => {
    // Toujours demander l'accès à la localisation à chaque chargement
    setShowLocationPrompt(true);
    setCoordinates(null);
    setWeatherData(null);
  }, []);

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === "search") {
      if (searchFormRef.current) {
        searchFormRef.current.classList.add("active");
      }
      if (userInfoContainerRef.current) {
        userInfoContainerRef.current.classList.remove("active");
      }
      if (grantAccessContainerRef.current) {
        grantAccessContainerRef.current.classList.remove("active");
      }
    } else {
      if (searchFormRef.current) {
        searchFormRef.current.classList.remove("active");
      }
      // On ne récupère plus depuis le sessionStorage
      setShowLocationPrompt(true);
      setCoordinates(null);
      setWeatherData(null);
    }
  };

  const fetchUserWeatherInfo = async (coords) => {
    const { lat, lon } = coords;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await response.json();
      setLoading(false);
      setWeatherData(data);
      if (userInfoContainerRef.current) {
        userInfoContainerRef.current.classList.add("active");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchSearchWeatherInfo = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await response.json();
      setLoading(false);
      setWeatherData(data);
      if (userInfoContainerRef.current) {
        userInfoContainerRef.current.classList.add("active");
      }
    } catch (error) {
      console.log("problème ville entrée");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userCoordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setCoordinates(userCoordinates);
        setShowLocationPrompt(false); // Masquer le bloc après acceptation
        fetchUserWeatherInfo(userCoordinates);
      });
    }
  };

  const renderWeatherInfo = () => {
    if (!weatherData) return null;
    const { name, sys, weather, main, wind, clouds } = weatherData;
    return (


   


      <div>
        <div className="city-container">
        <h2>{name}</h2>
        <img
          src={`https://flagcdn.com/144x108/${sys?.country?.toLowerCase()}.png`}
          alt={sys?.country}
          className="imgCountry"
        />
        </div>
        <br></br>
        <div className="textMeteo">
        
      <div className="card-container">
  <div className="card-main">
  <Image  src={tempimg} width="80" height="80" alt="Temperature icone" data-weatherIcon />
    <h3>  {`${Math.round(main?.temp)} °C`}</h3>
  </div>
  <div className="card card-1"> 
  <div class="card-body ">
  <img
          src={`http://openweathermap.org/img/w/${weather?.[0]?.icon}.png`}
          width="80"
           height="80"np
          alt="weather-icon" className="imgLocation data-weatherIcon"
          
        />
       </div><div className="text-card">{weather?.[0]?.description}</div></div>
       
  <div className="card card-2"><Image  src={windimg} width="80" height="80" alt="Icone Vent" data-weatherIcon />
  <div class="card-body text-card">
  {`${wind?.speed} m/s`}
       </div></div>

  <div className="card card-3"><Image  src={humidityimg} width="80" height="80" alt="Icone Humidité" data-weatherIcon />
  <div class="card-body text-card">
    
  {`${main?.humidity}%`}
       </div></div>

  <div className="card card-4"><Image  src={cloudimg} width="80" height="80" alt="Icone nuages"  data-weatherIcon/>
  <div class="card-body text-card">
  {`${clouds?.all}%`}
       </div></div>

       <div className="card-main title-text">
        Prévisions météo prochains jours :
       </div>

       <div className="card card-1"> 
  <div class="card-body">
  <img
          src={`http://openweathermap.org/img/w/${weather?.[0]?.icon}.png`}
          width="80"
           height="80"np
          alt="weather-icon" className="imgLocation data-weatherIcon"
          
        />
        
       </div><div className="text-card">
       Demain:
       <br></br>
       {weather?.[0]?.description}</div></div>

       <div className="card card-1"> 
  <div class="card-body">
  <img
          src={`http://openweathermap.org/img/w/${weather?.[0]?.icon}.png`}
          width="80"
           height="80"np
          alt="weather-icon" className="imgLocation data-weatherIcon"
          
        />
       </div><div className="text-card">
       Après-demain:
       <br></br>
       {weather?.[0]?.description}</div></div>

       <div className="card card-1"> 
  <div class="card-body">
  <img
          src={`http://openweathermap.org/img/w/${weather?.[0]?.icon}.png`}
          width="80"
           height="80"np
          alt="weather-icon" className="imgLocation data-weatherIcon"
          
        />
       </div><div className="text-card">
       Dans 3 jours:
       <br></br>
       {weather?.[0]?.description}</div></div>

       <div className="card card-1"> 
  <div class="card-body">
  <img
          src={`http://openweathermap.org/img/w/${weather?.[0]?.icon}.png`}
          width="80"
           height="80"np
          alt="weather-icon" className="imgLocation data-weatherIcon"
          
        />
       </div><div className="text-card">
       Dans 4 jours:
       <br></br>
       {weather?.[0]?.description}</div></div>


</div>
      </div>
      </div>
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (cityInput === "") return;
    fetchSearchWeatherInfo(cityInput);  
    
  };

  return (
    <div>
      <div className="tabs button-container">
        <Button
        className="boutton button-1 card-body"
          variant={activeTab === "user" ? "primary" : "outline-primary"}
          onClick={() => switchTab('user')}
        >
          Votre localisation
        </Button>
        
        <Button
        className="boutton button-2 card-body"
          variant={activeTab === "search" ? "primary" : "outline-primary"}
          onClick={() => switchTab('search')}
        >
          Rechercher ville
        </Button>
     

      <Button
        className="boutton button-3 card-body"
          variant={activeTab === "map" ? "primary" : "outline-primary"}
          onClick={() => switchTab('map')}
        >
          Carte Météo
        </Button>
      </div>

     

      {activeTab === "user" && showLocationPrompt && (
        <div ref={grantAccessContainerRef} className="grant-location-container">
            <Image src={locationimg} width="80" height="80" alt="Location icon" />
    <p>Donner accès à la localisation</p>
    <p>Autoriser l'accès pour obtenir des informations météorologiques</p>
    <Button className="btn" onClick={getLocation}>
      Accorder l'accès
    </Button>
    </div>
      )}

{activeTab === "map" && (
  <div> <iframe src="https://www.meteoblue.com/fr/meteo/cartes/widget/paris-12_france_6618618?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto" 
   frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" 
   className="map"></iframe><div><a  target="_blank" rel="noopener"></a>
   </div></div>
)}

      {activeTab === "search" && (
        <div ref={searchFormRef} className="search-form active">
          <form onSubmit={handleSearchSubmit}>
          <br></br>
            <Form.Control type="text" placeholder="Entrez le nom de la ville"  value={cityInput}
              onChange={(e) => setCityInput(e.target.value)} />
              <br></br>
            <Button className="btn" type="submit">
              <Image src={searchimg} width="20" height="20" alt="Search icon" />
              Rechercher
            </Button>
          </form>
        </div>
      )}

      {loading ? (
        <div ref={loadingScreenRef} className="loading-container">
          <Image src="/public/loading.gif" width="150" height="150" alt="Loading" />
          <p>Chargement...</p>
        </div>
      ) : null}

      <div ref={userInfoContainerRef} className="user-info-container">
        {renderWeatherInfo()}
      </div>
    </div>
  );
};


export default WeatherScript;
=======
import { useRef } from "react";

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");



let oldTab = userTab;
const API_KEY = "964402627b378e490ab294704557c5c4";



///////////
oldTab.classList.add("current-tab");
getfromSessionStorage();



function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")) {
         
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
          
            getfromSessionStorage();
        }
    }
}


{/*
userTab.addEventListener("click", () => {
 
    switchTab(userTab);
});
*/}


{/*
searchTab.onClick={switchTab(searchTab)};
}
*/}



function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates) {
   
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;

    grantAccessContainer.classList.remove("active");

    loadingScreen.classList.add("active");

    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
          );
        const  data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        loadingScreen.classList.remove("active");
    

    }

}

function renderWeatherInfo(weatherInfo) {


    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    console.log(weatherInfo);

   
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;


}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
       
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessButton = document.querySelector("[data-grantAccess]");

{/*
grantAccessButton.addEventListener("click", getLocation);
*/}

const searchInput = document.querySelector("[data-searchInput]");

{/*
    searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})
*/}

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err) {
        
    }
}




>>>>>>> 1e116bc2960805c2227713eead64b7a88b040cf1:app/script.jsx
