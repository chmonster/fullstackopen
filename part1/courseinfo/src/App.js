const App = () => {
    
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  console.log(course.name)
  console.log(course.parts)
   
  
  return (

    <div>
      <Header name = {course.name} />
      <Content names = {course.parts.map(part => part.name)} 
                exercises={course.parts.map(part => part.exercises)} />
      <Total exercises = {course.parts.map(part => part.exercises)} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>
        {props.name}
      </h1>
    </>
  )
}


const Content = (props) => {
  
  console.log('Content')
  console.log(props.names)
  console.log(props.exercises)

  const zip = (a1, a2) => a1.map((x,i) => [x, a2[i]])
  const parts = zip(props.names, props.exercises)

  return (
      parts.map(part => 
        <>
          <Part name={part[0]} exercises={part[1]} />  
        </>
      )
  )
}

const Part = (part) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}


const Total = (props) => {
  
  console.log('Total')
  console.log(props)
  const total = props.exercises.reduce(
    (prev, current) => prev + current, 0
  )
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}


export default App