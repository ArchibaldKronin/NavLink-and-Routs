import React from "react";
import { AlbumsPage } from "./AlbumsPage";
import { HTTP_STATUS } from '../../constants/constants';
import { Container } from '../Container/Container'
import { ALBUMS_TOTAL_COUNT, ALBUMS_LIMIT } from "../../constants/constants";
import { NavigationButtons } from "../NavigationButtons/NavigationButtons"
import { withFetch } from "../withFetch/withFetch";

export class AlbumsPageWhithFetch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            status: HTTP_STATUS.IDLE,
            WrappedAlbumsPage: withFetch(AlbumsPage, `https://jsonplaceholder.typicode.com/albums?_limit=${ALBUMS_LIMIT}&_page=${1}`, this.getCurrentStatus),
        };

        this.PAGES_AMOUNT = ALBUMS_TOTAL_COUNT / ALBUMS_LIMIT;
    }
    getCurrentStatus = (state) => { this.setState({ status: state.status }) };

    setCurrentPage = (newPage) => {
        this.setState({ currentPage: newPage })
        console.log(this.state.currentPage)
    };

    componentDidMount() {
        const WrappedAlbumsPage = withFetch(AlbumsPage, `https://jsonplaceholder.typicode.com/albums?_limit=${ALBUMS_LIMIT}&_page=${this.state.currentPage}`, this.getCurrentStatus);
        this.setState({ WrappedAlbumsPage });

    }

    componentDidUpdate(_, prevState) {
        if (prevState.currentPage !== this.state.currentPage) {
            const WrappedAlbumsPage = withFetch(AlbumsPage, `https://jsonplaceholder.typicode.com/albums?_limit=${ALBUMS_LIMIT}&_page=${this.state.currentPage}`, this.getCurrentStatus);
            this.setState({ WrappedAlbumsPage });
        }
    }

    render() {
        const navigationProps = {
            currentPage: this.state.currentPage,
            setCurrentPage: this.setCurrentPage,
            status: this.state.status,
            pagesAmount: this.PAGES_AMOUNT,
        }

        return (
            <>
                <Container>
                    <this.state.WrappedAlbumsPage currentPage={this.state.currentPage} />
                </Container>
                <NavigationButtons settings={navigationProps} />
            </>
        )
    }
}