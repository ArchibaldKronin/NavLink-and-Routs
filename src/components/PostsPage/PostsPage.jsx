import React, { Component } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import styles from './PostsPage.module.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ErrorModalWindow } from "../ErrorModalWindow/ErrorModalWindow";
import { NavLink } from 'react-router-dom';
import { Container } from '../Container/Container';
import { ItemContainer } from '../ItemContainer/ItemContainer';
import { Loader } from '../Loader/Loader';


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

    render() {

        return (
            <div>
                <Container>
                    {this.state.data && this.state.data.map((post) =>
                        <ItemContainer key={post.id}>
                            <NavLink to={`/posts/${post.userId}`} className={(navData) => navData.isActive ? `${styles.active} ${styles.link}` : `${styles.link}`}  >
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </NavLink>
                        </ItemContainer>
                    )}

                    {this.state.status === HTTP_STATUS.PENDING && <Loader />}

                    {this.state.status === HTTP_STATUS.REJECTED && <div>
                        <ErrorModalWindow error={this.state.error} onClick={this.handlerClickErrorCloseButton}></ErrorModalWindow>
                    </div>}
                </Container>

                <div className={styles.buttonsContainer}>
                    <button onClick={this.handlePrevButtonClick} disabled={this.state.currentPage === 1 || this.state.status === HTTP_STATUS.PENDING}><FaArrowLeft color="white" /></button>
                    <button onClick={() => this.handleNextButtonClick(10)} disabled={this.state.currentPage === 10 || this.state.status === HTTP_STATUS.PENDING}><FaArrowRight color="white" /></button>
                </div>
            </div >
        )
    }
}