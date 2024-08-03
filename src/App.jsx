import { useState } from "react";
import { useGetGoodsQuery } from "./redux";

const App = () => {
  const { count, setCount } = useState(1)
  // const { data, isLoading } = useGetGoodsQuery(count)
  const { data, isLoading } = useGetGoodsQuery()

  return (
    <>
      {isLoading ? '...загрузка' : ''}
      {/* <select value={count} onChange={(e) => setCount(e.target.value)}> */}
      {/*   <option value=''>All</option> */}
      {/*   <option value='1'>1</option> */}
      {/*   <option value='2'>2</option> */}
      {/*   <option value='3'>3</option> */}
      {/* </select> */}
      <ul>
        {data.map(el => <li key={el.id}>{el.name}</li>)}
      </ul>
    </>
  )
}
export default App
