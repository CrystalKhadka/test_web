import React, { useEffect, useState } from "react";
import { getPaginationApi } from "../../../apis/Api";
import PetCard from "../../../components/PetCard";

const PetList = () => {
	const [pets, setPets] = useState([]);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(6);
	const [totalPage, setTotalPage] = useState(2);

	useEffect(() => {
		getPaginationApi(page, limit)
			.then((res) => setPets(res.data.pets))
			.catch((err) => {
				console.log(err);
				setError("Error fetching data");
			});
	}, []);

	const handlePagination = (page) => {
		setPage(page);
		getPaginationApi(page, limit)
			.then((res) => setPets(res.data.pets))
			.catch((err) => {
				console.log(err);
				setError("Error fetching data");
			});
	};
	return (
		<div className="flex min-h-lvh bg-gray-100">
			<aside className="h-full w-1/4 bg-white p-6 shadow-lg">
				<h2 className="mb-4 text-2xl font-bold text-gray-800">
					Search and Filter
				</h2>
				<div className="mb-4">
					<input
						type="text"
						placeholder="Search for breed"
						className="w-full rounded-lg border border-gray-300 p-2 shadow-sm"
					/>
				</div>
				<div className="mb-6">
					<h3 className="mb-2 text-lg font-semibold text-gray-700">
						Filter by distance
					</h3>
					<ul className="space-y-2">
						<li>
							<input
								type="radio"
								id="2km"
								name="distance"
								value="2km"
								defaultChecked
							/>
							<label htmlFor="2km" className="ml-2 text-gray-600">
								2 KM
							</label>
						</li>
						<li>
							<input type="radio" id="5km" name="distance" value="5km" />
							<label htmlFor="5km" className="ml-2 text-gray-600">
								5 KM
							</label>
						</li>
						<li>
							<input type="radio" id="10km" name="distance" value="10km" />
							<label htmlFor="10km" className="ml-2 text-gray-600">
								10 KM
							</label>
						</li>
					</ul>
				</div>
				<div className="mb-6">
					<h3 className="mb-2 text-lg font-semibold text-gray-700">
						Filter by category
					</h3>
					<ul className="space-y-2">
						<li>
							<input
								type="radio"
								id="dog"
								name="category"
								value="dog"
								defaultChecked
							/>
							<label htmlFor="dog" className="ml-2 text-gray-600">
								Dog
							</label>
						</li>
						<li>
							<input type="radio" id="cat" name="category" value="cat" />
							<label htmlFor="cat" className="ml-2 text-gray-600">
								Cat
							</label>
						</li>
						<li>
							<input type="radio" id="others" name="category" value="others" />
							<label htmlFor="others" className="ml-2 text-gray-600">
								Others
							</label>
						</li>
					</ul>
				</div>
				<button className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
					Filter
				</button>
			</aside>

			<div className="container">
				<main className="grid w-full grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
					{pets.map((pet) => (
						<div class="col">
							<PetCard pet={pet} />
						</div>
					))}
				</main>
				<nav className="mb-5 flex w-full justify-center ">
					<ul class="inline-flex w-full justify-center -space-x-px text-lg">
						<li>
							<button
								onClick={() => {
									handlePagination(1);
								}}
								className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Start
							</button>
						</li>
						<li>
							<button
								onClick={() => {
									handlePagination(page - 1);
								}}
								className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Previous
							</button>
						</li>
						{Array.from({ length: totalPage }, (_, i) => (
							<li>
								<button
									onClick={() => {
										handlePagination(i + 1);
									}}
									className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
								>
									{i + 1}
								</button>
							</li>
						))}
						<li>
							<button
								onClick={() => {
									handlePagination(page + 1);
								}}
								className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								Next
							</button>
						</li>

						<li
							onClick={() => {
								handlePagination(totalPage);
							}}
						>
							<button className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
								End
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default PetList;
