"use client";

import '@/src/app/globals.css';
import WeatherScript from '@/src/app/script.jsx'; 

function Home() {
  return (
    <div className="wrapper">
      <h1>La Météo de Hugo</h1>
      <div className="tab-container">
        <WeatherScript /> 
      </div>
    </div>
  );
}

export default Home;
