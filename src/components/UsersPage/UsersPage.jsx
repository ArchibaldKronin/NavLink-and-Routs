import React, { Component } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import { ErrorModalWindow } from "../ErrorModalWindow/ErrorModalWindow";

const LIMIT = 5;

export class UsersPage extends React.Component {
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

    }

    componentDidUpdate() {

    }

    handleNextButtonClick() {
        
    }

    render() {

        return (
            <>

            </>
        )
    }
}