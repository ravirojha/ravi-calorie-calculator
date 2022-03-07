import React, {useContext, useState} from 'react';
import styled from "styled-components";
import {AuthContext} from "../App";
import {TextField} from "@mui/material";

function User(props) {
    const [isEditing, setIsEditing] = useState(false);
    const {user} = useContext(AuthContext);

    return (
        <StyledComponent>
        <div className='user'>
            <div className='user-details'>
                <i
                    className={'fa fa-edit edit-btn'}
                    onClick={() => setIsEditing(!isEditing)}
                />
                <div className='user-details-info'>
                <div className='email'>
                    <span className='data-label'>Email :   </span>
                    {!isEditing ? <span className='data-content'>{user.email}</span> : <TextField
                        size="small"
                        fullWidth
                        id="outlined-name"
                        // value={userItemData.email}
                        placeholder="User email"
                        className='data-content'
                        type="email"
                        // onChange={(e) =>
                        //     setUserItemData( prevValue => {
                        //         return  {...prevValue, email: e.target.value}
                        //     })
                        // }
                    />}
                </div>
                <div className='name'><span className='data-label'>Name :   </span>{!isEditing ? <span className='data-content'>{user.name}</span> : <TextField
                    size="small"
                    fullWidth
                    id="outlined-name"
                    // value={userItemData.dailyCalorieLimit}
                    placeholder="Daily Calorie Limit"
                    className='data-content'
                    type="number"
                    // onChange={(e) =>
                    //     setUserItemData( prevValue => {
                    //         return  {...prevValue, dailyCalorieLimit: e.target.value}
                    //     })
                    // }
                />}</div>
                <div className='calorie'><span className='data-label'>Daily Calorie Limit :   </span>{
                    !isEditing ? <span className='data-content'>{user.dailyCalorieLimit}</span> : <TextField
                        size="small"
                        fullWidth
                        id="outlined-name"
                        // value={userItemData.dailyCalorieLimit}
                        placeholder="Daily Calorie Limit"
                        className='data-content'
                        type="number"
                        // onChange={(e) =>
                        //     setUserItemData( prevValue => {
                        //         return  {...prevValue, dailyCalorieLimit: e.target.value}
                        //     })
                        // }
                    />}</div>
                <div className='budget'><span className='data-label'>Monthly Budget :   </span>{!isEditing ? <span className='data-content'>{user.monthlyBudget}</span> : <TextField
                    size="small"
                    fullWidth
                    id="outlined-name"
                    // value={userItemData.monthlyBudget}
                    placeholder="Monthly Budget"
                    className='data-content'
                    type="number"
                    // onChange={(e) =>
                    //     setUserItemData( prevValue => {
                    //         return  {...prevValue, monthlyBudget: e.target.value}
                    //     })
                    // }
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
 .edit-btn {
 margin-left: auto;
    font-size: 1.5rem;
    cursor: pointer;
    padding-right: 3rem;
    padding-top: 2rem;
    color: #db2828;
 }
 
 .name {
 width: 100%;
 }
 

 


`;