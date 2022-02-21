import { Util } from '../utils';
import Axios from "axios";
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ0OTI5Nzc5LCJleHAiOjE2NTM1Njk3Nzl9.FEYY3-2cGuwvLAyewBjNwR-90vqYB0_SeNbQ2XHUkOU';
const regularToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0OTI5ODQ3LCJleHAiOjE2NTM1Njk4NDd9.NxnLRV80HCeh5Px6uwFdWf5NKR7IJmuCyqxP5uK9ixA';
export const token = regularToken;
const UserService = {
  fetchLoggedInUserDetails: async () => {
    return  Axios.get(`http://localhost:3000/user/loggedin`, {
      headers:{
        jwt: token
      }
    });
  }
};

export default UserService;
