import React from 'react';
import { GlobalStyle } from '../App';
import SignUpHeader from '../components/SignUpHeader';
import styled from 'styled-components';
import SignUpContainer from '../components/SignUpContainer';

function NonStyledSignUpSide({ className, children }) {
  return <div className={className}>{children}</div>;
}

const SignUpSide = styled(NonStyledSignUpSide)`
  display: flex;
  padding: 75px 195px;
  justify-content: center;
  align-items: center;
  background-color: #112d4e;
  flex-grow: 1;
`;

function NonStyledSignUp({ className }) {
  return (
    <div className={className}>
      <GlobalStyle />
      <SignUpHeader></SignUpHeader>
      <SignUpSide>
        <SignUpContainer></SignUpContainer>
      </SignUpSide>
    </div>
  );
}

const SignUp = styled(NonStyledSignUp)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export default SignUp;
