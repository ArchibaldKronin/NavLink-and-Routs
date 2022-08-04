import React, { Component } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import styles from './PostsPage.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ErrorModalWindow } from "../ErrorModalWindow/ErrorModalWindow";

const LIMIT = 10;

export class PostsPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null,
            error: null,
            status: HTTP_STATUS.IDLE,
            currentPage: 0,
        }
    }

    componentDidMount() {
        this.setState({
            status: HTTP_STATUS.PENDING,
        });

        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${this.state.currentPage}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки');
                }
                return response.json()
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
            //https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${this.state.currentPage}
            fetch(`http://hdowh2v28e7eb2b`)
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

    handleNextButtonClick = () => {
        if (this.state.currentPage === 9)
            return;

        this.setState({ currentPage: this.state.currentPage + 1 })
    }

    handlePrevButtonClick = () => {
        if (this.state.currentPage === 0)
            return;

        this.setState({ currentPage: this.state.currentPage - 1 })
    }

    handlerClickCloseButton = () => {
        
        this.setState({
            error: null,
            status: HTTP_STATUS.IDLE,
        })
    }

    render() {

        return (
            <>
                <div className={styles.postsContainer}>
                    {this.state.data && this.state.data.map((post) => <div key={post.id} className={styles.postItemContainer}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </div>)}

                    {this.state.status === HTTP_STATUS.PENDING && <div className={styles.loaderContainer}>
                        <label>
                            Загрузка...
                        </label>
                        <div className={styles.loader}></div>
                    </div>}

                    {this.state.status === HTTP_STATUS.REJECTED && <div>
                        <ErrorModalWindow error={this.state.error} onClick={this.handlerClickCloseButton}></ErrorModalWindow>
                    </div>}
                </div>
                <div className={styles.buttonsContainer}>
                    <button onClick={this.handlePrevButtonClick} disabled={!this.state.currentPage || this.state.status === HTTP_STATUS.PENDING}><FaArrowLeft color="white" /></button>
                    <button onClick={this.handleNextButtonClick} disabled={this.state.currentPage === 9 || this.state.status === HTTP_STATUS.PENDING}><FaArrowRight color="white" /></button>
                </div>
            </>
        )
    }
}