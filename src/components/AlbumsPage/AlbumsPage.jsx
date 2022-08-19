import React, { Component } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import { Container } from '../Container/Container';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { ItemContainer } from '../ItemContainer/ItemContainer';
import { Loader } from '../Loader/Loader';

export class AlbumsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, status, error } = this.props.state;

        return (
            <>
                {data && data.map(album =>
                    <ItemContainer key={album.id}>
                        <h4>{album.title}</h4>
                    </ItemContainer>)}

                {status === HTTP_STATUS.PENDING && <Loader />}

                {status === HTTP_STATUS.REJECTED && <ErrorPage errorMessage={error} />}
            </>
        )
    }
}