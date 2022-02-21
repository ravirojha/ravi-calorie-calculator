import React from 'react';
import styled from "styled-components";

function NoItemsFound(props) {
    return (
        <StyledComponent>
            <h1 className="no-items">No Items Found</h1>
        </StyledComponent>
    );
}

export default NoItemsFound;

const StyledComponent = styled.div`
  .no-items {
    margin: 50px;
  }
`;