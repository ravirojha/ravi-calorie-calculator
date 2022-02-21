import * as faker from 'faker';
import { Util } from '../utils';
import Axios from "axios";
export default class FoodService {
    static createFood = async ({ datetime, name, calorie, price, userEmail }, token) => {
        return Axios.post('http://localhost:3000/food',{datetime, name, calorie, price, userEmail },{
            headers: {
                jwt: token
            }
        })
    }


  static fetchFoods = async ( {page = '1',startDate, endDate }, token) => {
    return  Axios.get(`http://localhost:3000/food`,
    {
      headers: {
        jwt: token
      },
        params: {
          startDate,
            endDate,
            page
        }
    });
  };


    static updateFood = async(id,{
        datetime,
        name,
        calorie,
        price,}, token) => {
        return Axios.put(`http://localhost:3000/food/${id}`, {datetime, name, calorie, price},
            {
                headers: {
                    jwt: token
                }
            }
        )
    }

    static deleteFood = async(id, token) => {
        return Axios.delete(`http://localhost:3000/food/${id}`,
            {
                headers: {
                    jwt: token
                }
            }
        )
    }
}
