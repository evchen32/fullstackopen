import {useState, useEffect} from 'react'
import axios from 'axios'

const Country =({data}) => {
  return (
    <>
      <h1>{data.name.common}</h1>
      <div>capital {data.capital}</div>
      <div>area {data.area}</div>
      <h2>languages:</h2>
      <ul>
        {
          Object.values(data.languages).map((d,idx) => {
            return <li key={idx}>{d}</li>
          })
        }
      </ul>
      <img src={data.flags.png} />
    </>
  )
}

const App = () => {
  const [input, setInput] = useState('')
  const [data, setData] = useState([])
  const [output, setOutput] = useState(null)

  console.log(output)
  
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(obj => {
        setData(obj.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },[])

  const handleInput = (event) => {
    setInput(event.target.value)
    const query = event.target.value.toLowerCase()

    const fCountries = data.filter((d) => {
      return d.name.common.toLowerCase().includes(query)
    })

    if(query === '') {
      setOutput(null)
    } else if(fCountries.length >= 10) {
      setOutput(<div>Too many matches, specify another filter</div>)
    } else if(fCountries.length > 1) {
      
      const output = fCountries.map((c, idx) => {
        return (
          <div key={idx}>
            {c.name.common}
            <button onClick={() => setOutput(<Country data={c}/>)}>show</button>
          </div>
        )
      })

      setOutput(output)
    } else if(fCountries.length === 1) {
      setOutput(<Country data={fCountries[0]}/>)
    }
  }

  return (
    <div>
      find countries
      <input value={input} onChange={handleInput}/>
      {output}
    </div>
  )
}

export default App