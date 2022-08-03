import React, { Component } from 'react';
import { PostsPage } from './components/PostsPage/PostsPage'
import { UsersPage } from './components/UsersPage/UsersPage'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='appDiv'>
        <header className='headerClass'>
          <nav className='navClass'>
            <ul>
              <li>
                <NavLink className={(navData) => navData.isActive ? "active link" : "link"} to='/posts'>Posts</NavLink >
              </li>
              <li>
                <NavLink className={(navData) => navData.isActive ? "active link" : "link"} to='/users'>Users</NavLink >
              </li>
            </ul>
          </nav>
        </header>
        <main className='mainClass'>
          <Routes>
            <Route path='/posts' element={<PostsPage />} />
            <Route path='/users' element={<UsersPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
