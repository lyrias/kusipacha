import { formatDate, formatTemp,formatSpeed} from './utils/format-data.js'
import { weatherConditionsCodes } from './constants.js'
import {getLatLon} from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'

//weatherConditionsCodes[]
let iconoAnimado = document.getElementById('icono-animado') 

function setCurrentCity($element, city){ //container, city
    $element.textContent = city
}



function setCurrentDate($element){
    const date = new Date() //Object
    const formattedDate = formatDate(date)
    $element.textContent = formattedDate
}

function setCurrentTemp($element, temp){
    $element.textContent = formatTemp(temp)
}
function setCurrentSpeed($element, speed){
    $element.textContent = formatSpeed(speed)
}
function solarStatus(sunriseTime, sunsetTime ){
    const currentHours = new Date().getHours()
    const sunriseHours = sunriseTime.getHours()
    const sunsetHours = sunsetTime.getHours()

    if (currentHours < sunriseHours || currentHours > sunsetHours){
        return 'night'
    }
    return 'morning'
}

function setBackground($element, conditionCode, solarStatus){
    const weatherType = weatherConditionsCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
    $element.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`
}

function showCurrentWeather($app, $loading){
    $app.hidden = false,
    $loading.hidden = true

}

function configCurrentWeather(weather){
    console.log(weather);
    const $app = document.querySelector('#app')
    const $loading = document.querySelector('#loading')
    //loader
    showCurrentWeather($app, $loading)

    //Date
    const $currentWeatherDate = document.querySelector('#weather-date')
    setCurrentDate($currentWeatherDate)

    //city
    const $currentWeatherCity = document.querySelector('#weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)
    
    //viento
    const $currentWeatherSpeed = document.querySelector('#weather-speed')
    const speed = weather.wind.speed
    setCurrentSpeed($currentWeatherSpeed,speed)

    //temp
    const $currentWeatherTemp = document.querySelector('#weather-temp')
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)
    
    //para iconos cheveres
                switch (weather.main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                  }
}
export default async function currentWeather(){
    const  { lat, lon, isError } =  await getLatLon()
    if (isError) return console.log('Ha ocurrido un error ubicandote')    
    //Desestructurar un objeto
    const { isError: currentWeatherError, data: weather} = await getCurrentWeather(lat, lon)
    if (currentWeatherError) return console.log('Oh! ha ocurrido un error trayendo los datos del clima')
    configCurrentWeather(weather)
}