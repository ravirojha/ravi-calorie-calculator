import './App.css';
import NavBar from './components/molecules/nav-bar';
import FoodList from './pages/food-list';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Reports from './pages/reports';
import Toast from './components/atoms/Toast';
import React, {useEffect, useState} from 'react';
import toast from "./components/atoms/Toast";
import NotFound from "./pages/PermissionDenied";
import ProtectedRoute from "./components/molecules/ProtectedRoute";
import {useCookies} from "react-cookie";
import Login from "./pages/login";
import Users from "./pages/users";
import SignUp from "./pages/signup";
import User from "./pages/user";

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
    // UserService.fetchLoggedInUserDetails()
    //     .then(res => {
    //       setUser(res.data);
    //       setCookie('user', res.data);
    //     })
    //     .catch((error) => toast.error(error.response.data.message))
  },[cookie.user, user]);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <div className="App">
        <Toast />
        <Router>
            {user && <NavBar/>}
          <Routes>
              {!user &&
              <>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'/signup'} element={<SignUp/>}/>
              </>
              }
            {user &&
                <>
                    <Route path={'/'} element={<FoodList />} />
                    <Route
                     path={'/reports'}
                     element={<ProtectedRoute element={<Reports />} />}
                     />
                    <Route
                        path={'/users'}
                        element={<ProtectedRoute element={<Users />} />}
                    />
                    <Route path={'/user/:id'} element={<ProtectedRoute element={<User/>} />}/>
                </>
            }
            <Route path={'/'} element={<Login/>}/>
            <Route path={'/not-found'} element={<NotFound />}/>
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
