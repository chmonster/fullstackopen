import React, {useState, useEffect} from 'react'

import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Header = ({title}) => <h1>{title}</h1>

const InputBlock = ({label, value, handler}) => (
  <>
    {label}: <input 
          value = {value}
          onChange = {handler}  
        />
  </>
)

const CountryNone = ({text}) => <>{text}</>

const CountryOneMatch = ({country}) => {
  return (
    <>
      <CountryLong key={country.name.common} country={country} /> 
    </>
  )
}

const CountrySomeMatches = ({list, showHandler, hideHandler, shown}) => {
  return (
    list.map(entry => {
      if(!shown.includes(entry.name.common)) {
        return (
          <>
            <CountryShort key={entry.name.common} country={entry}/> 
            <ToggleShowButton key={'show '+entry.name.common} text='show' name={entry.name.common} 
              capital={entry.capital} handler={showHandler} />
          </>
        ) 
      } else {
        return (
          <>
            <CountryLong key={entry.name.common} country={entry} /> 
            <ToggleShowButton key={'hide '+entry.name.common} text='hide' 
              name={entry.name.common} capital={entry.capital} handler={hideHandler} />
          </>
        )
      } //else
    }) //list.map
  ) // return
}

const CommonBlock = ({searchTerm, searchHandler}) => (
  <>
    <Header key='header' title='Countries' />
    <InputBlock key = 'searchinput' label = 'search' value = {searchTerm} handler = {searchHandler} />
  </>
)

const Countries = ({searchTerm, searchHandler, list, hideHandler, showHandler, shown}) => {
  console.log('Countries', shown)
 
  if (list.length === 0) {
    return (
      <>
        <CommonBlock searchTerm={searchTerm} searchHandler={searchHandler} />
        <CountryNone text='No matching entries'/>
      </>
    )
  } else if (list.length===1) {
    return (
      <>
        <CommonBlock searchTerm={searchTerm} searchHandler={searchHandler} />
        <CountryOneMatch country={list[0]} />
      </>
    )
  } else if (list.length <= 10) {
    return (
      <>
        <CommonBlock searchTerm={searchTerm} searchHandler={searchHandler} />
        <CountrySomeMatches list={list} 
            showHandler={showHandler} hideHandler={hideHandler} shown={shown}/>
      </>
    )
  } else {
    return (
      <>
        <CommonBlock searchTerm={searchTerm} searchHandler={searchHandler} />
        <CountryNone text='Refine filter'/>
      </>
    )
  }
}

const ToggleShowButton = ({text, name, capital, handler}) => (
  <button onClick={() => handler(name, capital)}>{text}</button>
)

const CountryShort = ({country}) => {
  console.log('CountryShort', country.name.common)
  return (
    <>
      <li>{country.name.common}</li> 
    </>
  )
}

const Capital = ({name}) => (
  <>
      Capital: {name} <br />
  </>
)

const WeatherBlock = ({weather}) => {
  console.log('WeatherBlock', weather)
  //console.log()
  if (Object.keys(weather).length === 0) {
    return <></>
  } else {
    console.log(weather.main.temp, weather.wind.speed)  
    if (Object.keys(weather).length === 0) {
      return <></>
    } else { return (
      <>
        Today's temp {Math.round(weather.main.temp - 273)} &deg;C, wind {weather.wind.speed} km/s
        <br />
        <img src={'http://openweathermap.org/img/wn/'+weather.weather[0].icon+'@2x.png'} 
          alt={weather.weather[0].description} 
          title={weather.weather[0].description} 
          style={weather.weather[0].icon.includes('n') ? {backgroundColor: "black"} : {backgroundColor: "blue"}} 
        /> 
        <br />
      </>
      ) //return
    } //else
  } //else
}
  
const CountryLong = ({country}) => {
  
  console.log('CountryLong', country.name.common)

  const langList = Object.keys(country.languages).map(key => [country.languages[key]])
  console.log('langlist ', langList)

  const [weatherData, setWeatherData] = useState({})
  
  //const [weatherURL, setWeatherURL] = useState('')
  
  const weatherURL =
    'http://api.openweathermap.org/data/2.5/weather?q='
    .concat(country.capital)
    .concat('&APPID=')
    .concat(api_key)

  const hook2 = () => {
    console.log('hook2', weatherURL)
    const fetchData = async () => {
      const response = await axios(weatherURL)
      console.log('weather', response.data)
      setWeatherData(response.data)
    }
    fetchData()
  }  
  /*const hook2 = async () => {
    console.log('hook2', weatherURL)
    const response = () => await axios.get(weatherURL)
    .then(response => console.log('weather', response.data))
    .then(response => setWeatherData(response.data))
  }*/
  useEffect(hook2, [])

  
  
  console.log(weatherURL, weatherData)
  const weatherLine = () => Object.keys(weatherData).length === 0 ? <>loading...<br /></> : <WeatherBlock weather={weatherData} />

  return (
    <>
      <Header title={country.name.official} />
      <Capital name={country.capital} />
      {weatherLine()}
      <StatsBlock country={country} list={langList} />
    </>
  )
}

const StatsBlock = ({country, list}) => (
  <>
    Area: {country.area} km<sup>2</sup><br />
    Languages: {list.reduce((langs,lang) => langs + lang + ' ', '') } <br />
    <img  src={country.flags.png} 
          alt={country.name.common + ' flag'} 
          title={country.name.common + ' flag'} 
    />
  </>
)

export default Countries