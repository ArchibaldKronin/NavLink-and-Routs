import React, { Component } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import styles from './PostsPage.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ErrorModalWindow } from "../ErrorModalWindow/ErrorModalWindow";
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom';


export class PostsPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            error: null,
            status: HTTP_STATUS.IDLE,
            currentPage: 1,
        }

        this.limit = this.props.limit;

        this.handleNextButtonClick = this.props.nextClick.bind(this);
        this.handlePrevButtonClick = this.props.prevClick.bind(this);
        this.handlerClickErrorCloseButton = this.props.errorClose.bind(this);
    }

    componentDidMount() {
        this.setState({
            status: HTTP_STATUS.PENDING,
        });

        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.state.currentPage}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки');
                }
                return response.json();
            })
            .then(data => { this.setState({ data, status: HTTP_STATUS.FULFILLED }) })
            .catch(err => this.setState({ error: err.message, status: HTTP_STATUS.REJECTED }));
    }

    componentDidUpdate(_, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            this.setState({
                data: null,
                status: HTTP_STATUS.PENDING,
            });
            //https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.state.currentPage}
            fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.state.currentPage}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Ошибка загрузки');
                    }
                    return response.json()
                })
                .then(data => { this.setState({ data, status: HTTP_STATUS.FULFILLED }) })
                .catch(err => this.setState({ error: err.message, status: HTTP_STATUS.REJECTED }));
        }
    }

    createRoates = () => {
        debugger
        const routes = this.state.data.map((post) =>
            <Route key={`${post.id}`} path={`/posts/${post.userId}`} element={
                <div className='superDiv'>
                    {`ГОВНИЩЕ${post.userId}`}
                </div>
            } />
        );

        return (
            <Routes>
                {routes}
            </Routes>
        )
    }



    render() {

        return (
            <div>
                <div className={styles.postsContainer}>
                    {this.state.data && this.state.data.map((post) =>
                        <div className={styles.postItemContainer} key={post.id}>
                            <NavLink to={`/posts/${post.userId}`} className={(navData) => navData.isActive ? `${styles.active} ${styles.link}` : `${styles.link}`}  >
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </NavLink>
                        </div>
                    )}

                    {this.state.data && this.createRoates()}



                    {this.state.status === HTTP_STATUS.PENDING && <div className={styles.loaderContainer}>
                        <label>
                            Загрузка...
                        </label>
                        <div className={styles.loader}></div>
                    </div>}

                    {this.state.status === HTTP_STATUS.REJECTED && <div>
                        <ErrorModalWindow error={this.state.error} onClick={this.handlerClickErrorCloseButton}></ErrorModalWindow>
                    </div>}

                </div>

                <div className={styles.buttonsContainer}>
                    <button onClick={this.handlePrevButtonClick} disabled={this.state.currentPage === 1 || this.state.status === HTTP_STATUS.PENDING}><FaArrowLeft color="white" /></button>
                    <button onClick={() => this.handleNextButtonClick(10)} disabled={this.state.currentPage === 10 || this.state.status === HTTP_STATUS.PENDING}><FaArrowRight color="white" /></button>
                </div>
            </div>
        )
    }
}