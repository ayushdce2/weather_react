import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

const [search,setSearch]=useState("Delhi");
const [allData,setAllData]=useState("");

const searchedData = (event)=>{

  setSearch(event.target.value);
}

useEffect(()=>{

  const fetchedData = async ()=>{
    console.log("useEffect hook is called");
    const API = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8ce722545c531de41cd4eec1e31ba094&units=metric`);
    const Response = await API.json();
    setAllData(Response);
    console.log(Response);

  }
  fetchedData();

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position)=>{
      console.log(position.coords.latitude.toFixed(4),"<>Lati----Longi<>",position.coords.longitude.toFixed(4));
    });
  } else {
    console.log("Not Supported")
  }


},[search]);


  return (
    <div className="App">
      
      <input type='search' onChange={searchedData}/>
      {!(allData?.sys?.country)? <p>NO DATA</p>: (<p>
        Country - {allData.sys.country}
        <br/>
        City - {allData.name}
        <br/>
        Humidity - {allData.main.humidity} %
        <br/>
        Temperature - {allData.main.temp} Celsius 
        <br/>
        Feels Like - {allData.main.feels_like} Celsius
        <br/>

        Pressure - {allData.main.pressure} hPa
        <br/>
        Weather - {allData.weather[0].main}
        <br/>
        Wind - {allData.wind.speed} m/sec
      </p>
)}
    </div>
  )
}

export default App;
