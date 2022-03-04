import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../App';

function UserTableHeader() {
  const {user, setUser} = useContext(AuthContext);
  return (
    <StyledComponent>
      <div className="table-header">
        <div className="header-content">
          <span className="name alignment">Name</span>
          {user?.isAdmin && <span className="email alignment">User Email</span>}
          <span className="admin alignment">Admin</span>
          <span className="calorie alignment">Daily Calorie Limit</span>
          <span className="budget alignment">Monthly Budget</span>
        </div>
      </div>
    </StyledComponent>
  );
}

export default UserTableHeader;

const StyledComponent = styled.div`
  .table-header {
    display: flex;
    flex: 1;
    width: 100%;
    margin: 1% 2%;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    font-size: 1.2rem;
    padding: 5px;
    height: 4rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }

  .header-content {
    display: flex;
    width: 80%;
    justify-content: space-between;
  }
  
  .name{
    flex: 0.2;
  }

  .email{
    flex: .3;
  }

  .admin{
    flex: 0.1;
    padding-left: 5%;
  }
  .calorie{
    flex: 0.2;
  }
  .budget{
    flex: 0.2;
  }

  .alignment {
    text-align: left;
    padding-left: 4%;
  }
`;
