import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

function NonStyledProductOverview({ className, product }) {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  function handleChevronClick(event) {
    event.preventDefault();
    setIsOverviewOpen(!isOverviewOpen);
  }

  return (
    <div className={className}>
      <div id='topPart'>
        <div id='overviewText'>Overview</div>
        <div onClick={handleChevronClick} id='iconDown'>
          {isOverviewOpen ? (
            <FontAwesomeIcon icon={faChevronUp} style={{ color: '#112d4e' }} size='sm' />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} style={{ color: '#112d4e' }} size='sm' />
          )}
        </div>
      </div>
      {isOverviewOpen ? <div id='productDescription'>{product.description}</div> : false}
    </div>
  );
}

const ProductOverview = styled(NonStyledProductOverview)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  #topPart {
    width: 95%;
    border: 1px solid #112d4e;
    font-family: 'Kodchasan', sans-serif;
    font-size: 48px;
    font-weight: bold;
    border-radius: 10px;
    padding: 0px 20px;
  }

  #topPart #overviewText {
    float: left;
  }

  #topPart #iconDown {
    float: right;
  }

  #productDescription {
    width: 95%;
    border: 1px solid #112d4e;
    font-family: 'Kodchasan', sans-serif;
    font-size: 28px;
    font-weight: bold;
    border-radius: 10px;
    padding: 20px 20px;
  }
`;
export default ProductOverview;
