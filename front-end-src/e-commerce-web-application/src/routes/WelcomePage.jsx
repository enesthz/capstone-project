import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../App';
import Logo from '../components/Logo';
import StyledInput from '../components/StyledInput';
import StyledButton from '../components/StyledButton';
import axios from 'axios';
import getFormObject from '../helpers/getFormObject';
import { Link, useNavigate } from 'react-router-dom';
import parseJwt from '../helpers/parseJwt';
import { updateUserId } from '../redux/slices/userIdSlice';
import { useDispatch } from 'react-redux';

const StyledWelcome = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const LogoSide = styled.div`
  background: #3f72af;
  flex-basis: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginSide = styled.div`
  background: #112d4e;
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoAndSlogan = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const Slogan = styled.div`
  font-family: 'Kodchasan', sans-serif;
  font-size: 16px;
  color: white;
  text-align: center;
`;

const HorizontalLine = styled.div`
  border-bottom: 2px solid #112d4e;
  width: 80px;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const LoginContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 400px;
  width: 70%;
  background-color: white;
  border: 1px solid #3f72af;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  color: #3f72af;
  font-family: 'Kodchasan', sans-serif;
  font-weight: bold;
  font-size: 24px;
  p {
    margin-top: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input {
    margin-bottom: 20px;
  }

  .signUpLink {
    font-size: 16px;
    margin-top: 10px;
    :hover {
      text-decoration: underline;
      cursor: pointer;
      color: #112d4e;
    }
  }

  #error {
    font-size: 16px;
    color: red;
  }
`;

function WelcomePage() {
  const [error, setError] = useState(null);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    let form = event.target;
    let formObject = getFormObject(form);
    axios
      .post(`${process.env.REACT_APP_USER_SERVICE_URL}/customers/login`, formObject)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        let userId = parseJwt(localStorage.getItem('token')).id;
        dispatch(updateUserId(userId));
        navigate('/home');
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  }

  return (
    <>
      <GlobalStyle />
      <StyledWelcome>
        <LogoSide>
          <LogoAndSlogan>
            <Logo />
            <Slogan>Come and Bite a Byte!</Slogan>
          </LogoAndSlogan>
        </LogoSide>
        <LoginSide>
          <LoginContainer>
            <p>Log In</p>
            <HorizontalLine></HorizontalLine>
            <form method='post' onSubmit={handleSubmit}>
              <label htmlFor='email'>
                <StyledInput
                  required
                  id='email'
                  name='email'
                  className='input'
                  color='#112d4e'
                  placeholder='email'></StyledInput>
              </label>
              <label htmlFor='password'></label>
              <StyledInput
                required
                id='password'
                name='password'
                className='input'
                color='#112d4e'
                placeholder='password'
                type='password'></StyledInput>
              <StyledButton bgColor='#3f72af' color='white' type='submit'>
                Log In
              </StyledButton>
              <Link to={'/signUp'} className='signUpLink'>
                or Sign Up
              </Link>
              {error !== null ? <p id='error'>{error}</p> : false}
            </form>
          </LoginContainer>
        </LoginSide>
      </StyledWelcome>
    </>
  );
}

export default WelcomePage;
