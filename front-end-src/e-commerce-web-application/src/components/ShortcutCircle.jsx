import React from 'react';
import styled from 'styled-components';

function NonStyledShortcutCircle({ className, src, brand }) {
  return (
    <div className={className}>
      <img src={src} alt={brand + ' logo'}></img>
    </div>
  );
}

const ShortcutCircle = styled(NonStyledShortcutCircle)`
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  border-color: #112d4e;
  width: 119px;
  height: 119px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: initial;
  font-weight: initial;
  font-family: initial;
  color: initial;

  img {
    width: 70%;
  }
`;

export default ShortcutCircle;
