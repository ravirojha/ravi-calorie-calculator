import React, {useContext, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { AuthContext } from '../../App';

function NavBar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const {user} = useContext(AuthContext);

  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }
  return (
    <StyledComponent>
      <div className="nav-bar">
        <Menu pointing secondary>
          <Link to={'/'}>
            <Menu.Item
              name="food"
              active={activeItem === '/' || activeItem === 'food'}
              onClick={handleItemClick}
            />
          </Link>
          {user?.isAdmin && (
            <Link to={'/reports'}>
              <Menu.Item
                name="report"
                active={activeItem === '/reports' || activeItem === 'report'}
                onClick={handleItemClick}
              />
            </Link>
          )}
        </Menu>
      </div>
    </StyledComponent>
  );
}

export default NavBar;

const StyledComponent = styled.div`
  .nav-bar {
    width: 100%;
    padding: 20px 20px;
  }
`;
