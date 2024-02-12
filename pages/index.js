import { useEffect, useState } from "react";

const initialProductState = { name: "", price: 0 }
const initialMovementState = { type: "Compra", quantity: 0 }

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Home() {
  const [selectedProductId, setSelectedProductId] = useState()
  const [product, setProduct] = useState(initialProductState)
  const [movement, setMovement] = useState(initialMovementState)
  const [products, setProducts] = useState([])


  //***********PRODUCT***********//

  const handleProductChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const inputName = e.target.name;


    setProduct({ ...product, [inputName]: inputValue })
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/products`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      const data = await res.json()
      setProduct(initialProductState)
      const newProducts = [data.product, ...products]
      setProducts(newProducts)
      // fetchProducts()
    } catch (error) {
      console.log(error)
    }

  }



  //***********MOVEMENT***********//
  const handleMovementChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setMovement({
      ...movement,
      quantity: +inputValue
    })
  }

  const handleSelectType = (t) => {
    setMovement({
      ...movement,
      type: t
    })
  }

  const handleCreateMovement = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/products/movement/${selectedProductId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(movement)
      })
      const data = await res.json()
      console.log({ data })
      setMovement(initialMovementState)
      setSelectedProductId(null)
      fetchProducts()
    } catch (error) {
      console.log(error)
    }

  }

  const fetchProducts = () => {
    fetch(`${baseURL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
      })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // console.log({ products })


  return (
    <>
      <div className="container df jcsb">
        <div className="df fdc">
          <h2 style={{ margin: "0.3rem" }}> Crear nuevo producto</h2>
          <form>
            <input onChange={handleProductChange} type="text" className="onone" placeholder="Nombre del producto..." value={product.name} name="name" />
            <input onChange={handleProductChange} type="number" className="onone" placeholder="Precio del producto..." value={product.price} name="price" />
            <button onClick={handleCreateProduct} className="cursorp">Crear Producto</button>
          </form>
          <h2 style={{ margin: "0.3rem" }}> Crear movimiento stock</h2>
          <div className="df aic mb5">
            {
              ['Compra', 'Venta'].map(t => (
                <div
                  onClick={() => handleSelectType(t)}
                  className="mr5 p5 shadow br5 cursorp"
                  key={t}
                  style={{ backgroundColor: t === movement.type ? 'lightblue' : 'white' }}
                >
                  <span>
                    {t}
                  </span>
                </div>
              ))
            }
          </div>
          <input
            onChange={handleMovementChange}
            type="number"
            className="onone"
            placeholder="Precio del producto..."
            value={movement.quantity}
            name="quantity" />
          <button
            onClick={handleCreateMovement}
            className="cursorp">Crear movimeinto de stock</button>
        </div>
        <div className="products-container">
          {
            products?.map(p => (
              <div
                onClick={() => setSelectedProductId(p._id)}
                className="shadow df aic jcsb p5 mb5 br5"
                key={p._id}
                style={{ backgroundColor: selectedProductId === p._id ? "lightblue" : "white" }}
              >
                <span>
                  {p.name}
                </span>
                <div className="df aic">
                  <div className="df  fdc mr5 aic" style={{ width: "10rem" }}>
                    <span className="mr5" >${p.price}</span>
                    <div className="df jcsb">
                      <span className="mr5">Stock: {p.stock}</span>
                    </div>
                  </div>
                  <i className="fas fa-trash cursorp cred" onClick={() => {
                    fetch(`${baseURL}/products/${p._id}`, { method: "DELETE" })
                      .then(res => res.json())
                      .then(data => {
                        console.log({ data })
                      })
                  }}>
                  </i>
                </div>
              </div>
            ))
          }
        </div>
        <style jsx>
          {`
                  form{
                      display:flex;
                      flex-direction:column;
                      width:20rem;
                      margin:0 auto;
                  }
                    
                    .shadow{
                      box-shadow: .125rem .25rem .375rem rgba(0,0,0,0.2);

                    }

                  h2{
                      text-align: center;
                  }

                  .products-container{
                    overflow: hidden;
                    overflow-y: auto;
                    max-height: 20rem;
                    padding: 0.5rem;
                    width: 100%;
                  }

                  .container {
                    background-color: white;
                    width: 50rem;
                    margin: 0 auto;
                    margin-top: 5rem;
                    border-radius: 0.5rem;
                    padding: 1rem;
                  }
          `}
        </style>
      </div>
    </>
  )
}
