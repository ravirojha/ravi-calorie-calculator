import React from 'react';
import styled from "styled-components";

function NotFound() {
  return (
      <StyledComponent>
    <div className='not-found'>
      <h1>404</h1>
      <p>Not Found</p>
    </div>
      </StyledComponent>
  );
}

export default NotFound;

const StyledComponent = styled.div`
.not-found {
padding-top: 6rem;
}
`;
