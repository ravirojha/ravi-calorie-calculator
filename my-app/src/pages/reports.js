import React, {useContext, useEffect, useState} from 'react';
import { Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import ReportsApi from '../api-services/reports.api';
import ReportsCard from '../components/atoms/reports-card';
import ReportService from "../api-services/reports-service";
import {AuthContext} from "../App";

function Reports() {
  const [reports, setReports] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    ReportService.fetchReports(user).then((response) => {
      setReports(response.data);
      setIsLoading(false);
    });
  }, []);


  return (
    <>
      {isLoading ? (
        <Loader active />
      ) : (
        <StyledComponent>
          <div className="container">
            <div className="cards">
            <ReportsCard
              header={'Entries Added in Last 7 Days'}
              data={reports.foodLastWeek.length}
            />
            <ReportsCard
              header={'Entries Added in Previous Week'}
              data={reports.foodWeekBeforeThat.length}
            />
            <ReportsCard
              header={'Avg Calories Added in Last 7 Days'}
              data={reports.avgCalorie}
            />
          </div>
          </div>
        </StyledComponent>
      )}
    </>
  );
}

export default Reports;

const StyledComponent = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 6rem;
  }
  
  .cards {
  padding-bottom: 2rem;
  }
`;
