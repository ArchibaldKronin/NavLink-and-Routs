import React, { Component } from "react";
import { HTTP_STATUS } from '../../constants/constants';
import axios from 'axios';

export function withFetch(WrappedComponent, url, getStatusFn) {
    return class WithFetch extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null,
                status: HTTP_STATUS.IDLE,
                error: null,
                currentPage: this.props.currentPage,
            };
        }

        componentDidMount() {
            getStatusFn(this.state);

            const loadData = async () => {
                this.setState({ status: HTTP_STATUS.PENDING })
                try {
                    // throw new Error("Super unexpected Error. Literally nobody expected");
                    const { data } = await axios.get(url);

                    this.setState({ data, status: HTTP_STATUS.FULFILLED });
                }
                catch (err) { this.setState({ error: err.message, status: HTTP_STATUS.REJECTED }) };
            };

            loadData();
        }

        componentDidUpdate(_, prevState) {
            if (prevState.status !== this.state.status) {
                getStatusFn(this.state);
            }

            if (prevState.currentPage != this.state.currentPage) {
                const loadData = async () => {
                    this.setState({ data: null, status: HTTP_STATUS.PENDING })
                    try {
                        // throw new Error("Super unexpected Error. Literally nobody expected");
                        const { data } = await axios.get(url);

                        this.setState({ data, status: HTTP_STATUS.FULFILLED });
                    }
                    catch (err) { this.setState({ error: err.message, status: HTTP_STATUS.REJECTED }) };
                }

                loadData();
            }
        }

        render() {
            const { currentPage, ...restProps } = this.props;

            return (
                <WrappedComponent state={this.state} {...restProps} />
            )
        }
    }
}