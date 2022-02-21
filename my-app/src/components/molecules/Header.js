import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import moment from 'moment';

function Header({ isNew, fromDate, toDate, reload, change }) {
    const [startDate, setStartDate] = useState(fromDate);
    const [endDate, setEndDate] = useState(toDate);

  return (
    <StyledComponent>
      <div className="header">
        <i className="fa fa-plus add-btn" onClick={() => change('new',!isNew)}></i>

          <div className='date-picker'>
              <DatePicker
                  className = 'filter'
                  selected={startDate}
                  dateFormat="dd/MM/yyy"
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={new Date() && endDate}
                  showYearDropdown
                  showMonthDropdown
              />
              <DatePicker
                  className = 'filter'
                  selected={endDate}
                  dateFormat="dd/MM/yyy"
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  maxDate={new Date()}
                  showYearDropdown
                  showMonthDropdown
              />
          </div>
        <button className="filter-btn" onClick={() => {
            change('from',startDate);
            change('to',endDate);
            change('page', '1')
            reload();
        }}>Filter</button>
          <button className="filter-btn" onClick={() => {
              change('from',null);
              change('to',null);
              setStartDate(null);
              setEndDate(null);
              reload();
          }}>Clear</button>
      </div>
    </StyledComponent>
  );
}

export default Header;

const StyledComponent = styled.div`
  .header {
    width: 100%;
    margin-left: 2%;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
  .filter-btn {
    margin-left: 10px;
    height: 2rem;
    width: 3rem;
    border-radius: 15%;
    background: #3182ce;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .add-btn {
    align-self: flex-start;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 40px;
    height: 35px;
    font-weight: 600;
    border-radius: 15%;
    background: #3182ce;
    color: #fff;
    margin: 2% 2%;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
      rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  }
  
  .date-picker {
    display: flex;
  }
`;
