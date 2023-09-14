import axios from 'axios';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import getUniqueSpecValues from '../helpers/getUniqueSpecValues';
import { CategoryPageFilterStateSetterContext } from '../routes/CategoryPage';
import {
  phoneFilterSpecs,
  phoneFilterSpecsUI,
  computerFilterSpecs,
  computerFilterSpecsUI,
} from '../helpers/filterSpecs';

function NonStyledCategoryProductFilter({ className, categoryId, products }) {
  const [activeFilters, setActiveFilters] = useContext(CategoryPageFilterStateSetterContext);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(
    function clearFiltersAfterCategoryChanges() {
      removeAllFilters();
    },
    [categoryId],
  );

  useEffect(
    function getCategory() {
      axios
        .get(`http://localhost:3001/categories/${categoryId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          setCategory(response.data.title);
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

  const allUniequeValuesForAllSpecs = useMemo(() => {
    if (category === null) {
      return null;
    } else {
      let filterSpecs;
      let filterSpecsUI;
      switch (category) {
        case 'Phone':
          filterSpecs = phoneFilterSpecs;
          filterSpecsUI = phoneFilterSpecsUI;
          break;

        case 'Computer':
          filterSpecs = computerFilterSpecs;
          filterSpecsUI = computerFilterSpecsUI;
          break;
        // dont forget to add other other categories to cases
        default:
          break;
      }

      let allUniequeValuesForAllSpecs = [];
      filterSpecs.forEach((value, index) => {
        allUniequeValuesForAllSpecs.push({
          specType: value,
          specTypeUI: filterSpecsUI[index],
          values: getUniqueSpecValues(value, products),
        });
      });
      return allUniequeValuesForAllSpecs;
    }
  }, [category, products]);

  let filterList = [];

  function isFilterActive(specType, value) {
    for (const filter of activeFilters) {
      if (specType === filter.specType && value === filter.value) {
        return true;
      } else {
        return false;
      }
    }
  }

  if (allUniequeValuesForAllSpecs !== null) {
    filterList = allUniequeValuesForAllSpecs.map((element, index) => {
      return (
        <div key={index}>
          <div id='filterTitles'>{element.specTypeUI} :</div>
          {element.values.map((filteringValue, index) => {
            return (
              <div>
                <input
                  checked={isFilterActive(element.specType, filteringValue)}
                  id={element.specType}
                  key={index}
                  type='checkbox'
                  onChange={(event) => {
                    let target = event.target;
                    if (target.checked === true) {
                      activateFilter({ specType: element.specType, value: filteringValue });
                    } else {
                      removeFilter({ specType: element.specType, value: filteringValue });
                    }
                  }}
                />
                <label htmlFor={element.specType}>{filteringValue}</label>
              </div>
            );
          })}
        </div>
      );
    });
  }

  function activateFilter(filter) {
    setActiveFilters((activeFilters) => [...activeFilters, filter]);
  }

  function removeFilter(filter) {
    setActiveFilters((activeFilters) =>
      activeFilters.filter((activeFilter) => {
        return !(activeFilter.specType === filter.specType && activeFilter.value === filter.value);
      }),
    );
  }

  function removeAllFilters() {
    setActiveFilters([]);
  }

  return <div className={className}>{filterList}</div>;
}

const CategoryProductFilter = styled(NonStyledCategoryProductFilter)`
  font-family: 'Kodchasan';
  #filterTitles {
    font-weight: bold;
    color: #112d4e;
  }
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export default CategoryProductFilter;
