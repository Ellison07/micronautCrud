import React from 'react';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Employee from './components/employee/Employee';
import User from './components/user/User';
import UpdateUser from './components/user/UpdateUser';
import AddUser from './components/user/AddUser';

import Home from './components/home/Home';
function App() {
  return (
    <>
    
    <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/user/:id' element={<User />} />
    <Route path='/UpdateUser/:id' element={<UpdateUser/>} />
    <Route path='/add' element={<AddUser/>} />
    <Route path='/employee' element={<Employee/>}/>
  </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
