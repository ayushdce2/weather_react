import './App.css';
import { useEffect, useState } from 'react';


import Ash from "./img/ash.jpg";
import Clear from "./img/clearSky.png";
import Clouds from "./img/clouds.png";
import Drizzle from "./img/Drizzle.png";
import Dust from "./img/dust.jpg";
import Fog from "./img/fog.jpg";
import Haze from "./img/haze.jpg";
import Mist from "./img/mist.jpg";
import Rain from "./img/rain.png";
import Sand from "./img/sand.jpg";
import Smoke from "./img/smoke.jpg";
import Snow from "./img/snow.png";
import Squall from "./img/squall.jpg";
import Thuderstorm from "./img/thunderstorm.png";
import Tornado from "./img/tornado.avif";





function App() {

const weatherBackground = {
  "Ash": Ash,
  "Clear": Clear,
  "Clouds": Clouds,
  "Drizzle":Drizzle,
  "Dust":Dust,
  "Fog":Fog,
  "Haze":Haze,
  "Mist":Mist,
  "Rain":Rain,
  "Sand":Sand,
  "Smoke":Smoke,
  "Snow":Snow,
  "Squall":Squall,
  "Thunderstorm":Thuderstorm,
  "Tornado":Tornado


}


const [search,setSearch]=useState("Delhi");
const [allData,setAllData]=useState("");
const [uiError,setUiError] = useState("");
const [weatherBg, setWeatherBg] = useState("");

const searchedData = (event)=>{

  setSearch(event.target.value);
}

useEffect(()=>{

  const fetchedData = async ()=>{
    // console.log("useEffect hook is called");
    const API = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8ce722545c531de41cd4eec1e31ba094&units=metric`);
    const Response = await API.json();
    setAllData(Response);
    // console.log(Response);
    document.querySelector('input, search').focus();
    

try{

   setWeatherBg(Response?.weather[0]?.main);
      
    }catch(error){
      // console.log(error);
      setUiError("type complete name of city");
    };


  }
  fetchedData();

},[search]);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WeekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const currentDate = new Date();
const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]
  }`;

  return (
    <div className="App" style={{"backgroundImage":`url("${weatherBackground[weatherBg]}")`}}>
      <div className='weather_wrap'>
      <input type='search' onChange={searchedData} placeholder="City full name"/>

      {!(allData?.sys?.country)? <><p>{uiError}</p><p>NO DATA Found</p></>: (<>
      
        <p className='font_bold'>{date}</p>
        <hr/>
      <div className='weather_data'>
           <div>
           
              <p className='font_bold'>
              Country - {allData.sys.country}
              </p>
              <p className='font_bold'>
              City - {allData.name}
              </p>
              <img src={`https://openweathermap.org/img/wn/${allData.weather[0].icon}@2x.png`}/>
              
          </div>
          <div>
            
            
            <p>
              Humidity - {allData.main.humidity} %
              </p>
              <p>
              Temperature - {allData.main.temp} Celsius 
              </p>
              <p>
              Feels Like - {allData.main.feels_like} Celsius
              </p>
              <p>
              Pressure - {allData.main.pressure} hPa
              </p>
              <p>
              Weather - {allData.weather[0].main}
              </p>
              <p>
              Wind - {allData.wind.speed} m/sec
            </p>
          </div>

          </div>
          
      </>
)}
</div>
    </div>
  )
}

export default App;
