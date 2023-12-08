// Pagination.js
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, totalPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1);

  return (
    <div className='d-flex justify-content-end' >
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => onPageChange(number)} className="mx-3" disabled={currentPage === number}>
          {number}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };

export default Pagination;
