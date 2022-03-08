import React, {useContext, useState} from 'react'
import {  Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {Link, useNavigate} from 'react-router-dom';
import {useCookies} from "react-cookie";
import styled from "styled-components";
import {validateLoginForm} from "../utils";
import {toast} from "react-toastify";
import {AuthContext} from "../App";
import Auth from "../api-services/auth";

function Login() {
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(["user"]);
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();


    function handleLogin(event) {
        event.preventDefault();
        if(validateLoginForm(email, password)) {
            Auth.login({email, password}).then((res) => {
                toast.success("Logged in successfully");
                setCookie("user", res.data, {path: '/'});
                setUser(res.data);
                navigate("/");
            }).catch((error) => toast.error(error?.response?.data?.message || "Something went wrong"));
        }
    }

    return (
        <StyledComponent>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='red' textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large' onSubmit={e => handleLogin(e)}>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className='login-button'>
                            Login
                        </button>
                    </Segment>
                </Form>
                <Link to={'/signup'}>
                <Message>
                    New here? <span style={{color: '#db2828'}}>Sign Up</span>
                </Message>
                </Link>
                <a target="_blank" rel="noreferrer"  href="https://docs.google.com/document/d/16PvgOV7Afj9Abjj_AiejMyxDjs4ihG9105FOlmcLHlg/edit?usp=sharing" >
                    <span style={{color: '#B0B0B0'}}>Login Details</span>
                </a>
            </Grid.Column>
        </Grid>
        </StyledComponent>
    )

}

export default Login

const StyledComponent = styled.div`
  .login-button {
  width: 100%;
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