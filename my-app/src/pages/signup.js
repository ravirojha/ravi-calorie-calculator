import React, {useState} from 'react'
import {  Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {validateSignUpForm} from "../utils";
import Auth from "../api-services/auth";
import {toast} from "react-toastify";

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSignUp(event) {
        event.preventDefault();
        if (validateSignUpForm(name, email, password)) {
            Auth.signup({name, email, password}).then((res) => {
                console.log(res,'then');
                toast.success("Signed Up Successfully");
                navigate('/login')
            }).catch((error) => {
                console.log(error,'catch');
                toast.error(error?.response?.data?.message || "Something went wrong");
            });
        }
    }

        return (
            <StyledComponent>
                <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='red' textAlign='center'>
                            Create a new account
                        </Header>
                        <Form size='large' onSubmit={e => handleSignUp(e)}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Name' value={name}
                                            onChange={e => setName(e.target.value)}/>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address'
                                            value={email} onChange={e => setEmail(e.target.value)}/>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    email={password}
                                    onChange={e => setPassword(e.target.value)}
                                />

                                <button className='signup-button'>
                                    Sign Up
                                </button>
                            </Segment>
                        </Form>
                        <Link to={'/login'}>
                            <Message>
                                Already a member? <span style={{color: 'red'}}>Login</span>
                            </Message>
                        </Link>
                    </Grid.Column>
                </Grid>
            </StyledComponent>
        )

}

const StyledComponent = styled.div`
  .signup-button {
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