import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const foundObj = persons.find(p => {
      return (
        p.name === newName 
      )
    })
    
    if(foundObj || newName.length == 0 || newNum.length == 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNum('')
      setNewFilter('')
    } else {
      const lPersons = persons.concat({name: newName, number: newNum, id: persons.length + 1})
      setPersons(lPersons)
      setNewName('')
      setNewNum('')
      setNewFilter('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const fPersons = persons.filter(p => {
    return (
      p.name.toLowerCase().includes(filter.toLowerCase())
    )
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/> 
      <h2>Numbers</h2>
      <Persons persons={fPersons}/>
    </div>
  )
}

export default App