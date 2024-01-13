import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Filter from './components/Filter'
import People from './components/People'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [personName, setPersonName] = useState('')
  const [number, setNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  
  const search = persons.filter(person => person.name.match(capitalizedName(filteredName)))

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (e) => {
    e.preventDefault();
    // conditional to check if person name exists in phone book
    if(persons.filter(person => person.name == name.name).length === 0){
      const name = {
        name: capitalizedName(personName),
        number: number
      } 
      setPersons(persons.concat(name))
    } else {
      window.alert(`${name.name} is already added to Phonebook`)
    }
    
    setPersonName('')
    setNumber('')
  }
  
  // function to capitalize name given and handle case insensitive requests
  function capitalizedName(changeName){
    if(changeName.includes(' ')){
      let myName = changeName.split(' ')
      return myName.map(word => 
        word.slice(0,1)
        .toUpperCase() + 
        word.slice(1))
        .join(' ')
    }
      return changeName.slice(0,1).toUpperCase() + changeName.slice(1)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filteredName={filteredName} setFilteredName={setFilteredName}/>
      <h3>Add Name</h3>
      <Form addName={addName} personName={personName} setPersonName={setPersonName} setNumber={setNumber} number={number} />
      <h3>Numbers</h3>
      <People search={search} />
    </div>
  )
}

export default App