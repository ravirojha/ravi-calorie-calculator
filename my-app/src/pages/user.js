import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {AuthContext} from "../App";
import {TextField} from "@mui/material";
import UserService from "../api-services/user-service";
import {toast} from "react-toastify";
import {Loader} from "semantic-ui-react";
import {useParams} from "react-router-dom";

function User(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [userItemData, setUserItemData] = useState(null);
    const {user, setUser} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [bit, setBit] = useState(true);
    const {id} = useParams();


    useEffect(() => {
        UserService.getUserById({ id: user.id }, user)
            .then((res) => {
                setUserItemData(res?.data);
                setIsLoading(false)
            })
            .catch((error) => toast.error(error.response.data.message));

    }, [ user, bit]);

    const validateData = () => {
        if (!userItemData.name) toast.error("Name is Required");
        else if (userItemData.name.trim().length < 1)
            toast.error("Valid name of atleast 1 char is required");
        else if (!userItemData.email || (!String(userItemData.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))) toast.error("Provide a valid email address");
        else if (!userItemData.dailyCalorieLimit || userItemData.dailyCalorieLimit > 2100) toast.error("Enter valid calorie limit");
        else if (!userItemData.monthlyBudget || userItemData.monthlyBudget > 5000) toast.error(("Enter valid monthly budget"));
        else if (userItemData.password && userItemData.password.length < 4) {
            toast.error("Password length must be atleast 4 characters long")
        }
        else return true;
    };

    function handleUpdate(id) {
        if(validateData()) {
            UserService.updateUser(id, {...userItemData}, user).then(res => {
                setIsEditing(!isEditing);
                toast.success("Updated Successfully");
            }).catch((e) => {
                let error = e.response.data.message;
                toast.error(error)
            });
        }
    }

    return (
        isLoading ? <Loader active/> :
        <StyledComponent>
        <div className='user'>
                <div className='user-details'>
                    {isEditing ? <div className='buttons'>
                            <i
                                className={'fa fa-check edit-btn'}
                                onClick={() => handleUpdate(id)}
                            />
                            <i
                                className={'fa fa-close dlt-btn'}
                                onClick={() => {
                                    setIsEditing(false);
                                    setBit(!bit);
                                }
                                }
                            /></div> :
                        (<i
                            className={'fa fa-edit edit-btn'}
                            onClick={() => setIsEditing(!isEditing)}
                        />)}
                    <div className='user-details-info'>
                        <div className='email'>
                            <span className='data-label'>Email :   </span>
                            {!isEditing ? <span className='data-content'>{userItemData?.email}</span> : <TextField
                                size="small"
                                id="outlined-name"
                                value={userItemData?.email}
                                placeholder="User email"
                                className='data-content'
                                type="email"
                                onChange={(e) =>
                                    setUserItemData(prevValue => {
                                        return {...prevValue, email: e.target.value}
                                    })
                                }
                            />}
                        </div>
                        <div className='name'><span className='data-label'>Name :   </span>{!isEditing ?
                            <span className='data-content'>{userItemData?.name}</span> : <TextField
                                size="small"
                                id="outlined-name"
                                value={userItemData?.name}
                                placeholder="Name"
                                className='data-content'
                                type="text"
                                onChange={(e) =>
                                    setUserItemData(prevValue => {
                                        return {...prevValue, name: e.target.value}
                                    })
                                }
                            />}</div>
                        <div className='calorie'><span className='data-label'>Daily Calorie Limit :   </span>{
                            !isEditing ? <span className='data-content'>{userItemData?.dailyCalorieLimit}</span> :
                                <TextField
                                    size="small"
                                    id="outlined-name"
                                    value={userItemData?.dailyCalorieLimit}
                                    placeholder="Daily Calorie Limit"
                                    className='data-content'
                                    type="number"
                                    onChange={(e) =>
                                        setUserItemData(prevValue => {
                                            return {...prevValue, dailyCalorieLimit: e.target.value}
                                        })
                                    }
                                />}</div>
                        <div className='budget'><span className='data-label'>Monthly Budget :   </span>{!isEditing ?
                            <span className='data-content'>{userItemData?.monthlyBudget}</span> : <TextField
                                size="small"
                                id="outlined-name"
                                value={userItemData?.monthlyBudget}
                                placeholder="Monthly Budget"
                                className='data-content'
                                type="number"
                                onChange={(e) =>
                                    setUserItemData(prevValue => {
                                        return {...prevValue, monthlyBudget: e.target.value}
                                    })
                                }
                            />}</div>
                    </div>
                </div>
        </div>
        </StyledComponent>
    );
}

export default User;

const StyledComponent = styled.div`
.user {
padding-top: 6rem;
display: flex;
height: 80vh;
justify-content: center;
}

.user-details {
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 2vw;
      }
      
      .user-details-info {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 8%;
      }
      
      .name {
      display: flex;
      width: 100%;

      }
      
      .email {
      display: flex;
      width: 100%;
      }
      
      .calorie {
      display: flex;
      width: 100%;
      }
      
      .budget {
      display: flex;
      width: 100%;
      }
      
      .data-label {
      display: block;
      width: 13rem;
      height: 2.5rem;
      font-size: 1.5rem;
      font-style: italic;
      }
      
      .data-content {
      padding-left: 1rem;
      }
      
      .buttons {
      display: flex;
      margin-left: auto;
      }
 
  .edit-btn {
 margin-left: auto;
 display: inline;
    font-size: 1.5rem;
    cursor: pointer;
    padding-right: 3rem;
    padding-top: 2rem;
    color: #db2828;
 }
 
 .dlt-btn {
 display: inline;
 margin-left: auto;
    font-size: 1.5rem;
    cursor: pointer;
    padding-right: 3rem;
    padding-top: 2rem;
 }
 

 


`;