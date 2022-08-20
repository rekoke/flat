import {useEffect, useState} from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [fav, setFav] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/products')
        .then((res) => res.json())
        .then((data) => setProducts(data));
  }, []);

  const handleOnChange = () => {
    setFav(!fav);
  };

  const deleteItem = async (itemId) => {
    await fetch(`http://localhost:4000/products/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Something went wrong');
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        price: parseFloat(price),
        is_fav: fav,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    })
        .then((data) => {
          setName('');
          setPrice('');
          setFav(false);
          setMessage('User created successfully');
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1> all products</h1>
      </header>
      <main>
        {products.length ? products.map((product) => (
          <div key={product.id}>
            <span>
              {product.id}-
              {product.name}-{product.price}-{product.is_fav ? 'true' : 'false'}
            </span>
            <button onClick={() => deleteItem(product.id)}>X</button>
          </div>
        )) : <div> No products on your list </div>}
        <button> Add product </button>
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
          <label htmlFor="isfav">is fav</label>
          <input
            type="checkbox"
            id="isfav"
            name="isfav"
            checked={fav}
            onChange={handleOnChange}
          />
          <button disabled={!name || !price} type="submit">Create mf</button>
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </main>
    </div>
  );
}

export default App;
