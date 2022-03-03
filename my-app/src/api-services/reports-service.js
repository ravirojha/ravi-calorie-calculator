import { Util, URL } from '../utils';
import Axios from "axios";
export default class ReportService {
  static fetchReports = async ({jwt}) => {
    return  Axios.get(`${URL}/food/report`
        ,{
          headers: {
            jwt
          }
        });
  };
}
