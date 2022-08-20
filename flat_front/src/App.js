import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Form from './components/Form';
import SimpleList from './components/SimpleList';


function App() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [viewForm, setviewForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/products')
        .then((res) => res.json())
        .then((data) => setProducts(data));
  }, []);

  const displayMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 2000);
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
          displayMessage('User deleted successfully');
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        price: parseFloat(data.price),
        is_fav: data.fav,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    })
        .then((data) => {
          displayMessage('User created successfully');
          setProducts(data);
          setviewForm(false);
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1> all products</h1>
        <nav>
          <Link to="add">Add</Link>
        </nav>
      </header>
      <main>
        <SimpleList products={products} deleteItem={deleteItem}/>
        { !viewForm && <button onClick={() => setviewForm(!viewForm)}>
          Add product
        </button>
        }
        { viewForm &&
          <Form
            setviewForm={setviewForm}
            handleSubmit={handleSubmit}
          />
        }
        { message && <div className="message"> <p>{message}</p></div> }
      </main>
    </div>
  );
}

export default App;
