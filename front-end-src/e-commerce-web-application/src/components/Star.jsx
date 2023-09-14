import React from 'react';
import styled from 'styled-components';
import { faStar as starRegular } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as starSolid } from '@fortawesome/free-solid-svg-icons';

function NonStyledStar({
  className,
  active,
  rate,
  setHoverLocation,
  setClickLocation,
  clickLocation,
}) {
  function handleMouseOver(event) {
    setHoverLocation(rate);
  }

  function handleMouseOut(event) {
    setHoverLocation(0);
  }

  function handleClick(event) {
    if (clickLocation !== 0) {
      setClickLocation(0);
    } else {
      setClickLocation(rate);
    }
  }

  return (
    <span
      className={className}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={handleClick}>
      {active ? (
        <FontAwesomeIcon icon={starSolid} style={{ color: '#ffdf00' }} />
      ) : (
        <FontAwesomeIcon icon={starRegular} />
      )}
    </span>
  );
}

const Star = styled(NonStyledStar)`
  font-size: 48px;
`;

export default Star;
