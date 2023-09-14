import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight as next } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft as back } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { StatePageContext } from './CategoryPagination';

function NonStyledCategoryPaginationPageChanger({ className, totalPageNumber }) {
  const [page, setPage] = useContext(StatePageContext);

  function handleBackClick(event, setPage) {
    event.preventDefault();
    setPage(page - 1);
  }

  function handleNextClick(event, setPage) {
    event.preventDefault();
    setPage(page + 1);
  }

  return (
    <div className={className}>
      {page !== 1 ? (
        <div onClick={(event) => handleBackClick(event, setPage)}>
          <FontAwesomeIcon icon={back} style={{ color: '#3f72a4' }} size='2xl' />
        </div>
      ) : (
        false
      )}

      {page}

      {page !== totalPageNumber ? (
        <div onClick={(event) => handleNextClick(event, setPage)}>
          <FontAwesomeIcon icon={next} style={{ color: '#3f72a4' }} size='2xl' />
        </div>
      ) : (
        false
      )}
    </div>
  );
}

const CategoryPaginationPageChanger = styled(NonStyledCategoryPaginationPageChanger)`
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Kodchasan', sans-serif;
  font-size: 20px;
`;

export default CategoryPaginationPageChanger;
