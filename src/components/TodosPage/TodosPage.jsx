import React, { useState } from "react";
import { TODOS_TOTAL_COUNT, TODOS_LIMIT } from "../../constants/constants";
import { Container } from "../Container/Container";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { Loader } from "../Loader/Loader";
import styles from "./TodosPage.module.css";
import { Fetch } from "../Fetch/Fetch";
import { NavigationButtons } from "../NavigationButtons/NavigationButtons";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export const TodosPage = (props) => {

    const PAGES_AMOUNT = TODOS_TOTAL_COUNT / TODOS_LIMIT;

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Fetch url={`https://jsonplaceholder.typicode.com/todos?_limit=${TODOS_LIMIT}&_page=${currentPage}`}
            loader={<Loader />} renderError={(errorText) => (<ErrorPage errorMessage={errorText} />)}>
            {({ data: todos, status }) => {
                const navigationProps = {
                    currentPage,
                    setCurrentPage,
                    status,
                    pagesAmount: PAGES_AMOUNT,
                }

                return <>
                    <Container>
                        {todos.map(todo =>
                            <ItemContainer key={todo.id} customClassName={styles.itemContainer}>
                                <input id={todo.id} type="checkbox" />
                                <label htmlFor={todo.id}>{todo.title}</label>
                            </ItemContainer>)}
                    </Container>
                    <NavigationButtons settings={navigationProps} />
                </>
            }}
        </Fetch>
    )
}