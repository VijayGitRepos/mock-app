import React from 'react'
import { BrowserRouter,Routes, Route } from "react-router";
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import Manager from './pages/Manager/Manager';
import User from './pages/User/User';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/manager' element={<Manager />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App