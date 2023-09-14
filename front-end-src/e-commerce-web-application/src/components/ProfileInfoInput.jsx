import React from 'react';
import styled from 'styled-components';
import StyledInput from './StyledInput';

function NonStyledProfileInfoInput({ className, defaultValue, color, field, handleFocus }) {
  return (
    <div className={className} id={field}>
      <p>{field}:</p>
      <StyledInput
        name={field}
        type={
          field === 'password' || field === 'password confirm'
            ? 'password'
            : field === 'email'
            ? 'email'
            : 'text'
        }
        onFocus={handleFocus}
        defaultValue={defaultValue}
        color={color}
        required></StyledInput>
    </div>
  );
}

const ProfileInfoInput = styled(NonStyledProfileInfoInput)`
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
`;
export default ProfileInfoInput;
