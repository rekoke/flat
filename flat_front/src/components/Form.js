import PropTypes from 'prop-types';
import {useState} from 'react';

const Form = ({
  handleSubmit,
  setviewForm,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [fav, setFav] = useState(false);
  const handleOnChange = () => {
    setFav(!fav);
  };
  return (
    <div className="form_container">
      <button onClick={() => {
        setviewForm(false);
      }}> X </button>
      <form onSubmit={(e) => handleSubmit(e, {name, price, fav})}>
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
        <button
          disabled={!name || !price}
          type="submit">
            Create mf
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  setviewForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Form;
