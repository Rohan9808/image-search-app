import React , {useState, useEffect} from 'react';
import Image from './Image';
import ReactPaginate from 'react-paginate';


const PaginatedItems = ({ itemsPerPage, images }) => {
    const [currentItems, setCurrentItems] = useState(images);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(images.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(images.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, images]);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % images.length;
      setItemOffset(newOffset);
    };
    return (
        <>
          <Image images={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        </>
      );
}

export default PaginatedItems;