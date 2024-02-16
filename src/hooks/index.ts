import { useEffect, useState } from "react";

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