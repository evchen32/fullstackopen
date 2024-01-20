const Persons = ({persons, handleDelete}) => {
  const obj = persons.map(p => {
    return (
        <p key={p.id}>{p.name} {p.number}
          <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
        </p>
    )
  })

  return (
    obj
  ) 
}

export default Persons