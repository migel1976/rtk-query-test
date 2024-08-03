import { useState } from "react";
import { useAddProductMutation, useGetGoodsQuery } from "./redux";

const App = () => {
  const [count, setCount] = useState('')
  const { data, isLoading } = useGetGoodsQuery(count)

  const [addProduct, { isError }] = useAddProductMutation()
  const [newProduct, setNewProduct] = useState('')


  if (isLoading) return <h1>...Loading</h1>
  const changeCount = (e) => {
    const value = e.target.value
    console.log(value)
    setCount(value)
  }

  const onNewProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap()
      setNewProduct('')
    }
  }

  return (
    <>
      {/* <select value={count} onChange={(e) => setCount(e.target.value)}> */}
      <diV>
        <input type='text' value={newProduct} onChange={(e) => setNewProduct(e.target.value)} />
      </diV>
      <button onClick={onNewProduct}>add </button>
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
