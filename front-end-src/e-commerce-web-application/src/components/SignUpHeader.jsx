import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

function NonStyledSignUpHeader({ className }) {
  return (
    <div className={className}>
      <Logo></Logo>
    </div>
  );
}
const SignUpHeader = styled(NonStyledSignUpHeader)`
  display: flex;
  background-color: #3f72af;
  padding: 39px 52px;
  justify-content: center;
`;
export default SignUpHeader;
