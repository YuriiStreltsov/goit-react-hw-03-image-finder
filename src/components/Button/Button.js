// import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button onClick={onClick} type="button" className="Button">
      Load more
    </button>
  );
}

// Button.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Button;
