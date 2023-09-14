import React, { useState } from 'react';
import styled from 'styled-components';
import StyledInput from './StyledInput';
import StyledButton from './StyledButton';
import axios from 'axios';
import getFormObject from '../helpers/getFormObject';
import { useNavigate } from 'react-router-dom';

const HorizontalLine = styled.div`
  border-bottom: 3px solid #112d4e;
  width: 155px;
  margin-top: 6px;
`;

function NonStyledSignUpTextContainer({ className }) {
  return (
    <div className={className}>
      Sign Up
      <HorizontalLine></HorizontalLine>
    </div>
  );
}

const SignUpTextContainer = styled(NonStyledSignUpTextContainer)`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SignButton = styled(StyledButton)`
  grid-area: submit;
  position: relative;
  top: 20px;
  justify-self: start;
  left: 20px;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: 10% 50% 10%;
  grid-template-columns: 1fr 1fr;
  margin-top: -20px;
  height: 100%;
  grid-template-areas: 'radio-container .' 'input input' 'submit error';
`;

const ErrorIndicator = styled.div`
  grid-area: error;
  color: red;
  font-family: 'Kodchasan';
  font-size: 20px;
  margin-top: 10px;
`;

const StyledRadioButton = styled.input.attrs({
  type: 'radio',
})`
  accent-color: #112d4e;
`;

function NonStyledRadioButtonContainer({ className }) {
  return (
    <div className={className}>
      <label htmlFor='sex'>
        Male<StyledRadioButton value='MALE' required name='gender'></StyledRadioButton>
      </label>
      <label htmlFor='sex'>
        Female<StyledRadioButton value='FEMALE' required name='gender'></StyledRadioButton>
      </label>
    </div>
  );
}

export const RadioButtonContainer = styled(NonStyledRadioButtonContainer)`
  grid-area: radio-container;
  display: flex;
  gap: 10px;
  font-size: 16px;
`;

const SignUpInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-area: input;
  align-content: flex-start;
  column-gap: 19px;
  row-gap: 17px;
`;

function NonStyledSignUpContainer({ className }) {
  let navigate = useNavigate();

  const SexStyle = {
    WebkitTransition: 'all',
    msTransition: 'all',
    fontSize: '16px',
  };

  const [errorState, setErrorState] = useState(null);

  const fields = ['name', 'surname', 'email', 'phone', 'password', 'password confirm'];
  const inputList = fields.map((field, index) => (
    <StyledInput
      required
      name={field}
      placeholder={field}
      type={
        field === 'password' || field === 'password confirm'
          ? 'password'
          : field === 'e-mail'
          ? 'email'
          : 'text'
      }
      color='#112D4E'
      key={index}></StyledInput>
  ));

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formObject = getFormObject(form);

    if (formObject['password confirm'] !== formObject.password) {
      setErrorState('Password is not confirmed. Try Again.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_SERVICE_URL}/customers/register`,
        formObject,
      );
      console.log(response);
      navigate('/welcome');
    } catch (error) {
      console.error(error);
      setErrorState(error.response.data.error);
    }
  }
  return (
    <div className={className}>
      <SignUpTextContainer></SignUpTextContainer>
      <p style={SexStyle}>Sex</p>
      <StyledForm onSubmit={onSubmit}>
        <RadioButtonContainer></RadioButtonContainer>
        <SignUpInputContainer>{inputList}</SignUpInputContainer>

        <SignButton color='white' type='submit' bgColor='#3F72AF'>
          Continue
        </SignButton>
        {errorState !== null ? <ErrorIndicator>{errorState}</ErrorIndicator> : false}
      </StyledForm>
    </div>
  );
}

const SignUpContainer = styled(NonStyledSignUpContainer)`
  width: 717px;
  height: 449px;
  border-style: solid;
  border-width: 1px;
  border-color: #112d4e;
  border-radius: 55px;
  background-color: white;
  display: flex;
  flex-direction: column;
  color: #112d4e;
  padding: 19px 39px 0px;
  font-size: 40px;
  font-family: 'Kodchasan';
  gap: 20px;
`;
export default SignUpContainer;
