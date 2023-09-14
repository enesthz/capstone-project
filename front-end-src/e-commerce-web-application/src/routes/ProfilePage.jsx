import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { removeUserId, selectUserId } from '../redux/slices/userIdSlice';
import Header from '../components/Header';
import { GlobalStyle } from '../App';
import { Footer } from '../components/Footer';
import axios from 'axios';
import getFormObject from '../helpers/getFormObject';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../components/StyledButton';
import ProfileInfoInput from '../components/ProfileInfoInput';
import StyledInput from '../components/StyledInput';
import PrivateRoute from './PrivateRoute';


const StyledRadioButton = styled.input.attrs({
  type: 'radio',
})`
  accent-color: #112d4e;
`;

function NonStyledRadioButtonContainer({ className, gender, handleFocus, radioButtonFlag }) {
  return (
    <div className={className}>
      <label htmlFor='sex'>
        Male
        {gender === 'MALE' || (gender === 'FEMALE' && radioButtonFlag) ? (
          <StyledRadioButton value='MALE' required name='gender' defaultChecked />
        ) : (
          <StyledRadioButton onFocus={handleFocus} value='MALE' required name='gender' />
        )}
      </label>
      <label htmlFor='sex'>
        Female
        {gender === 'FEMALE' || (gender === 'MALE' && radioButtonFlag) ? (
          <StyledRadioButton value='FEMALE' required name='gender' defaultChecked />
        ) : (
          <StyledRadioButton onFocus={handleFocus} value='FEMALE' required name='gender' />
        )}
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

function useForceUpdate() {
  const [value, setValue] = useState(false);
  return () => setValue(!value);
}

function NonStyledProfilePage({ className }) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const forceUpdate = useForceUpdate();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function getUser() {
    axios
      .get(`${process.env.REACT_APP_USER_SERVICE_URL}/customers/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
      });
  }, []);

  function handleUpdate(event) {
    event.preventDefault();
    let form = event.target;
    let formObject = getFormObject(form);

    if (formObject.newPasswordConfirm !== formObject.password) {
      setError('Password is not confirmed. Try Again.');
      return;
    }

    if (formObject.password === '') {
      delete formObject.password;
    }

    axios
      .put(`${process.env.REACT_APP_USER_SERVICE_URL}/customers/${userId}`, formObject, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        console.log(response);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate('/welcome');
        }
        setError(error.response.data.error);
      });
  }

  let inputList = useRef(null);

  useEffect(
    function createInputList() {
      if (user !== null) {
        let userFields = Object.keys(user).filter((element) => {
          return element === '__v' ||
            element === '_id' ||
            element === 'password' ||
            element === 'gender'
            ? false
            : true;
        });

        inputList.current = userFields.map((element, index) => {
          return (
            <ProfileInfoInput
              handleFocus={handleFocus}
              key={index}
              defaultValue={user[element]}
              color={'#112D4E'}
              field={element}></ProfileInfoInput>
          );
        });

        forceUpdate();
      }
    },
    [user],
  );

  function handleFocus(event) {
    event.preventDefault();
    setIsFocused(true);
  }

  let radioButtonFlag = useRef(false);

  function handleFocusRadioButton(event) {
    event.preventDefault();
    radioButtonFlag.current = true;
    setIsFocused(true);
  }

  function handleLogOut(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    dispatch(removeUserId());
    navigate('/welcome');
  }

  return (
    <PrivateRoute>
      {user !== null ? (
        <div className={className}>
          <GlobalStyle />
          <div id='header'>
            <Header />
          </div>
          <div id='content'>
            <p id='editText'>
              Edit Your Profile: <span>{user.name + ' ' + user.surname}</span>
            </p>
            <form id='customerUpdateForm' method='post' onSubmit={handleUpdate}>
              <div id='radioButtonContainer'>
                <p>Sex:</p>
                <RadioButtonContainer
                  handleFocus={handleFocusRadioButton}
                  gender={user.gender}
                  radioButtonFlag={radioButtonFlag.current}></RadioButtonContainer>
              </div>
              {inputList.current}
              <div id='passwordUpdate'>
                <p>Update Your Password:</p>
                <StyledInput
                  onFocus={handleFocus}
                  name='password'
                  placeholder='new password'
                  type='password'></StyledInput>
                <StyledInput
                  onFocus={handleFocus}
                  name='newPasswordConfirm'
                  placeholder='confirm new password'
                  type='password'></StyledInput>
                <p id='errorText'>{error}</p>
              </div>
            </form>
            <div id='buttons'>
              {isFocused && (
                <StyledButton form='customerUpdateForm' color={'white'} bgColor={'#3F72AF'}>
                  Update
                </StyledButton>
              )}
              <StyledButton onClick={handleLogOut} type='button' color='white' bgColor='red'>
                Log Out
              </StyledButton>
            </div>
          </div>
          <div id='footer'>
            <Footer />
          </div>
        </div>
      ) : (
        false
      )}
    </PrivateRoute>
  );
}

const ProfilePage = styled(NonStyledProfilePage)`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'header'
    'content'
    'footer';

  #header {
    grid-area: header;
    margin-bottom: 20px;
  }

  #footer {
    grid-area: footer;
  }

  #content {
    grid-area: content;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #content p {
    font-size: 20px;
  }

  #content form {
    align-self: center;
    display: inline-grid;
    grid-template-columns: 350px auto;
    grid-template-rows: auto auto auto auto;
    grid-template-areas:
      'genderContainer . '
      'name surname'
      'email phone'
      'passwordUpdate passwordUpdate';
    gap: 20px 10px;
  }

  #content span {
    font-weight: bold;
  }

  #content form #radioButtonContainer {
    grid-area: genderContainer;
  }

  #content form #name {
    grid-area: name;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  #content form #surname {
    grid-area: surname;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  #content form #email {
    grid-area: email;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  #content form #phone {
    grid-area: phone;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  #content form #passwordUpdate {
    grid-area: passwordUpdate;
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }

  #content form #passwordUpdate #errorText {
    font-size: 16px;
    color: red;
  }

  #content #buttons {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }

  font-family: 'Kodchasan';
`;

export default ProfilePage;
