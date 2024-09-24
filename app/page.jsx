"use client";

import '@/app/globals.css';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import Recherche from '@/app/script'
import  switchTab  from '@/app/script.jsx';
import  {userTab } from '@/app/script.jsx';
import  {searchTab } from '@/app/script.jsx';


function Home() {
  return (

      <div class="wrapper">

<h1>La Météo de Hugo</h1>

<div class="tab-container">
    <button class="tab" data-userWeather>Votre Localisation</button>
    <button onClick={switchTab(searchTab)} class="tab" data-searchWeather>Recherche Localisation</button>
</div>
<div class="weather-container">


    <div class="sub-container grant-location-container">
        <Image src="/public/location.png" width="80" height="80" loading="lazy">
        </Image>
        <p>Donner accès à la localisation</p>
        <p>Autoriser l'accès pour obtenir des informations météorologiques</p>
        <button class="btn" data-grantAccess>Donner accès</button>
      </div>

    <form class="form-container" data-searchForm>
        <input placeholder="Rechercher une ville..." data-searchInput></input>
        <Button class="btn" type="submit"></Button>
            <Image src="/public/search.png"  width="20" height="20" loading="lazy"></Image>
    </form>

   
    <div class="sub-container loading-container">
        <Image src="/public/loading.gif" width="150" height="150"></Image>
        <p>Chargement</p>
    </div>


    <div class="sub-container user-info-container">

     
        <div class="name">
            <p data-cityName></p>
            <Image data-countryIcon></Image>
        </div>

       
        <p></p>
        
        <Image data-weatherIcon></Image>
      
        <p data-temp></p>

        <div class="parameter-container">

           
            <div class="parameter">
                <Image src="/public/wind.png"  width="20" height="20"></Image>
                <p>Vents</p>
                <p data-windspeed></p>
            </div>

           
            <div class="parameter">
                <Image src="/assets/humidity.png"  width="20" height="20"></Image>
                <p>Humidité</p>
                <p data-humidity></p>
            </div>

          
            <div class="parameter">
                <Image src="/assets/cloud.png"  width="20" height="20" ></Image>
                <p>Nuages</p>
                <p data-cloudiness></p>
            </div>

        </div>


    </div>

</div>



</div>
  );
}

export default Home;




