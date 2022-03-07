import React, { useContext, useState } from 'react';
import { TextField, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { AuthContext } from '../../App';
import UserService from "../../api-services/user-service";

export default function UserCard({ userItem, isNew, change, reload }) {
    const [isEditing, setIsEditing] = useState(isNew);
    const [userItemData, setUserItemData] = useState(userItem);
    const {user, setUser} = useContext(AuthContext);

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



    function handleDelete(id) {
        UserService.deleteUser(id, user).then((res) => {
            toast.success('Deleted Successfully!');
            reload();
        }).catch((e) => {
            let error = e.response.data.message;
            toast.error(error);
        })
    }



    function handleUpdate(id) {
        if(validateData()) {
            UserService.updateUser(id, {...userItemData}, user).then(res => {
                setIsEditing(!isEditing);
                toast.success("Updated Successfully");
                reload();
            }).catch((e) => {
                let error = e.response.data.message;
                toast.error(error)
            });
        }
    }


    function handleAdd() {
        if(validateData()) {
            UserService.addUser({...userItemData}, user).then(res => {
                change('new', !isNew);
                toast.success("User Item Added");
                reload();
            }).catch((e) => {
                    let error = e.response.data.message;
                    toast.error(error)
                }
            )
        }
    }



    return (
        <StyledComponent>
            <div className="user-card">
                <div className="user-details">
                    {
                        !isEditing ? (
                            <span className="name alignment">{userItemData.name}</span>
                        ) : (
                        <TextField
                        id="outlined-name"
                        placeholder="Name"
                        value={userItemData.name}
                        onChange={(e) =>
                        setUserItemData( prevValue => {
                            return  {...prevValue, name: e.target.value}
                        })
                    }
                        />

                    )}
                    {
                        !isEditing ? (
                            <span className="email alignment"> {userItemData.email}</span>
                        ) : (
                        <TextField
                        id="outlined-name"
                        value={userItemData.email}
                        placeholder="User email"
                        type="email"
                        onChange={(e) =>
                        setUserItemData( prevValue => {
                            return  {...prevValue, email: e.target.value}
                        })
                    }
                        />

                    )}
                    {isEditing && <TextField
                        id="outlined-name"
                        value={userItemData.password}
                        placeholder="Password"
                        type="password"
                        onChange={(e) =>
                            setUserItemData( prevValue => {
                                return  {...prevValue, password: e.target.value}
                            })
                        }
                    />}
                    {
                        !isEditing ? (
                            <Checkbox checked={userItemData.isAdmin} className='admin'/>
                        ) : (
                            <Checkbox checked={userItemData.isAdmin} onChange={(e) => setUserItemData( prevValue => {
                                return  {...prevValue, isAdmin: e.target.checked}
                            })}/>

                    )}
                    {
                        !isEditing ? (
                            <span className="calorie alignment">{userItemData.dailyCalorieLimit}</span>
                        ) : (
                        <TextField
                        id="outlined-name"
                        value={userItemData.dailyCalorieLimit}
                        placeholder="Daily Calorie Limit"
                        type="number"
                        onChange={(e) =>
                        setUserItemData( prevValue => {
                            return  {...prevValue, dailyCalorieLimit: e.target.value}
                        })
                    }
                        />



                    )}
                    {
                        !isEditing ? (
                            <span className="budget alignment">{userItemData.monthlyBudget}</span>
                        ) : (
                        <TextField
                        id="outlined-name"
                        value={userItemData.monthlyBudget}
                        placeholder="Monthly Budget"
                        type="number"
                        onChange={(e) =>
                        setUserItemData( prevValue => {
                            return  {...prevValue, monthlyBudget: e.target.value}
                        })
                    }
                        />
                        )
                    }
                </div>

                {isEditing ? (
                    <i
    className={'fa fa-check edit-btn'}
    onClick={() => {
        if (isNew) {
            handleAdd();
        } else {
            handleUpdate(userItemData.id)
        }
    }}
    />
                ) : (
                    <i
    className={'fa fa-edit edit-btn'}
    onClick={() => setIsEditing(!isEditing)}
    />
                )}

                {isEditing ? (
                    <i
    className={'fa fa-close  dlt-btn'}
    onClick={() => {
        setIsEditing(!isEditing);
        change('new', false);
        setUserItemData(userItem);
    }}
    />
                ) : (
                    <i
    className={'fa fa-trash dlt-btn'}
    onClick={() => handleDelete(userItemData.id)}
    />
                )}
            </div>
        </StyledComponent>
    );
}



const StyledComponent = styled.div`
  .user-card {
    display: flex;
    width: 100%;
    padding: 0 8px;
    margin: 1% 2%;
    justify-content: flex-start;
    align-items: center;
    height: 6rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  .user-details {
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
  }

  .date-picker {
    height: 40px;
    border-radius: 4px;
    border: 1px solid rgba(34, 36, 38, 0.15);
  }

  button {
    border-radius: 0.375rem;
    height: 1.5rem;
    width: auto;
    outline: transparent solid 2px;
    outline-offset: 2px;
    border: none;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 3px 8px;
  }

  .edit-btn {
    margin-left: auto;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .dlt-btn {
    margin-left: 2%;
    margin-right: 2%;
    font-size: 1.5rem;
    color: red;
    cursor: pointer;
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
