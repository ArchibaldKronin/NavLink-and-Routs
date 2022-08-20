import { useState, useEffect } from 'react';
import { HTTP_STATUS } from '../../constants/constants';
import axios from 'axios';

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        status: HTTP_STATUS.IDLE,
        error: null,
    })

    useEffect(() => {

        const loadData = async () => {
            setState({ ...state, status: HTTP_STATUS.PENDING })
            try {
                // throw new Error("Super unexpected Error. Literally nobody expected");
                const { data } = await axios.get(url);

                setState({ ...state, data, status: HTTP_STATUS.FULFILLED });
            }
            catch (err) { setState({ ...state, error: err.message, status: HTTP_STATUS.REJECTED }) };
        }

        loadData();
    }, [url]);


    return state;
}
