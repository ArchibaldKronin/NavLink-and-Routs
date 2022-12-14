import React, { Component } from 'react';
import styles from './ErrorModalWindow.module.css';

export function ErrorModalWindow(props) {

    const error = props.error;
    const handlerClickCloseButton = props.onClick;

    return (
        <div className={styles.ErrorModalWrapper}>
            <div className={styles.ErrorModalWindow}>
                <p>
                    {error}
                </p>
                <button onClick={handlerClickCloseButton}>Закрыть</button>
            </div>
        </div>
    )
}