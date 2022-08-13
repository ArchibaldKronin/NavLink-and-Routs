import React, { useState } from 'react'
import { Container } from '../Container/Container'
import { Fetch } from '../Fetch/Fetch'
import { ItemContainer } from '../ItemContainer/ItemContainer'
import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import styles from './CommentsPage.module.css'
import { HTTP_STATUS, TODOS_TOTAL_COUNT, TODOS_LIMIT } from "../../constants/constants";
import { Loader } from '../Loader/Loader';


export const CommentsPage = () => {

    const [currentPage, setCurrentPage] = useState(1);

    const handleNextButtonClick = () => {
        if (currentPage === TODOS_TOTAL_COUNT / TODOS_LIMIT)
            return;

        setCurrentPage(currentPage + 1);
    }

    const handlePrevButtonClick = () => {
        if (currentPage === 1)
            return;

        setCurrentPage(currentPage - 1);
    }

    return (
        <Fetch url={`https://jsonplaceholder.typicode.com/comments?_limit=${TODOS_LIMIT}&_page=${currentPage}`}
            loader={<Loader />}>
            {({ data: comments, status }) => {
                return <>
                    <Container>
                        {comments.map(comment =>
                            <ItemContainer key={comment.id}>
                                <h1>{comment.name}</h1>
                                <p>{comment.body}</p>
                            </ItemContainer>
                        )}
                    </Container>
                    <div className={styles.buttonsContainer}>
                        <button onClick={handlePrevButtonClick} disabled={currentPage === 1 || status === HTTP_STATUS.PENDING}><FaArrowLeft color="white" /></button>
                        <button onClick={handleNextButtonClick} disabled={currentPage === TODOS_TOTAL_COUNT / TODOS_LIMIT || status === HTTP_STATUS.PENDING}><FaArrowRight color="white" /></button>
                    </div>
                </>
            }}
        </Fetch >
    )
}
