import React, { useState } from 'react';
import styled from 'styled-components';
import Star from './Star';

function NonStyledStarContainer({ className }) {
  const [hoverLocation, setHoverLocation] = useState(0);
  const [clickLocation, setClickLocation] = useState(0);

  return (
    <div className={className}>
      <Star
        clickLocation={clickLocation}
        active={hoverLocation >= 1 || clickLocation >= 1}
        rate={1}
        setClickLocation={setClickLocation}
        setHoverLocation={setHoverLocation}></Star>
      <Star
        clickLocation={clickLocation}
        active={hoverLocation >= 2 || clickLocation >= 2}
        rate={2}
        setClickLocation={setClickLocation}
        setHoverLocation={setHoverLocation}></Star>
      <Star
        clickLocation={clickLocation}
        active={hoverLocation >= 3 || clickLocation >= 3}
        rate={3}
        setClickLocation={setClickLocation}
        setHoverLocation={setHoverLocation}></Star>
      <Star
        clickLocation={clickLocation}
        active={hoverLocation >= 4 || clickLocation >= 4}
        rate={4}
        setClickLocation={setClickLocation}
        setHoverLocation={setHoverLocation}></Star>
      <Star
        clickLocation={clickLocation}
        active={hoverLocation >= 5 || clickLocation >= 5}
        rate={5}
        setClickLocation={setClickLocation}
        setHoverLocation={setHoverLocation}></Star>
    </div>
  );
}

const StarContainer = styled(NonStyledStarContainer)`
  display: inline-flex;
`;

export default StarContainer;
