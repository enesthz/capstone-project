import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import SearchBar from './Searchbar';
import Dropdown from './Dropdown';
import StyledLink from './StyledLink';

const StyledLinkExtended = styled(StyledLink)`
  p {
    color: white;
    font-family: 'Kodchasan';
    font-size: 24px;
    font-weight: bold;
  }

  p:hover {
    color: #112d4e;
  }
`;

function NonStyledHeader({ className }) {
  return (
    <div className={className}>
      <div id='logo'>
        <StyledLink to={'/home'}>
          <Logo />
        </StyledLink>
      </div>
      <div id='searchbar'>
        <SearchBar />
      </div>
      <div id='headerInteract'>
        <Dropdown />
        <div id='profileText'>
          <StyledLinkExtended to={'/profile'}>
            <p>Profile</p>
          </StyledLinkExtended>
        </div>
        <StyledLinkExtended to={'/cart'}>
          <p>My Cart</p>
        </StyledLinkExtended>
      </div>
    </div>
  );
}

const Header = styled(NonStyledHeader)`
  #headerInteract {
    position: absolute;
    top: 40%;
    left: 68%;
    display: flex;
    gap: 50px;
  }
  position: relative;
  background: #3f72af;
  height: 142px;
  padding-left: 52px;

  #logo {
    position: relative;
    top: 25%;
    display: inline-block;
  }

  #searchbar {
    position: relative;
    left: 5%;
    display: inline-block;
    top: 32px;
  }

  #profileText {
    margin-left: -24px;
  }
`;

export default Header;
