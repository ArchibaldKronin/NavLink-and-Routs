import React from 'react'
import styles from './NavigationButtons.module.css';
import { HTTP_STATUS } from "../../constants/constants";
import { FaArrowLeft, FaArrowRight, } from 'react-icons/fa';

export const NavigationButtons = ({ settings }) => {

    const { currentPage, setCurrentPage, pagesAmount, status } = settings;

    const handleNextButtonClick = () => {
        if (currentPage === pagesAmount)
            return;

        setCurrentPage(currentPage + 1);
    }

    const handlePrevButtonClick = () => {
        if (currentPage === 1)
            return;

        setCurrentPage(currentPage - 1);
    }
    // debugger

    return (
        <div className={styles.buttonsContainer}>
            <button onClick={handlePrevButtonClick} disabled={currentPage === 1 || status === HTTP_STATUS.PENDING}><FaArrowLeft color="white" /></button>
            <button onClick={handleNextButtonClick} disabled={currentPage === pagesAmount || status === HTTP_STATUS.PENDING} ><FaArrowRight color='white' /></button>
        </div>
    )
}



{/* <div className={styles.buttonsContainer}>
<button onClick={handlePrevButtonClick} disabled={currentPage === 1 || status === HTTP_STATUS.PENDING}><FaArrowLeft color="white" /></button>
<button onClick={handleNextButtonClick} disabled={currentPage === TODOS_TOTAL_COUNT / TODOS_LIMIT || status === HTTP_STATUS.PENDING}><FaArrowRight color="white" /></button>
</div> */}