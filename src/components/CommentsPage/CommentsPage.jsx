import React, { useState } from 'react'
import { Container } from '../Container/Container'
import { Fetch } from '../Fetch/Fetch'
import { ItemContainer } from '../ItemContainer/ItemContainer'
import { COMMENTS_TOTAL_COUNT, COMMENTS_LIMIT } from "../../constants/constants";
import { Loader } from '../Loader/Loader';
import { NavigationButtons } from "../NavigationButtons/NavigationButtons"


export const CommentsPage = () => {

    const PAGES_AMOUNT = COMMENTS_TOTAL_COUNT / COMMENTS_LIMIT;

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Fetch url={`https://jsonplaceholder.typicode.com/comments?_limit=${COMMENTS_LIMIT}&_page=${currentPage}`}
            loader={<Loader />}>
            {({ data: comments, status }) => {
                const navigationProps = {
                    currentPage,
                    setCurrentPage,
                    status,
                    pagesAmount: PAGES_AMOUNT,
                }

                return <>
                    <Container>
                        {comments.map(comment =>
                            <ItemContainer key={comment.id}>
                                <h1>{comment.name}</h1>
                                <p>{comment.body}</p>
                            </ItemContainer>
                        )}
                    </Container>
                    <NavigationButtons settings={navigationProps} />
                </>
            }}
        </Fetch >
    )
}
