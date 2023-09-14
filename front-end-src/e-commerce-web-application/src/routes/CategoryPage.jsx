import React, { createContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../App';
import PrivateRoute from './PrivateRoute';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import axios from 'axios';
import CategoryPagination from '../components/CategoryPagination';
import CategoryProductFilter from '../components/CategoryProductFilter';

export const CategoryPageFilterStateSetterContext = createContext();

function NonStyledCategoryPage({ className }) {
  const { categoryId } = useParams();
  const [products, setProducts] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const navigate = useNavigate();

  useEffect(
    function getProducts() {
      axios
        .post(
          `http://localhost:3001/products/get`,
          {
            filters: {
              categories: [categoryId],
            },
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          },
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 401 || error.response.status === 403) {
            navigate('/welcome');
          }
        });
    },
    [categoryId],
  );

  function applyFilters(products, activeFilters) {
    if (products !== null) {
      let filteredProducts;
      if (activeFilters.length === 0) {
        filteredProducts = products;
      } else {
        filteredProducts = products.filter((product) => {
          for (const filter of activeFilters) {
            if (filter.specType !== 'brand') {
              if (product[filter.specType] !== filter.value) {
                return false;
              }
            } else {
              if (product[filter.specType].name !== filter.value) {
                return false;
              }
            }
          }
          return true;
        });
      }
      return filteredProducts;
    } else {
      return null;
    }
  }

  //parameter filter is consist of {spec: specType, value: valueOfSpec}

  let filteredProducts = useMemo(
    () => applyFilters(products, activeFilters),
    [activeFilters, products],
  );

  return (
    <PrivateRoute>
      <CategoryPageFilterStateSetterContext.Provider value={[activeFilters, setActiveFilters]}>
        {products !== null ? (
          <div className={className}>
            <GlobalStyle />
            <div id='header'>
              <Header />
            </div>
            <div id='content'>
              <CategoryProductFilter
                categoryId={categoryId}
                products={filteredProducts}></CategoryProductFilter>
              <CategoryPagination
                products={filteredProducts}
                totalPageItemNumber={9}></CategoryPagination>
            </div>
            <div id='footer'>
              <Footer />
            </div>
          </div>
        ) : (
          false
        )}
      </CategoryPageFilterStateSetterContext.Provider>
    </PrivateRoute>
  );
}

const CategoryPage = styled(NonStyledCategoryPage)`
  #content {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
    gap: 50px;
  }
`;
export default CategoryPage;
