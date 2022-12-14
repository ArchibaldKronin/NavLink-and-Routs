import React, { Component } from 'react';
import { PostsPage } from './components/PostsPage/PostsPage';
import { UsersPage } from './components/UsersPage/UsersPage';
import { UploadPic } from "./components/UploadPic/UploadPic";
import { UserInfo } from "./components/UserInfo/UserInfo";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { HTTP_STATUS } from './constants/constants';
import { TodosPage } from './components/TodosPage/TodosPage';
import { CommentsPage } from './components/CommentsPage/CommentsPage';
import { AlbumsPageWhithFetch } from './components/AlbumsPage/AlbumsPageWhithFetch';
import { PhotosPage } from './components/PhotosPage/PhotosPage';


function App() {

  function handleNextButtonClick(pagesCount) {
    if (this.state.currentPage === pagesCount)
      return;
    this.setState({ currentPage: this.state.currentPage + 1 })
  }

  function handlePrevButtonClick() {
    if (this.state.currentPage === 1)
      return;

    this.setState({ currentPage: this.state.currentPage - 1 })
  }

  function handlerClickErrorCloseButton() {

    this.setState({
      error: null,
      status: HTTP_STATUS.IDLE,
    })
  }


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
              <li>
                <NavLink className={(navData) => navData.isActive ? "active link" : "link"} to='/todos'>ToDoList</NavLink >
              </li>
              <li>
                <NavLink className={(navData) => navData.isActive ? "active link" : "link"} to='/comments'>CommentsPage</NavLink >
              </li>
              <li>
                <NavLink className={(navData) => navData.isActive ? "active link" : "link"} to='/albums'>Albums</NavLink >
              </li>
              <li>
                <NavLink className={(navData) => navData.isActive ? "active link" : "link"} to='/photos'>Photos</NavLink >
              </li>
              <li>
                <NavLink className={(navData) => navData.isActive ? "active link" : "link"} to='/pics'>UploadPic</NavLink >
              </li>
            </ul>
          </nav>
        </header>
        <main className='mainClass'>
          <Routes>
            <Route path='/posts' element={<PostsPage nextClick={handleNextButtonClick}
              prevClick={handlePrevButtonClick}
              errorClose={handlerClickErrorCloseButton}
              limit={10} />} />
            <Route path='/users' element={<UsersPage nextClick={handleNextButtonClick}
              prevClick={handlePrevButtonClick}
              errorClose={handlerClickErrorCloseButton}
              limit={5} />} />
            <Route path='/todos' element={<TodosPage />} />
            <Route path='/comments' element={<CommentsPage />} />
            <Route path='/albums' element={<AlbumsPageWhithFetch />} />
            <Route path='/photos' element={<PhotosPage />} />
            <Route path='/pics' element={<UploadPic />} />
            <Route path='/posts/:id' element={<UserInfo />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter >
  );
}

export default App;
