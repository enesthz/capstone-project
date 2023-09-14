import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NonStyledLink({ className, children, to, state }) {
  return (
    <Link to={to} className={className} state={state}>
      {children}
    </Link>
  );
}

const StyledLink = styled(NonStyledLink)`
  &:visited {
    text-decoration: none;
  }
  &:link {
    text-decoration: none;
  }
`;
export default StyledLink;
