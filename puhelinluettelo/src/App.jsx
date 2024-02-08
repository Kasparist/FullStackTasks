import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([{
    name: '',
    number: ''
  },
  {
    name: 'Pentti Aurinen',
    number: '040 4216969',
  }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log(initialPersons, "PERSONSSSS")

      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    };

    const isAdded = persons.find((nameObject) => nameObject.name === newName);
    if (isAdded) {
      window.confirm(`${nameObject.name} on jo luettelossa.`)
    }
    else {
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const namesToShow =
    persons.filter(person =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
    );


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    console.log(event.target.value)
    setSearchName(event.target.value)

  }


  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      </div>
      <h2>Add a new</h2>

      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>

      <Persons namesToShow={namesToShow} />
    </div>
  )
}




export default App
