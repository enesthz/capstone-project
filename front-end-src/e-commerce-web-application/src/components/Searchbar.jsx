import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import getFormObject from '../helpers/getFormObject';
import { useNavigate } from 'react-router-dom';
import { updateSearchOutcome } from '../redux/slices/searchOutcomeSlice';
import { useDispatch } from 'react-redux';

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 30px;
  width: 30px;
  padding: 0px;
  border: none;
  padding-left: 12px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  &::placeholder {
    color: #8c8c8c;
    font-family: 'Kodchasan', sans-serif;
    font-weight: 500;
  }

  &:focus {
    outline: none;
  }

  &::selection {
    background-color: #3f72af;
  }

  height: 39px;
  border: none;
`;

function NonStyledSearchbar({ className }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [links, setLinks] = useState(null);
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    let productTitle = inputRef.current.value;
    await axios
      .post(
        `http://localhost:3001/products/get`,
        {
          filters: {
            title: productTitle,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      .then((response) => {
        dispatch(updateSearchOutcome(response.data));
        navigate('/search');
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      });
  }

  return (
    <div className={className}>
      <form id='searchForm' onSubmit={handleSubmit}>
        <SearchButton type='submit'>
          <span className='material-symbols-outlined'>search</span>
        </SearchButton>
        <label htmlFor='searchbar'></label>
        <StyledInput
          onFocus={() => setAreLinksOpen(true)}
          onBlur={() => setAreLinksOpen(false)}
          ref={inputRef}
          name='productTitle'
          placeholder='search a product'
          size={50}
          maxLength={57}></StyledInput>
      </form>
    </div>
  );
}

const SearchBar = styled(NonStyledSearchbar)`
  #searchForm {
    display: flex;
    flex-direction: row;
    width: 416px;
    height: 39px;
    border-style: solid;
    border-width: 2px;
    border-color: #112d4e;
    border-radius: 30px;
    cursor: pointer;
    align-items: center;
    overflow: hidden;
    background-color: white;
    gap: 3px;
  }
`;

export default SearchBar;
