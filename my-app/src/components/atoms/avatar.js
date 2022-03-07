import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import styled from "styled-components";
import {useContext} from "react";
import {AuthContext} from "../../App";
import {useNavigate} from "react-router-dom";

export default function AvatarIcon({handleLogout}) {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleSettings = () => {
        navigate(`/user/${user.id}`);
        setAnchorEl(null);
    };

    return (
        <StyledComponent>
        <Toolbar className='avatar'>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle fontSize="large"/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem><b>Hello,<span style={{paddingLeft: '2px'}}>{user.name}!!!</span></b></MenuItem>
                        <MenuItem onClick={handleSettings}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
        </Toolbar>
        </StyledComponent>
    );
}

const StyledComponent = styled.div`
.avatar {
    position: fixed;
    right: 3rem;
    top: 0.8%;
}
`;