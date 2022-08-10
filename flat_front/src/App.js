import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [fav, setFav] = useState(false);
  const [message, setMessage] = useState("");

  useEffect (() => {
    fetch('http://localhost:4000/products')
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [name]);

  const handleOnChange = () => {
    setFav(!fav);
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log('fav', fav);
    try {
      let res = await fetch("http://localhost:4000/products", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: 0,
          name: name,
          price: parseFloat(price),
          is_fav: fav
        }),
      });
      if (res.status === 201) {
        setName("");
        setPrice("");
        setFav(false);
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log('products:', products);
  return (
    <div className="App">
      <header className="App-header">
        <h1> all productos</h1>
        {products && products.map(product => (<div key={product.id}>{product.name}-{product.price}-{product.is_fav ? 'true' : 'false'}</div>))}
      </header>
      <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label for="isfav">is fav</label>
        <input 
          type="checkbox"
          id="isfav"
          name="isfav"
          checked={fav}
          onChange={handleOnChange}

        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
      </main>
    </div>
  );
}

export default App;