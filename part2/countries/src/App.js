import Countries from './components/Countries'

import axios from 'axios'

import { useState, useEffect } from 'react'

//const api_key = process.env.REACT_APP_API_KEY

const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const hook1 = () => {
    console.log('hook1')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
        setCountriesFiltered(response.data)
      })
  }
  useEffect(hook1, [])

  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchTermChange = (event) => {
    console.log('search ', event.target.value)
    setCountriesFiltered(
      countries.filter(country => 
        country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
    setSearchTerm(event.target.value)
    setCountriesShown([])
  }

  const [countriesShown, setCountriesShown] = useState([])
  
  const showCountry = (name, capital) => {
    console.log('showCountry', name)
    setCountriesShown(countriesShown.concat(name))
  }

  const hideCountry = (name) => {
    console.log('hideCountry', name)
    setCountriesShown(countriesShown.filter(n => n !== name))
  }

  return (
    <div>
      <Countries
        key='countrylist' 
        searchVal = {searchTerm}
        searchHandler={handleSearchTermChange}
        list={countriesFiltered} 
        hideHandler={hideCountry} 
        showHandler={showCountry} 
        shown={countriesShown}
      />
    </div>
  )
}

export default App