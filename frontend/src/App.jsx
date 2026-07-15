import React from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Manager from './pages/Manager/Manager';
import User from './pages/User/User';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={
            <ProtectedRoute>
                <Admin />
            </ProtectedRoute> } 
          />
          <Route path='/manager' element={
            <ProtectedRoute>
                <Manager />
            </ProtectedRoute> } 
          />
          <Route path='/user' element={<User />} />
        </Routes>
    </>
  )
}

export default App