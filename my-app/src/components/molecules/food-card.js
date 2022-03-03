import React, { useContext, useState } from 'react';
import { Input } from 'semantic-ui-react';
import moment from 'moment';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { AuthContext } from '../../App';
import FoodService from "../../api-services/food-service";

export default function FoodCard({ foodItem, isNew, change, reload }) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [foodItemData, setFoodItemData] = useState(foodItem);
  const {user, setUser} = useContext(AuthContext);


    const validateData = () => {
        if (!foodItemData.datetime) toast.error("Datetime is Required");
        else if (foodItemData.name.trim().length < 1)
            toast.error("Valid foodname of atleast 1 char is required");
        else if (!foodItemData.calorie || foodItemData.calorie < 1) toast.error("Provide a valid calorie value");
        else if (foodItemData.calorie > 5000) toast.error("Calorie should be less than 5000");
        else if (!foodItemData.price || foodItemData.price < 1) toast.error("Provide a valid price");
        else if (foodItemData.price > 1000) toast.error(("Price should be less than 1000"));
        else return true;
    };



  function handleDelete(id) {
      FoodService.deleteFood(id, user).then((res) => {
        toast.success('Deleted Successfully!');
        reload();
      }).catch((e) => {
          let error = e.response.data.message;
          toast.error(error);
      })
  }



  function handleUpdate(id) {
      if(validateData()) {
          FoodService.updateFood(id, {...foodItemData}, user).then(res => {
              res.data.budgetReached && toast.warning(`${!user.isAdmin ? 'You have ' : 'User has '} reached  monthly Budget limit`, {
                  position: toast.POSITION.TOP_RIGHT
              });
              res.data.calorieReached && toast.warning(`${!user.isAdmin ? 'You have ' : 'User has '} reached  daily calorie limit`, {
                  position: toast.POSITION.TOP_RIGHT
              });
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
          FoodService.createFood({...foodItemData}, user).then(res => {
              change('new', !isNew);
              toast.success("Food Item Added");
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
      <div className="food-card">
        <div className="food-details">
          {!isEditing ? (
            <span className="date alignment">
              {moment(foodItemData.datetime).format('MMM D YYYY, h:mm a')}
            </span>
          ) : (
            <DatePicker
                placeholderText = "Date-Time"
                autoComplete='off'
              className="date-picker"
              popperPlacement="bottom"
              showTimeSelect
              dateFormat="MMM d, yyyy h:mm aa"
              id="date"
              endDate={new Date()}
              selected={foodItemData.datetime ? moment(foodItemData.datetime).toDate() : ''}
              onChange={(value) => {
                setFoodItemData({ ...foodItemData, datetime: value });
              }}
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
                required
            />
          )}
          {user?.isAdmin ? (
            !isEditing ? (
              <span className="email alignment"> {foodItemData.userEmail}</span>
            ) : (
              <Input
                  disabled={!isNew}
                value={foodItemData.userEmail}
                placeholder="User email"
                  type="email"
                onChange={(e) =>
                  setFoodItemData( prevValue => {
                      return  {...prevValue, userEmail: e.target.value}
                  })
                }
              />
            )
          ) : null}
          {!isEditing ? (
            <span className="name alignment"> {foodItemData.name}</span>
          ) : (
            <Input
              value={foodItemData.name}
              placeholder="Name of food item"
              type="string"
              minLength="4"
              required
              onChange={(e) =>
                setFoodItemData({ ...foodItemData, name: e.target.value })
              }
            />
          )}
          {!isEditing ? (
            <span className="calorie alignment">
              {' '}
              {foodItemData.calorie}
              { foodItemData.dailyCalorieSum > foodItemData.dailyCalorieLimit &&
                  < i className = "fa fa-warning" style={{color: 'red'}} title="Daily Calorie Limit Exceeded"></i>
                }
            </span>
          ) : (
            <Input
              value={foodItemData.calorie}
              placeholder="Calories"
              type="number"
              min="1"
              max="5000"
              required
              onChange={(e) =>
                setFoodItemData({ ...foodItemData, calorie: e.target.value })
              }
            />
          )}
          {!isEditing ? (
            <span className="price alignment">
              {' '}
              {foodItemData.price}
              {foodItemData.monthlyBudgetSum > foodItemData.monthlyBudget  &&
                <i className="fa fa-warning" style={{ color: 'red' }} title="Monthly Budget Limit Exceeded"></i>
              }
            </span>
          ) : (
            <Input
              placeholder="Price"
              value={foodItemData.price}
              type="number"
              min="1"
              max="1000"
              required
              onChange={(e) =>
                setFoodItemData({ ...foodItemData, price: e.target.value })
              }
            />
          )}
        </div>

        {isEditing ? (
          <i
            className={'fa fa-check edit-btn'}
            onClick={() => {
                if(isNew) {
                    handleAdd();
                } else {
                    handleUpdate(foodItemData.id)
                }
            }}
          ></i>
        ) : (
          <i
            className={'fa fa-edit edit-btn'}
            onClick={() => setIsEditing(!isEditing)}
          ></i>
        )}

        {isEditing ? (
          <i
            className={'fa fa-close  dlt-btn'}
            onClick={() => {
                setIsEditing(!isEditing);
                change('new', false);
                setFoodItemData(foodItem);
            }}
          ></i>
        ) : (
          <i
            className={'fa fa-trash dlt-btn'}
            onClick={() => handleDelete(foodItemData.id)}
          ></i>
        )}
      </div>
    </StyledComponent>
  );
}



const StyledComponent = styled.div`
  .food-card {
    display: flex;
    width: 100%;
    margin: 1% 2%;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    height: 4rem;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  .food-details {
    display: flex;
    width: 80%;
    justify-content: space-between;
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


  .date{
    flex: 0.25;
    min-width: 60px;
    max-height: 90px;
  }

  .email{
    flex: .4;
  }

  .name{
    flex: 0.2;
  }
  .calorie{
    flex: 0.2;
  }
  .price{
    flex: 0.2;
  }

  .alignment {
    text-align: left;
    padding-left: 5%;
  }
`;
