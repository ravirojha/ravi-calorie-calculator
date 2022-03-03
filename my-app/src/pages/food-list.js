import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import FoodCard from '../components/molecules/food-card';
import NoItemsFound from "../components/atoms/no-items-found";
import { Loader, Pagination } from 'semantic-ui-react';
import Header from '../components/molecules/Header';
import TableHeader from '../components/atoms/table-header';
import FoodService from "../api-services/food-service";
import {token} from "../api-services/user-service";
import * as moment from 'moment';
import {AuthContext} from "../App";
import {toast} from "react-toastify";

function FoodList() {
  const [page, setPage] = useState('1');
    const [pageCount, setPageCount] = useState('10');
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [bit, setBit] = useState(false);
  const {user} = useContext(AuthContext);
  const [foodData, setFoodData] = useState(null);


  function change(updateParam, value) {
      if(updateParam === 'new') {
          setIsNew(value);
      } else if (updateParam === 'from') {
          setFromDate(value);
      } else if (updateParam === 'to') {
          setToDate(value);
      } else if(updateParam === 'page') {
          setPage(value);
      } else if(updateParam === 'pageCount') {
          setPageCount(value);
      }
  }


  useEffect(() => {
    const startDate = fromDate ? moment(fromDate).format('YYYY-MM-DD[T]hh:mm:ss') : null;
    const endDate = toDate ? moment(toDate).format('YYYY-MM-DD[T]hh:mm:ss') : null;

    FoodService.fetchFoods({ page, startDate, endDate }, user)
      .then((res) => {
          setPageCount(res?.data.pageCount)
          setFoodData(res?.data.foodData);
          if (page > res?.data.pageCount){

              setPage(res?.data.pageCount);
          }
         setIsLoading(false)
      })
      .catch((error) => toast.error(error.response.data.message));

  }, [ page, bit]);

  const reload = () => {
    setIsLoading(true);
    setBit(!bit);
  }

  return (
          isLoading ? <Loader active/> :
              <StyledComponent>
                  <div className="food-page">
                      <Header isNew={isNew} fromDate={fromDate} change={change}
                              toDate={toDate} reload={reload} page={page}/>

                      {isNew ? <FoodCard foodItem={{datetime:'',name:'',calorie:'',price:''}} isNew={isNew} change={change} reload={reload}/> : <></>}
                      <TableHeader/>
                      <div className="food-list">
                          {foodData.length > 0 ? (foodData?.map((food) => (
                              <FoodCard key={food.id} foodItem={food} reload={reload} change={change}/>
                          ))) : <NoItemsFound /> }
                      </div>
                      {!isLoading ? (
                          <div className="pagination">
                              <Pagination
                                  boundaryRange={0}
                                  defaultActivePage={page}
                                  ellipsisItem={null}
                                  firstItem={null}
                                  lastItem={null}
                                  siblingRange={1}
                                  totalPages={pageCount || 0}
                                  onPageChange={(event, data) => {
                                      setPage(data.activePage);
                                      reload();
                                  }}
                              />
                          </div>
                      ) : null}
                  </div>
              </StyledComponent>

  );
}

export default FoodList;

const StyledComponent = styled.div`
  .food-page {
    display: flex;
    flex-direction: column;
    width: 95%;
    padding-top: 6rem;
  }
  .food-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .header {
    display: flex;
    align-items: center;
  }

  .filter {
    margin-left: 20px;
    height: 2.2rem;
    width: 12rem;
    font-size: 1.2rem;
  }
`;
