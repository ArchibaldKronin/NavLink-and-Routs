import React, { useState } from 'react'
import { Container } from '../Container/Container'
import { ItemContainer } from '../ItemContainer/ItemContainer'
import { PHOTOS_TOTAL_COUNT, PHOTOS_LIMIT, HTTP_STATUS } from "../../constants/constants";
import { Loader } from '../Loader/Loader';
import { NavigationButtons } from "../NavigationButtons/NavigationButtons"
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { useFetch } from '../useFetch/useFetch'

export const PhotosPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const PAGES_AMOUNT = PHOTOS_TOTAL_COUNT / PHOTOS_LIMIT;
    const { data, status, error } = useFetch(`https://jsonplaceholder.typicode.com/photos?_limit=${PHOTOS_LIMIT}&_page=${currentPage}`);

    return (
        <>
            <Container>
                {status === HTTP_STATUS.PENDING && <Loader />}
                {status === HTTP_STATUS.FULFILLED && data?.map(photo =>
                    <ItemContainer key={photo.id}>
                        <h3>{photo.title}</h3>
                    </ItemContainer>)}
                {status === HTTP_STATUS.REJECTED && <ErrorPage errorMessage={error} />}
            </Container>
            <NavigationButtons settings={{ currentPage, setCurrentPage, status, pagesAmount: PAGES_AMOUNT }} />
        </>
    )
}
