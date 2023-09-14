import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { GlobalStyle } from '../App';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import { selectSearchOutcome } from '../redux/slices/searchOutcomeSlice';
import StyledLink from '../components/StyledLink';
import SearchProductImageContainer from '../components/SearchProductImageContainer';
import PrivateRoute from './PrivateRoute';

const StyledLinkExtended = styled(StyledLink)`
  font-family: 'Kodchasan';
  color: #112d4e;
  font-size: 20px;
`;

function NonStyledSearchPage({ className }) {
  const searchOutcomes = useSelector(selectSearchOutcome);

  let searchOutcomeList = searchOutcomes.map((outcome, index) => {
    return (
      <div className={'outcomeContainer'} key={index}>
        <SearchProductImageContainer product={outcome} />
        <StyledLinkExtended to={`/product/${outcome._id}`}>{outcome.title}</StyledLinkExtended>
      </div>
    );
  });

  return (
    <PrivateRoute>
      <div className={className}>
        <GlobalStyle />
        <Header></Header>
        <div id='content'>
          <p id='searchOutcomeText'>Search Outcomes:</p>
          <div id='outcomes'>{searchOutcomeList}</div>
        </div>
        <Footer></Footer>
      </div>
    </PrivateRoute>
  );
}

const SearchPage = styled(NonStyledSearchPage)`
  display: flex;
  flex-direction: column;

  #content #outcomes {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px 100px;
    justify-content: start;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  #content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #content #searchOutcomeText {
    font-family: 'Kodchasan';
    font-size: 28px;
    text-decoration: underline;
    color: #112d4e;
  }

  .outcomeContainer {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
  }
`;
export default SearchPage;
