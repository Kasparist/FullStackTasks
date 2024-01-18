import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.click}> {props.text} </button>
  )

}

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let average = (props.good - props.bad) / all
  let positive = props.good / all * 100
  if (all === 0) {
    return (
      <div>
        <h2>statistics</h2>

        no feedback given
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GoodClicks = () => setGood(good + 1)
  const neutralClicks = () => setNeutral(neutral + 1)
  const badClicks = () => setBad(bad + 1)


  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button click={GoodClicks} text="good" />
        <Button click={neutralClicks} text="neutral" />
        <Button click={badClicks} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

export default App
