import React, {useContext, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useCookies} from "react-cookie";
import { Menu } from 'semantic-ui-react';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';
import { AuthContext } from '../../App';
import {toast} from "react-toastify";
import AvatarIcon from "../atoms/avatar";

function NavBar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const {user, setUser} = useContext(AuthContext);
  const [,  , removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }
  const handleLogout = () => {
    toast.success("Logged out successfully");
    removeCookie("user", {path: '/'});
    setUser(null);
    navigate('/');
  }

  return (
    <StyledComponent>
      <div className="nav-bar">
        <Menu pointing secondary className='menu-bar'>
          <div>
          <Link to={'/'}>
            <Menu.Item
              name="foods"
              active={activeItem === '/' || activeItem === 'foods'}
              onClick={handleItemClick}
            />
          </Link>
          </div>
          {user?.isAdmin && (
              <div>
            <Link to={'/reports'}>
              <Menu.Item
                name="reports"
                active={activeItem === '/reports' || activeItem === 'reports'}
                onClick={handleItemClick}
              />
            </Link>
              </div>
          )}
          {user?.isAdmin && (
              <div>
              <Link to={'/users'}>
                <Menu.Item
                    name="users"
                    active={activeItem === '/users' || activeItem === 'users'}
                    onClick={handleItemClick}
                />
              </Link>
              </div>
          )}
        </Menu>
        <AvatarIcon handleLogout={handleLogout} />
      </div>
    </StyledComponent>
  );
}

export default NavBar;

const StyledComponent = styled.div`
  .nav-bar {
    width: 100%;
    padding: 20px 15px 0 15px;
    display: flex;
    align-items: center;
    position: fixed;
    background-color: #fff;
    z-index: 50;
  }
  
  .menu-bar {
  flex: 1;
  }
 
`;
