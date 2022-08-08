import React, { Component } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import { ErrorModalWindow } from "../ErrorModalWindow/ErrorModalWindow";
import styles from './UserInfo.module.css';

export class UserInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            error: null,
            status: HTTP_STATUS.IDLE,
        }

        this.userId = this.getId(document.location.pathname);
    }

    getId = (str) => str.slice(str.lastIndexOf('/') + 1);

    componentDidMount() {
        this.setState({ status: HTTP_STATUS.PENDING });

        fetch(`https://jsonplaceholder.typicode.com/users?id=${this.userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки');
                }
                return response.json();
            })
            .then(data => { this.setState({ data : data[0], status: HTTP_STATUS.FULFILLED, }) })
            .catch(err => this.setState({ error: err.message, status: HTTP_STATUS.REJECTED, }));
            
    }

    render() {

        return (
            <>
                {this.state.data && <div>
                    <p>{`ID пользователя: ${this.state.data.id}`}</p>
                    <p>{`Имя пользователя: ${this.state.data.name}`}</p>
                    <p>{`Ник: ${this.state.data.username}`}</p>
                    <p>{`Город: ${this.state.data.address.city}`}</p>
                    <p>{`Телефон: ${this.state.data.phone}`}</p>
                </div>}
            </>
        )
    }
}