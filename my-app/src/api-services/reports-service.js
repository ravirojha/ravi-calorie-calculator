import { Util } from '../utils';
import Axios from "axios";
export default class ReportService {
  static fetchReports = async (token) => {
    return  Axios.get(`http://localhost:3000/food/report`
        ,{
          headers: {
            jwt: token
          }
        });
  };
}
