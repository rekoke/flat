import PropTypes from 'prop-types';

const SimpleList = ({products, deleteItem}) => {
  return (
    <>
      {products.length ? products.map((product) => (
        <div key={product.id}>
          <span>
            {product.id}-
            {product.name}-{product.price}-{product.is_fav ? 'true' : 'false'}
          </span>
          <button onClick={() => deleteItem(product.id)}>X</button>
        </div>
      )) : <div> No products on your list </div>}
    </>
  );
};

SimpleList.propTypes = {
  products: PropTypes.array,
  deleteItem: PropTypes.func,
};

export default SimpleList;
