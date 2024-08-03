import { useState } from "react";
import { useAddProductMutation, useDeleteProductMutation, useGetGoodsQuery, useUpdateProductMutation } from "./redux";

const App = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [edit, setEdit] = useState(false)
  const [count, setCount] = useState('')
  const { data, isLoading } = useGetGoodsQuery(count)

  const [addProduct, { isError }] = useAddProductMutation()
  const [newProduct, setNewProduct] = useState('')

  const [deleteProduct] = useDeleteProductMutation()
  const [updateProduct] = useUpdateProductMutation()

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

  const onDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap()
  }

  const onUpdateProduct = async (product) => {
    // const name = prompt() || ''
    // updateProduct({ ...product, name })
    setEdit(true)
    setId(product.id)
    setName(product.name)
  }

  const onCancel = () => {
    setEdit(false)
  }

  const onSave = async (product) => {
    updateProduct({ ...product, name })
    setEdit(false)
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
        {/* {data.map(el => <li key={el.id} onClick={() => onDeleteProduct(el.id)}>{el.name}</li>)} */}
        {data.map(el => {
          return (
            <>
              {edit && el.id === id ?
                <>
                  <input value={name} onChange={(e) => setName(e.target.value)} />
                  <button onClick={() => onSave(el)}>save</button>
                  <button onClick={onCancel}>cancel</button>
                </>
                :
                <li key={el.id} onClick={() => onUpdateProduct(el)}>{el.name}</li>
              }
              {/* <li key={el.id} onClick={() => onUpdateProduct(el)}>{el.name}</li> */}
              <button onClick={() => onDeleteProduct(el.id)} >delete</button>
            </>
          )
        })
        }
      </ul >
    </>
  )
}
export default App
