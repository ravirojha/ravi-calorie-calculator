import ReportService from './reports-service';

export default class ReportsApi {
  static getReports = () => {
    return ReportService.fetchReports();
  };
}
