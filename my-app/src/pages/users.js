import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import NoItemsFound from "../components/atoms/no-items-found";
import { Loader, Pagination } from 'semantic-ui-react';
import Header from '../components/molecules/Header';
import * as moment from 'moment';
import {AuthContext} from "../App";
import {toast} from "react-toastify";
import UserService from "../api-services/user-service";
import UserCard from "../components/molecules/user-card";
import UserTableHeader from "../components/atoms/user-table-header";

function Users() {
    const [page, setPage] = useState('1');
    const [pageCount, setPageCount] = useState('10');
    const [isNew, setIsNew] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [bit, setBit] = useState(false);
    const {user} = useContext(AuthContext);
    const [userData, setUserData] = useState(null);


    function change(updateParam, value) {
        if(updateParam === 'new') {
            setIsNew(value);
        }  else if(updateParam === 'page') {
            setPage(value);
        } else if(updateParam === 'pageCount') {
            setPageCount(value);
        }
    }


    useEffect(() => {
        UserService.getUsers({ page }, user)
            .then((res) => {
                setPageCount(res?.data.pageCount)
                setUserData(res?.data.users);
                if (page > res?.data.pageCount){

                    setPage(res?.data.pageCount);
                }
                setIsLoading(false)
            })
            .catch((error) => toast.error(error.response.data.message));

    }, [ page, bit, user]);

    const reload = () => {
        setIsLoading(true);
        setBit(!bit);
    }

    return (
        isLoading ? <Loader active/> :
            <StyledComponent>
                <button className='add-user' onClick={() => change('new', !isNew)}>
                    <i className="fa fa-plus add-btn"/><span >Add User</span>
                </button>
                <div className="user-page">
                    {isNew ? <UserCard userItem={{name: '', email: '', isAdmin: false, dailyCalorieLimit: '', monthlyBudget: ''}} isNew={isNew} change={change} reload={reload}/> : <></>}
                    <UserTableHeader/>
                    <div className="user-list">
                        {userData.length > 0 ? (userData?.map((singleUser) => (
                            <UserCard key={singleUser.id} userItem={singleUser} reload={reload} change={change}/>
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

export default Users;

const StyledComponent = styled.div`
  .user-page {
    display: flex;
    flex-direction: column;
    width: 95%;
    padding-top: 6rem;
  }
  .user-list {
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

  .add-user {
  position: absolute;
  z-index: 99;
  width: 100px;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  background-color: #db2828;
  height: 2.5rem;
  border-radius: 5px;
  font-weight: 600;
  right: 10rem;
  top: 3%;
  }
  
  .add-user > span {
  padding-left: 8px;
  }
`;
