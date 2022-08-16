import React, { useEffect, useState } from 'react'
import { HTTP_STATUS } from '../../constants/constants';
import axios from 'axios';

export const Fetch = ({ url, loader, children, renderError }) => {


    const [state, setState] = useState({
        data: null,
        status: HTTP_STATUS.IDLE,
        error: null,
    });

    useEffect(() => {

        const loadData = async () => {
            setState({ ...state, status: HTTP_STATUS.PENDING })
            try {
                throw new Error("Super unexpected Error. Literally nobody expected");
                const { data } = await axios.get(url);

                setState({ ...state, data, status: HTTP_STATUS.FULFILLED });
            }
            catch (err) { setState({ ...state, error: err.message, status: HTTP_STATUS.REJECTED }) };
        };

        loadData();
    }, [url]);

    return (
        <>
            {state.status === HTTP_STATUS.PENDING && (loader || <h1>Загрузка...</h1>)}

            {state.status === HTTP_STATUS.FULFILLED && children(state)}

            {state.status === HTTP_STATUS.REJECTED && renderError(state.error)}
        </>
    )
}
