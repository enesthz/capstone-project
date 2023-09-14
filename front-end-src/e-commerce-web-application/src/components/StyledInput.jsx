import styled from 'styled-components';

const StyledInput = styled.input`
  &::placeholder {
    color: black;
    font-family: 'Kodchasan', sans-serif;
    font-weight: 500;
  }

  font-family: 'Kodchasan', sans-serif;
  font-weight: 500;

  &:focus {
    outline: none;
  }

  &::selection {
    background-color: #3f72af;
  }

  border: none;
  border-style: solid;
  border-color: ${(props) => props.color};
  border-radius: 28px;
  width: 310px;
  height: 41px;
  padding-left: 15px;
`;

export default StyledInput;
