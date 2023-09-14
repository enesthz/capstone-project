import styled from 'styled-components';
import ShortcutCircle from './ShortcutCircle';

import React from 'react';
import { Link } from 'react-router-dom';

function NonStyledShortcut({ className, brand }) {
  return (
    <Link to={`/brand/${brand._id}`} state={{ brandName: brand.name }}>
      <div className={className}>
        <ShortcutCircle src={brand.logo} brand={brand.name}></ShortcutCircle>
        <p id='brand'>{brand.name}</p>
      </div>
    </Link>
  );
}

const Shortcut = styled(NonStyledShortcut)`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
  font-family: 'Kodchasan', sans-serif;
  color: #3f72af;
  font-weight: bold;
  font-size: 24px;

  p:hover {
    color: #112d4e;
  }
`;
export default Shortcut;
