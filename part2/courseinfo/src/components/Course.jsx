const Header = ({name}) => { 
  return (
    <h2>{name}</h2>
  )
}

const Part = ({name, exercises}) => { 
  return (
    <p>
      {name} {exercises} 
    </p>
  )
}


const Content = ({parts}) => {
  
  const content = parts.map(
    (part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>
  )
  
  const total = parts.reduce(
    (sum, part) => sum + part.exercises
  ,0)


  return (
    <>
      {content}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </>
  )
}

export default Course