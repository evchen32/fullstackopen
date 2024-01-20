import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(l => {
        setPersons(l)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()

    const foundObj = persons.find(p => {
      return (
        p.name === newName 
      )
    })
    
    if(foundObj) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if(confirm) {

        PersonService
          .edit({...foundObj, "number": newNum})
          .then((person) => {
            setPersons(
              persons.map((p) => {
                return p.id === person.id ? person : p
              })
            )
          })
      }

      setNewName('')
      setNewNum('')
      setNewFilter('')
    } else if(newName.length == 0 || newNum.length == 0) {
      setNewName('')
      setNewNum('')
      setNewFilter('')
    } else {
      const person = {
        name: newName,
        number: newNum
      }

      PersonService
        .create(person)
        .then(p => {
          const lPersons = persons.concat(p)
          setPersons(lPersons)
        })

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

  const handleDelete = (id, name) => {
    const res = window.confirm(`Delete ${name}?`)

    if(res) {
      const l = persons.filter((p) => {
        return p.id !== id
      })

      setPersons(l)
      PersonService.remove(id)
    }
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
      <Persons persons={fPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App