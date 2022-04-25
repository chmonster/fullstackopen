//import axios from 'axios'
import { useState, useEffect } from 'react'

import personService from './services/persons'
import PhoneList from './components/PhoneList'

const App = () => {

  const [message, setMessage] = useState([null, null])

  const [persons, setPersons] = useState([])
  const [personsFiltered, setPersonsFiltered] = useState(persons)

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(initialList => {
        console.log('hook getAll', initialList)
        setPersons(initialList)
        setPersonsFiltered(initialList)
      })
  }
  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const cleanupAddEntry = (returnedEntry) => {
    console.log('create', returnedEntry)
    setPersons(persons.concat(returnedEntry))
    setPersonsFiltered(persons.concat(returnedEntry))
    setNewName('')
    setNewNumber('')
    setSearchTerm('')
    setMessage([`${returnedEntry.name} added`, 'confirm'])
    setTimeout(() => setMessage([null, null]), 5000)
  }

  const cleanupNumberChange = (returnedPerson) => {
    setPersons(
      persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson)
    )
    setPersonsFiltered(
      persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson)
    )
    setSearchTerm('')
    setMessage([`${returnedPerson.name}'s number changed`, 'confirm'])
    setTimeout(()=>setMessage([null, null]), 5000)
  }

  const cleanupUpdateDeletedPersonError = (error, id, name) => {
    //alert(`${entryObject.name} has been deleted`)
    setMessage([`${name} has been deleted`, 'error'])
    setTimeout(() => setMessage([null, null]), 5000)
    console.log(error)
    setPersons(
      persons.filter(person => person.id !== id)
    )
    setPersonsFiltered(
      persons.filter(person => person.id !== id)
    )
    setSearchTerm('')
  }

  
  const cleanupDelete = (id, name) => {
    console.log('deleted', id, name)
    setPersons(persons.filter(person => person.id !== id))
    setPersonsFiltered(persons.filter(person => person.id !== id))
    setSearchTerm('')
    setMessage([`${name} deleted`, 'confirm'])
    setTimeout(() => setMessage([null, null]), 5000)
  }

  const cleanupDeleteDeletedError = (error, id, name) => {
    //alert(`${name} already deleted`)
    setMessage([`${name} already deleted`,'error'])
    setTimeout(() => setMessage([null, null]), 5000)
    console.log(error)
    setPersons(
      persons.filter(person => person.id !== id)
    )
    setPersonsFiltered(
      persons.filter(person => person.id !== id)
    )
    setSearchTerm('')
  }


  const addEntry = (event) => {
    event.preventDefault()

    const entryObject = {
      name: newName,
      number: newNumber
    }

    const checkList = persons.filter(person => person.name === newName)

    if(checkList.length === 0){
      personService
        .create(entryObject)
        .then(returnedEntry => cleanupAddEntry(returnedEntry))
        .catch(error => console.log(error))
    } else {
      const result = window.confirm(`${entryObject.name} is already listed, update number?`)
      if (result) {
        const id = persons.find(p => p.name === newName).id
        personService
        .update(id, entryObject)
        .then(returnedPerson => cleanupNumberChange(returnedPerson))
        .catch(error => cleanupUpdateDeletedPersonError(error, id, entryObject.name))
      }
    }
  }

  const deleteEntry = (id, name) => {
    const check = window.confirm(`Delete ${name}?`)
    if(check) {
      personService
        .deleteObject(id)
        .then(()=> cleanupDelete(id, name))
        .catch(error => cleanupDeleteDeletedError(error, id, name))
    }
  }
  
  const handleNameChange = (event) => {
    console.log('name ', event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('number ', event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleSearchTermChange = (event) => {
    console.log('search ', event.target.value)
    setPersonsFiltered(
      persons.filter(person => 
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
    setSearchTerm(event.target.value)
  }
  
  return (
    <PhoneList key='phonelist'
      message = {message[0]}
      messageType = {message[1]}
      search={searchTerm}
      handleSearch={handleSearchTermChange}
      addEntry={addEntry}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      personsFiltered={personsFiltered}
      deleteEntry={deleteEntry}
    />
  )
}

export default App