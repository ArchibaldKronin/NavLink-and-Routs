import React from 'react';
import styles from './Loader.module.css';

export const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <label>
                Загрузка...
            </label>
            <div className={styles.loader}></div>
        </div>
    )
}
