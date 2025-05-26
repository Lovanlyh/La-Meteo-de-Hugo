"use client";

import '@/src/app/globals.css';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import WeatherScript from '@/src/app/script.jsx'; 

function Home({params}) {
  let city =  params.weather
  return (
    <div className="wrapper">
      <h1>La Météo de Hugo</h1>
      <div className="tab-container">
        <WeatherScript city={city}/> 
      </div>
    </div>
  );
}

export default Home;
