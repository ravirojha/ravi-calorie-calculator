import React from 'react';
import styled from "styled-components";

function User(props) {
    return (
        <StyledComponent>
        <div className='user'>User</div>
        </StyledComponent>
    );
}

export default User;

const StyledComponent = styled.div`
.user {
padding-top: 6rem;
}
`;