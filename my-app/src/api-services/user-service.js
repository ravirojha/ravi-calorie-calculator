import { Util, URL } from '../utils';
import axios from "axios";
// const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0OTI5Nzc5LCJleHAiOjE2NTM1Njk3Nzl9.FEYY3-2cGuwvLAyewBjNwR-90vqYB0_SeNbQ2XHUkOU';
// const regularToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0OTI5ODQ3LCJleHAiOjE2NTM1Njk4NDd9.NxnLRV80HCeh5Px6uwFdWf5NKR7IJmuCyqxP5uK9ixA';
// export const token = adminToken;
export default class UserService {
  // static fetchLoggedInUserDetails = async () => {
  //   return axios.get(`${URL}/user/loggedin`, {
  //     headers: {
  //       jwt: token
  //     }
  //   });
  // }
  static getUsers = async ({page = 1}, { jwt }) => {
    return await axios.get(`${URL}/users`,
        {
          headers: {
            jwt
          },
          params: {
            page
          }
        });

  };

  static addUser = async ({name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget}, { jwt }) => {
    return await axios.post(`${URL}/users`, {
      name,
      email,
      password,
      isAdmin,
      dailyCalorieLimit,
      monthlyBudget
    }, {
      headers: {
        jwt
      }
    })
  };

  static updateUser = async (id, {name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget}, { jwt }) => {
    return await axios.put(`${URL}/users/${id}`, {
      name,
      email,
      password,
      isAdmin,
      dailyCalorieLimit,
      monthlyBudget
    }, {
      headers: {
        jwt
      }
    })
  };

  static deleteUser = async (id, { jwt }) => {
    return await axios.delete(`${URL}/users/${id}`, {
      headers: {
        jwt
      }
    })
  };
};

