import React from 'react';
import styled from 'styled-components';

export const LogoFirst = styled.div`
  color: #dbe2ef;
  font-size: 64px;
  font-family: 'Audiowide';
`;

export const LogoSecond = styled(LogoFirst)`
  color: #112d4e;
`;

export function NonStyledLogo({ className }) {
  return (
    <div className={className}>
      <LogoFirst>Byte</LogoFirst>
      <LogoSecond>Buy</LogoSecond>
    </div>
  );
}

const Logo = styled(NonStyledLogo)`
  display: flex;
  flex-direction: row;
`;

export default Logo;
