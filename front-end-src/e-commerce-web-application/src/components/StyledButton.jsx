import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline;
  padding: 10px 20px;
  background-color: ${(props) => props.bgColor};
  font-family: 'Kodchasan', sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-style: solid;
  border-radius: 13px;
  border-width: 1px;
  color: ${(props) => props.color};
  border-color: black;

  :hover {
    cursor: pointer;
  }
`;

export default StyledButton;
