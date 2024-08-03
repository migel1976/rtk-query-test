import { useState } from "react";
import { useGetGoodsQuery } from "./redux";

const App = () => {
  const [count, setCount] = useState('')
  const { data, isLoading } = useGetGoodsQuery(count)
  // const { data, isLoading } = useGetGoodsQuery()
  if (isLoading) return <h1>...Loading</h1>
  const changeCount = (e) => {
    const value = e.target.value
    console.log(value)
    setCount(value)
  }

  return (
    <>
      {/* <select value={count} onChange={(e) => setCount(e.target.value)}> */}
      <select value={count} onChange={(e) => changeCount(e)}>
        <option value=''>All</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
      <ul>
        {data.map(el => <li key={el.id}>{el.name}</li>)}
      </ul>
    </>
  )
}
export default App
