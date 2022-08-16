import React, { useState } from "react";
import { POSTS_TOTAL_COUNT, POSTS_LIMIT } from "../../constants/constants";
import { Container } from "../Container/Container";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { Loader } from "../Loader/Loader";
import styles from "./PostsPage.module.css";
import { Fetch } from "../Fetch/Fetch";
import { NavLink } from 'react-router-dom';
import { NavigationButtons } from "../NavigationButtons/NavigationButtons";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const PostsPage = (props) => {

    const PAGES_AMOUNT = POSTS_TOTAL_COUNT / POSTS_LIMIT;

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Fetch url={`https://jsonplaceholder.typicode.com/posts?_limit=${POSTS_LIMIT}&_page=${currentPage}`}
            loader={<Loader />} renderError={(errorText) => <ErrorPage errorMessage={errorText} />} >
            {({ data: posts, status }) => {
                const navigationProps = {
                    currentPage,
                    setCurrentPage,
                    status,
                    pagesAmount: PAGES_AMOUNT,
                }

                return <>
                    <Container>
                        {posts.map(post =>
                            <ItemContainer key={post.id}>
                                <NavLink to={`/posts/${post.userId}`}
                                    className={(navData) => navData.isActive ? `${styles.active} ${styles.link}` : `${styles.link}`}>
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                </NavLink>
                            </ItemContainer>)}
                    </Container>
                    <NavigationButtons settings={navigationProps} />
                </>
            }}

        </Fetch>
    )
}