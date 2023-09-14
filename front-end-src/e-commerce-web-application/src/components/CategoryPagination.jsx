import React, { createContext, useState } from 'react';
import styled from 'styled-components';
import CategoryPaginationPageChanger from './CategoryPaginationPageChanger';
import CategoryPaginationPageItemContainer from './CategoryPaginationPageItemContainer';

export const StatePageContext = createContext(undefined);

function NonStyledCategoryPagination({ className, totalPageItemNumber, products }) {
  let productCount = products.length;
  let totalPageNumber = Math.ceil(productCount / totalPageItemNumber);
  const [page, setPage] = useState(1);

  let pageItems = products.slice(totalPageItemNumber * (page - 1), totalPageItemNumber * page);
  let pageItemsList = pageItems.map((item, index) => (
    <CategoryPaginationPageItemContainer key={index} product={item} />
  ));

  return (
    <StatePageContext.Provider value={[page, setPage]}>
      <div className={className}>
        <div id='items'>{pageItemsList}</div>
        <div id='pageChanger'>
          <CategoryPaginationPageChanger
            totalPageNumber={totalPageNumber}></CategoryPaginationPageChanger>
        </div>
      </div>
    </StatePageContext.Provider>
  );
}

const CategoryPagination = styled(NonStyledCategoryPagination)`
  display: inline-grid;
  grid-template-columns: calc(270px * 3);
  grid-template-rows: auto 60px;
  grid-template-areas:
    'items'
    'pageChanger';

  row-gap: 20px;

  border: 1px solid gray;
  padding: 30px;
  border-radius: 18px;

  #items {
    grid-area: items;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    align-items: start;
  }

  #pageChanger {
    grid-area: pageChanger;
    display: flex;
    justify-content: center;
  }
`;

export default CategoryPagination;
