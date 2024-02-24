import { useEffect, useState } from "react";


/**
 * Custom React hook for fetching data asynchronously.
 * @param {Function} fetchData - A function that returns a promise which resolves to the fetched data.
 * @returns An object containing the fetched data, loading state, and error state.
 * @template T - The type of data being fetched.
 */
export function useFetch<T>(fetchData: () => Promise<T>) {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>();

    useEffect(() => {
        setLoading(true);

        (async () => {
            try {
                const res = await fetchData();
                setData(res);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })()
    }, [fetchData])

    return {
        data,
        loading,
        error
    }
}