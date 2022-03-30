import { useState } from 'react'

const Button = ({onClick, text}) => (
  <td>
    <button onClick={onClick}>
      {text}
    </button>
  </td>
)

const StatsLine = ({text, value}) => (
  <tr>
      <td>{text}</td>
      <td>{value}</td>
  </tr>
)

const updateStats = ({good, neutral, bad}) => ({
  all: good + neutral + bad,
  average: ((good - bad) / (good + neutral + bad)).toFixed(3),
  pcGood: (100 * good / (good + neutral + bad)).toFixed(1) + '%'
})

const Statistics = ({good, neutral, bad}) => {
  console.log(good, neutral, bad)
  if( (good+neutral+bad) > 0) {
    return (
      <div>
        <h1>Feedback statistics</h1>
        <table>
          <tbody>
              <StatsLine text = 'good' value = {good} />
              <StatsLine text = 'neutral' value = {neutral} />
              <StatsLine text = 'bad' value = {bad} />
              <StatsLine text = 'all' value = {updateStats({good, neutral, bad}).all} />
              <StatsLine text = 'average' value = {updateStats({good, neutral, bad}).average} />
              <StatsLine text = 'positive' value = {updateStats({good, neutral, bad}).pcGood} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <>
      <h1>click a feedback button to see stats</h1>
    </>  
  )

}

const App = () => {
  const [clicks, setClicks] = useState({good: 0, neutral: 0, bad: 0})

  const incGood = () => setClicks({...clicks, good: clicks.good+1})
  const incNeutral = () => setClicks({...clicks, neutral: clicks.neutral+1})
  const incBad = () => setClicks({...clicks, bad: clicks.bad+1})

  console.log(updateStats(clicks))

  return (
    <div>
      <h1>Give feedback</h1>
      <table><tbody>
        <tr>
          <Button onClick = {incGood} text = 'good' />
          <Button onClick = {incNeutral} text = 'neutral' />
          <Button onClick = {incBad} text = 'bad' />
        </tr>
      </tbody></table>
      <br />

      <Statistics good = {clicks.good} neutral = {clicks.neutral}  bad = {clicks.bad} />
    </div>
  )
}

export default App