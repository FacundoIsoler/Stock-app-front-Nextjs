import { useState } from "react"

function Create() {
    const initialState = { name: "", price: 0 }
    const [product, setProduct] = useState(initialState)

    const handleChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;
        const inputName = e.target.name;


        setProduct({ ...product, [inputName]: inputValue })
    }

    const handleClick = (e) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json)
            .then((data) => {
                setProduct(initialState),
                console.log("Producto creado con exito")
            })
            .catch(err => {
                console.log({err})
            })
    }



    return (
        <>
            <div>
                <h1> Crear nuevo producto</h1>
                <form>
                    <input onChange={handleChange} type="text" placeholder="Nombre del producto..." value={product.name} name="name" />
                    <input onChange={handleChange} type="number" placeholder="Precio del producto..." value={product.price} name="price" />
                    <button onClick={handleClick}>Crear Producto</button>
                </form>
            </div>
            <style jsx>
                {
                    `
                    form{
                        display:flex;
                        flex-direction:column;
                        width:20rem;
                        margin:0 auto;
                    }

                    input{
                        margin-bottom:0.5rem;
                    }

                    h1{
                        text-align: center;
                    }
                    `
                }
            </style>
        </>
    )
}

export default Create