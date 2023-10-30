import React from 'react'

const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
    const numberOfPages = Math.ceil(totalItems/itemsPerPage); 
    const pageNumbers = [...Array(numberOfPages).keys()].map(x=>x+1); 
  
 return (
    <div className="pagination">
        {numberOfPages > 1 && pageNumbers.map(number => (
            <button 
                key={number} 
                onClick={() => paginate(number)} 
                className={currentPage === number ? 
                    "pagination-button pagination-active-page" : "pagination-button" }>
                    {number}
            </button> 
        ))}
    </div>
  )
}

export default Pagination