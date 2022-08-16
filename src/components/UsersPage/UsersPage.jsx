import React, { useState } from 'react'
import { USERS_TOTAL_COUNT, USERS_LIMIT } from '../../constants/constants';
import { Container } from '../Container/Container';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { Fetch } from '../Fetch/Fetch';
import { ItemContainer } from '../ItemContainer/ItemContainer';
import { Loader } from '../Loader/Loader';
import { NavigationButtons } from '../NavigationButtons/NavigationButtons';

export const UsersPage = (props) => {

    const PAGES_AMOUNT = USERS_TOTAL_COUNT / USERS_LIMIT;

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Fetch url={`https://jsonplaceholder.typicode.com/users?_limit=${USERS_LIMIT}&_page=${currentPage}`}
            loader={<Loader />} renderError={(errorText) => <ErrorPage errorMessage={errorText} />}>
            {({ data: users, status }) => {
                const navigationProps = {
                    currentPage,
                    setCurrentPage,
                    status,
                    pagesAmount: PAGES_AMOUNT,
                }

                return <>
                    <Container>
                        {users.map(user =>
                            <ItemContainer key={user.id}>
                                <h3>{user.name}</h3>
                                <p>{user.username}</p>
                            </ItemContainer>)}
                    </Container>
                    <NavigationButtons settings={navigationProps} />
                </>
            }}
        </Fetch>
    )
}