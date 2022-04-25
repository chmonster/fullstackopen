import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const InputBlock = ({label, value, handler}) => (
  <>
    {label}: <input 
          value = {value}
          onChange = {handler}  
        />
  </>
)


const Total = ({ sum }) => <p><b>Number of exercises {sum}</b></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ id, parts }) => (
  parts.map( part => <Part key={part.id} part={part} /> )
)

const Course = ({ course }) => {
  console.log(course.name, course.parts);
  return (
    <div>
      <Header key='header' course={course.name} />
      <Content key={course.id} parts={course.parts} />
      <Total key='total' sum={course.parts.reduce( (s,part) => s + part.exercises, 0 ) } />
    </div>
  )
}

export default Course