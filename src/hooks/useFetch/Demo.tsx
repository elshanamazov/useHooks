import { useFetch } from './useFetch';

function Demo() {
	const { data, isLoading, error, refetch } = useFetch<{ id: number; title: string }[]>(
		'https://jsonplaceholder.typicode.com/posts',
	);

	return (
		<div>
			<div>
				<button
					onClick={() =>
						refetch({
							params: {
								_limit: 5,
							},
						})
					}>
					Перезапросить
				</button>
			</div>
			{isLoading && <p>Загрузка...</p>}
			{error && <p>Произошла ошибка</p>}
			{data && !isLoading && data.map((item) => <div key={item.id}>{item.title}</div>)}
		</div>
	);
}

export default Demo;
