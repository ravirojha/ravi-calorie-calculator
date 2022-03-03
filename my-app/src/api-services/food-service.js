import { Util, URL } from '../utils';
import Axios from "axios";
export default class FoodService {
    static createFood = async ({ datetime, name, calorie, price, userEmail }, {jwt}) => {
        return Axios.post(`${URL}/food`,{datetime, name, calorie, price, userEmail },{
            headers: {
                jwt
            }
        })
    }


  static fetchFoods = async ( {page = '1',startDate, endDate }, {jwt}) => {
    return  Axios.get(`${URL}/food`,
    {
      headers: {
        jwt
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
        price,}, {jwt}) => {
        return Axios.put(`${URL}/food/${id}`, {datetime, name, calorie, price},
            {
                headers: {
                    jwt
                }
            }
        )
    }

    static deleteFood = async(id, {jwt}) => {
        return Axios.delete(`${URL}/food/${id}`,
            {
                headers: {
                    jwt
                }
            }
        )
    }
}
