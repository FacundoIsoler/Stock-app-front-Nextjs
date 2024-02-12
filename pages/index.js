import { useEffect, useState } from "react";

const initialState = { name: "", price: 0 }

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Home() {
  const [product, setProduct] = useState(initialState)
  const [products, setProducts] = useState([])

  const handleChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    const inputName = e.target.name;


    setProduct({ ...product, [inputName]: inputValue })
  }

  const handleClick = async (e) => {
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
      setProduct(initialState)
      const newProducts = [data.product, ...products]
      setProducts(newProducts)
      // fetchProducts()
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


  return (
    <>
      <div className="container df aic">
        <div className="df fdc">
          <h2 style={{ margin: "0.3rem" }}> Crear nuevo producto</h2>
          <form>
            <input onChange={handleChange} type="text" className="onone" placeholder="Nombre del producto..." value={product.name} name="name" />
            <input onChange={handleChange} type="number" className="onone" placeholder="Precio del producto..." value={product.price} name="price" />
            <button onClick={handleClick} className="cursorp">Crear Producto</button>
          </form>
        </div>
        <div className="products-container">
          {
            products?.map(p => (
              <div className="product df aic jcsb p5 mb5 br5" key={p._id}>
                <span>
                  {p.name}
                </span>
                <div className="df df">
                  <span>${p.price}</span>
                  <span style={{ color: "red", cursor: "pointer" }} onClick={() => {
                    fetch(`${baseURL}/products/${p._id}`, { method: "DELETE" })
                    .then(res => res.json())
                    .then(data => {
                      console.log({data})
                    })
                  }}>X</span>
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

                    .onone {
                      outline: none;
                    }

                    .cursorp {
                      cursor: pointer;
                    }
                    
                    .df{
                      display:flex;
                    }

                    .p5{
                      padding0.5rem;
                    }

                    .br5{
                      border-radius: 0.5rem;
                    }

                    .mb5{
                      margin-bottom:1.5rem;
                    }
                    
                    .product{
                      box-shadow: .125rem .25rem .375rem rgba(0,0,0,0.2);
                    }

                  .aic {
                    align-items: center;
                  }

                  .jcc {
                    justify-content: center;
                  }
                  
                  .jcsb{
                    justify-content: space-between;
                  }

                  .fdc{
                    flex-direction:column;
                  }
                  
                  input{
                      margin-bottom:0.75rem;
                      padding:0.5rem 0.5rem;
                      border: 1px solid lightgray;
                      border-radius: 0.5rem;
                  }

                  h1{
                      text-align: center;
                  }

                  .products-container{
                    overflow: hidden;
                    overflow-y: auto;
                    max-height: 20rem;
                    padding: 0.5rem;
                  }

                  .container {
                    background-color: white;
                    width: 50rem;
                    margin: 0 auto;
                    margin-top: 5rem;
                    border-radius: 0.5rem;
                    padding: 1rem;
                  }

                  button {
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.5rem;
                    border: none;
                    background-color: rgba();
                  }
          `}
        </style>
      </div>
    </>
  )
}
