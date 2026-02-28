import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 4) {
      // Near start
      pages.push(1, 2, 3, 4, 5);
      pages.push('...');
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Near end
      pages.push(1, 2, 3);
      pages.push('...');
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      // Middle
      pages.push(1);
      pages.push('...');
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push('...');
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const buttonStyle = (isActive) => ({
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: isActive ? '#007bff' : '#fff',
    color: isActive ? '#fff' : '#333',
    cursor: 'pointer',
    minWidth: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease'
  });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
      marginTop: '30px',
      padding: '10px',
      flexWrap: 'wrap'
    }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{ ...buttonStyle(false), opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        &laquo;
      </button>

      {pageNumbers.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span style={{ padding: '0 5px', color: '#666' }}>...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              style={buttonStyle(currentPage === page)}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{ ...buttonStyle(false), opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
