import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, initialValue) => {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
        setLoading(true);
        const getData = async () => {
            try {
                const fetchResource = await axios(url);

                setData(fetchResource.data);
            } catch (error) {
                if (error.fetchResource) {
                    setError(`Server Error : ${error.fetchResource.status} - ${error.fetchResource.data}`)
                } else if (error.request) {
                    setError("Network Error : No Error Received.");
                } else {
                    setError(error.message);
                }
                setData(initialValue);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [url]); // Dependency
    return { data, loading, error };
}

export default useAxios;