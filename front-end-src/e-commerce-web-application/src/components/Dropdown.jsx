import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import StyledLink from './StyledLink';

function NonStyledContentItem({ className, children }) {
  return <div className={className}>{children}</div>;
}

const ContentItem = styled(NonStyledContentItem)`
  color: #3f72af;
  text-align: left;
  font-family: 'Kodchasan', sans-serif;
  font-weight: bold;
  font-size: 24px;
  &:hover {
    color: #112d4e;
  }
`;

function NonStyledDropdownContent({ className }) {
  let navigate = useNavigate();
  const [categories, setCategories] = useState(null);
  useEffect(function getCategories() {
    axios
      .get('http://localhost:3001/categories', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      });
  }, []);

  const categoriesList =
    categories !== null
      ? categories.map((category, index) => {
          return (
            <StyledLink key={index} to={`/categories/${category._id}`}>
              <ContentItem>{category.title}</ContentItem>
            </StyledLink>
          );
        })
      : false;

  return <div className={className}>{categoriesList}</div>;
}

const DropdownContent = styled(NonStyledDropdownContent)`
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  width: inherit;
  height: 327px;
  border-color: black;
  background-color: white;
`;

function NonStyledDropdown({ className }) {
  const [isOvered, setIsOvered] = useState(false);

  function handleMouseOver() {
    setIsOvered(true);
  }

  function handleMouseOut() {
    setIsOvered(false);
  }

  return (
    <div className={className} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <p>Categories</p>
      {isOvered && <DropdownContent />}
    </div>
  );
}

const Dropdown = styled(NonStyledDropdown)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Kodchasan', sans-serif;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #fdfdfd;
  margin-right: 10px;
  width: 192px;
`;

export default Dropdown;
