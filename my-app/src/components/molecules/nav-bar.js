import React, {useContext, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useCookies} from "react-cookie";
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { AuthContext } from '../../App';
import {toast} from "react-toastify";

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
              name="food"
              active={activeItem === '/' || activeItem === 'food'}
              onClick={handleItemClick}
            />
          </Link>
          </div>
          {user?.isAdmin && (
              <div>
            <Link to={'/reports'}>
              <Menu.Item
                name="report"
                active={activeItem === '/reports' || activeItem === 'report'}
                onClick={handleItemClick}
              />
            </Link>
              </div>
          )}
          {user?.isAdmin && (
              <div>
              <Link to={'/users'}>
                <Menu.Item
                    name="Users"
                    active={activeItem === '/users' || activeItem === 'users'}
                    onClick={handleItemClick}
                />
              </Link>
              </div>
          )}
        </Menu>
        <button onClick={handleLogout} className='logout'>
          Logout
        </button>
      </div>
    </StyledComponent>
  );
}

export default NavBar;

const StyledComponent = styled.div`
  .nav-bar {
    width: 100%;
    padding-top: 20px;
    display: flex;
    align-items: center;
    position: fixed;
    background-color: #fff;
    z-index: 50;
  }
  
  .menu-bar {
  flex: 1;
  }
  
  .logout {
  position: fixed;
  right: 5%;
  top: 3%;
  border: none;
  color: #fff;
  font-size: 1.14285714rem;
  cursor: pointer;
  background-color: #db2828;
  height: 2.5rem;
  border-radius: 5px;
  font-weight: 600;
  }
 
`;
