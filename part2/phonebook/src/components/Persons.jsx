const Persons = ({persons}) => {
  const obj = persons.map(p => {
    return (
      <p key={p.id}>{p.name} {p.number}</p>
    )
  })

  return (
    obj
  ) 
}

export default Persons