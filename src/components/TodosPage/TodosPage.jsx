import axios from "axios";
import React, { useState, useEffect } from "react";
import { HTTP_STATUS, TODOS_TOTAL_COUNT, TODOS_LIMIT } from "../../constants/constants";
import { Container } from "../Container/Container";
import { ItemContainer } from "../ItemContainer/ItemContainer";
import { Loader } from "../Loader/Loader";
import styles from "./TodosPage.module.css";
import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';
import { ImWarning, } from 'react-icons/im';

export const TodosPage = (props) => {

    // const [count, setCount] = useState(0);

    const [state, setState] = useState({
        todos: null,
        status: HTTP_STATUS.IDLE,
        error: null,
    });

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // axios.get('https://jsonplaceholder.typicode.com/todos')
        // .then((response) => {
        //     console.log(response);
        // })

        const loadTodos = async () => {
            setState({ ...state, status: HTTP_STATUS.PENDING })
            try {
                const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${TODOS_LIMIT}&_page=${currentPage}`);

                setState({ ...state, todos: data, status: HTTP_STATUS.FULFILLED });
            }
            catch (err) { setState({ ...state, error: err.message, status: HTTP_STATUS.REJECTED }) };

        };

        loadTodos();
    }, [currentPage]);


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

    // const handleIncrement = () => setCount(count + 1);
    // const handleDecrement = () => setCount(count - 1);

    return <>
        <Container>
            {state.status === HTTP_STATUS.PENDING && <Loader />}

            {state.status === HTTP_STATUS.FULFILLED && state.todos.map(todo =>
                <ItemContainer key={todo.id} customClassName={styles.itemContainer}>
                    <input id={todo.id} type="checkbox" />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </ItemContainer>)}

            {state.status === HTTP_STATUS.REJECTED &&
                <div className={styles.errorContainer}>
                    <ImWarning color='red' size={40} />
                    <h1>{state.error}</h1>
                </div>}
        </Container>

        <div className={styles.buttonsContainer}>
            <button onClick={handlePrevButtonClick} disabled={currentPage === 1 || state.status === HTTP_STATUS.PENDING}><FaArrowLeft color="white" /></button>
            <button onClick={handleNextButtonClick} disabled={currentPage === TODOS_TOTAL_COUNT / TODOS_LIMIT || state.status === HTTP_STATUS.PENDING}><FaArrowRight color="white" /></button>
        </div>
    </>
}