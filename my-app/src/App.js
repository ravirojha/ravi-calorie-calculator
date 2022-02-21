import './App.css';
import NavBar from './components/molecules/nav-bar';
import FoodList from './pages/food-list';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Reports from './pages/reports';
import Toast from './components/atoms/Toast';
import React, {useEffect, useState} from 'react';
import toast from "./components/atoms/Toast";
import UserService from "./api-services/user-service";
import NotFound from "./pages/PermissionDenied";
import ProtectedRoute from "./components/molecules/ProtectedRoute";
import {useCookies} from "react-cookie";

export const AuthContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  const [cookie, setCookie] = useCookies(['user']);

  useEffect(() => {
      if (!user) {
          if(cookie.user) {
              setUser(cookie.user);
          }
      }
    UserService.fetchLoggedInUserDetails()
        .then(res => {
          setUser(res.data);
          setCookie('user', res.data);
        })
        .catch((error) => toast.error(error.response.data.message))
  },[]);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <div className="App">
        <Toast />
        <Router>
          <NavBar />
          <Routes>
            {user && <Route path={'/'} element={<FoodList />} />}
            <Route
                path={'/reports'}
                element={
                    <ProtectedRoute element={<Reports />} />
                }
            />
            <Route path={'/not-found'} element={<NotFound />}/>
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
