import React, { Component } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import { ErrorModalWindow } from "../ErrorModalWindow/ErrorModalWindow";
import styles from './UsersPage.module.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


export class UsersPage extends React.Component {
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
        })

        fetch(`https://jsonplaceholder.typicode.com/users?_limit=${this.limit}&_page=${this.state.currentPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки');
                }
                return response.json();
            })
            .then(data => this.setState({ data, status: HTTP_STATUS.FULFILLED, }))
            .catch(err => this.setState({ error: err.message, status: HTTP_STATUS.REJECTED, }));
    }

    componentDidUpdate(_, prevState) {
        if (prevState.currentPage != this.state.currentPage) {
            this.setState({
                data: null,
                status: HTTP_STATUS.PENDING,
            })
            // https://jsonplaceholder.typicode.com/users?_limit=${this.limit}&_page=${this.state.currentPage}
            fetch(`https://243gr5evrsdc`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Ошибка загрузки');
                    }
                    return response.json();
                })
                .then(data => this.setState({ data, status: HTTP_STATUS.FULFILLED }))
                .catch(err => this.setState({ error: err.message, status: HTTP_STATUS.REJECTED }));
        }
    }

    render() {

        return (
            <>
                <div className={styles.usersContainer}>
                    {this.state.data && this.state.data.map((user) => <div key={user.id} className={styles.userItemContainer}>
                        <h3>{user.name}</h3>
                        <p>{user.username}</p>
                    </div>)}

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
                    <button onClick={() => this.handleNextButtonClick(2)} disabled={this.state.currentPage === 2 || this.state.status === HTTP_STATUS.PENDING}><FaArrowRight color="white" /></button>
                </div>
            </>
        )
    }
}