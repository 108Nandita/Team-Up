import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/signin/SignIn';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import CompanyProfile from './pages/company-profile/CompanyProfile';
import Create from './pages/create/Create';
import CreateCompany from './pages/create-company/CreateCompany';
import CreateEvent from './pages/create-event/CreateEvent';
import SearchResult from './pages/search-result/SearchResult';
import Profile from './pages/profile/Profile';
import './App.css';
import { AuthContext } from "./context/AuthContext";

function App() {
  const {isAuth} = useContext(AuthContext);

  return (
      <>
        <div className="content">
          <Routes>
              <Route path="/" element={<SignIn/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/home" element={isAuth ? <Home/> : <Navigate to="/"/>}/>
              <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
              <Route path="/create" element={isAuth ? <Create/> : <Navigate to="/"/>}/>
              <Route path="/company-profile" element={isAuth ? <CompanyProfile/> : <Navigate to="/"/>}/>
              <Route path="/create-company" element={isAuth ? <CreateCompany/> : <Navigate to="/"/>}/>
              <Route path="/create-event" element={isAuth ? <CreateEvent/> : <Navigate to="/"/>}/>
              <Route path="/search-result" element={isAuth ? <SearchResult/> : <Navigate to="/"/>}/>
          </Routes>
        </div>
      </>
  );
}

export default App;
