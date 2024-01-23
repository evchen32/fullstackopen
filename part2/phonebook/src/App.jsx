import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setNewFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
            
            setMessage(`Changed ${newName}'s phone number to ${newNum}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch((error) => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            },5000)

            const l = persons.filter((p) => {
              return p.id !== foundObj.id
            })

            setPersons(l)
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
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
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
      PersonService
        .remove(id)
        .catch((error) => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          },5000)
        })
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
      <Notification message={message} className='confirm'/>
      <Notification message={errorMessage} className='error'/>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/> 
      <h2>Numbers</h2>
      <Persons persons={fPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App