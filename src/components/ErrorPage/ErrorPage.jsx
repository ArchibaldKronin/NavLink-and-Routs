import React from 'react'
import { Container } from '../Container/Container'
import styles from "./ErrorPage.module.css"
import { ImWarning, } from 'react-icons/im';

export const ErrorPage = ({ error: errorMessage }) => {
    return (
        <>
            <Container>
                <div className={styles.errorContainer}>
                    <ImWarning color='red' size={40} />
                    <h1>{errorMessage}</h1>
                </div>
            </Container>
        </>
    )
}
