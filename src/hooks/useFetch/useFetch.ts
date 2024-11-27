import { useCallback, useEffect, useState } from 'react';

type TFetchParams = {
	params?: Record<string, unknown>;
};

export const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [fetchOptions, setFetchOptions] = useState<TFetchParams | null>(null);

	const fetchData = useCallback(
		async (options: TFetchParams = {}) => {
			setIsLoading(true);
			setError(null);

			try {
				const queryString = options.params
					? `?${new URLSearchParams(options.params as Record<string, string>).toString()}`
					: '';
				const response = await fetch(`${url}${queryString}`);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const result = await response.json();
				setData(result);
			} catch (err: any) {
				setError(err.message || 'Unknown error');
			} finally {
				setIsLoading(false);
			}
		},
		[url],
	);

	useEffect(() => {
		fetchData(fetchOptions || {});
	}, [fetchData, fetchOptions]);

	const refetch = useCallback(
		(options?: TFetchParams) => {
			setFetchOptions(options || {});
			fetchData(options || {});
		},
		[fetchData],
	);

	return { data, isLoading, error, refetch };
};
