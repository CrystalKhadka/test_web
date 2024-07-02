import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
	addPetApi,
	deletePetByIdApi,
	viewPetByOwnerApi,
} from "../../../../apis/Api";

const MyPetList = () => {
	const colors = [
		"red",
		"green",
		"blue",
		"yellow",
		"orange",
		"purple",
		"black",
		"white",
	];
	const [selectedColor, setSelectedColor] = useState("black");
	const handleColorClick = (color) => {
		setPetColor(color);
		setSelectedColor(color);
	};

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showAddPetModal, setShowAddPetModal] = useState(false);
	const [petToDelete, setPetToDelete] = useState(null);
	const [petName, setPetName] = useState("");
	const [petBreed, setPetBreed] = useState("");
	const [petSpecies, setPetSpecies] = useState("");
	const [petAge, setPetAge] = useState("");
	const [petWeight, setPetWeight] = useState("");
	const [petColor, setPetColor] = useState("");
	const [petDescription, setPetDescription] = useState("");
	const [petImage, setPetImage] = useState("");
	const [previewImage, setPreviewImage] = useState("");
	const [pets, setPets] = useState([]);

	useEffect(() => {
		// pet owner
		const user = JSON.parse(localStorage.getItem("user"));
		const id = user.id;
		viewPetByOwnerApi(id)
			.then((response) => {
				setPets(response.data.pets);
				console.log(pets);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		setPetImage(file);
		setPreviewImage(URL.createObjectURL(file));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// pet owner
		const user = JSON.parse(localStorage.getItem("user"));

		console.log({
			petImage,
		});

		const formData = new FormData();
		formData.append("petName", petName);
		formData.append("petBreed", petBreed);
		formData.append("petSpecies", petSpecies);
		formData.append("petAge", petAge);
		formData.append("petWeight", petWeight);
		formData.append("petColor", petColor);
		formData.append("petDescription", petDescription);
		formData.append("petImage", petImage);
		formData.append("petOwner", user.id);

		// Send formData to the server
		addPetApi(formData)
			.then((response) => {
				if (response.status === 201) {
					toast.success(response.data.message);
					window.location.reload();
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 400) {
						toast.warning(error.response.data.message);
					} else if (error.response.status === 500) {
						toast.error(error.response.data.message);
					} else {
						toast.error("Something went wrong!");
					}
				} else {
					toast.error("Something went wrong!");
				}
			});
	};

	const openAddModal = () => {
		setShowAddPetModal(true);
	};

	const closeAddModal = () => {
		setShowAddPetModal(false);
	};

	const openDeleteModal = (petId) => {
		setPetToDelete(petId);
		setShowDeleteModal(true);
	};

	const closeDeleteModal = () => {
		setPetToDelete(null);
		setShowDeleteModal(false);
	};

	const confirmDelete = () => {
		if (petToDelete) {
			handleDelete(petToDelete);
			closeDeleteModal();
		}
	};

	const handleDelete = (id) => {
		// pet owner

		deletePetByIdApi(id)
			.then((response) => {
				if (response.status === 200) {
					toast.success(response.data.message);
					window.location.reload();
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 400) {
						toast.warning(error.response.data.message);
					} else if (error.response.status === 500) {
						toast.error(error.response.data.message);
					} else if (error.response.status === 401) {
						toast.error(error.response.data.message);
					} else {
						toast.error("Something went wrong!");
					}
				} else {
					toast.error("Something went wrong!");
				}
			});
	};
	return (
		<>
			<div className="md:ml-64 md:px-8 md:py-16">
				<header>
					<h1 className="mb-4 text-center text-2xl">Pet List Admin Panel</h1>
				</header>
				<main>
					<div className="container mx-auto">
						<div className="rounded-lg bg-white p-6 shadow-md">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-xl font-semibold">Pet List</h2>
								<button
									onClick={openAddModal}
									className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
									type="button"
								>
									Add New Pet
								</button>
							</div>
							<div className="relative overflow-x-auto">
								<table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
									<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
										<tr>
											<th scope="col" className="px-6 py-3">
												Pet Image
											</th>
											<th scope="col" className="px-6 py-3">
												Pet name
											</th>
											<th scope="col" className="px-6 py-3">
												Pet type
											</th>
											<th scope="col" className="px-6 py-3">
												Pet Species
											</th>
											<th scope="col" className="px-6 py-3">
												Pet Colors
											</th>
											<th scope="col" className="px-6 py-3">
												Pet Status
											</th>
											<th scope="col" className="px-6 py-3">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{pets.map((pet) => (
											<tr
												className="bg-white dark:bg-gray-800 dark:text-white"
												key={pet._id}
											>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="flex items-center">
														<div className="h-10 w-10 flex-shrink-0">
															<img
																className="h-10 w-10 rounded-full"
																src={`http://localhost:5000/pets/${pet.petImage}`}
																alt=""
															/>
														</div>
													</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="text-sm font-medium ">
														{pet.petName}
													</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="text-sm">{pet.petBreed}</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<div className="text-sm">{pet.petSpecies}</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<div
														className=" inline-flex rounded-full  px-4 py-2  text-xs font-semibold leading-5 text-gray-500"
														style={{
															backgroundColor: pet.petColor,
														}}
													></div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<span
														className=" inline-flex  rounded-full px-4 py-2 text-xs font-semibold leading-5 text-gray-500"
														style={{
															backgroundColor:
																pet.petStatus === "available"
																	? "green"
																	: pet.petStatus === "pending"
																		? "yellow"
																		: "red",
															color:
																pet.petStatus === "pending" ? "black" : "white",
														}}
													>
														{pet.petStatus}
													</span>
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
													<div className="flex space-x-2">
														<Link
															to={`/admin/myPet/edit/${pet._id}`}
															className="block rounded-lg bg-gray-200 px-5 py-2.5 text-center text-sm font-medium text-indigo-600 hover:text-indigo-900 "
														>
															Edit
														</Link>

														<button
															onClick={() => openDeleteModal(pet._id)}
															class="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
															type="button"
														>
															Delete
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</main>
			</div>

			{showDeleteModal && (
				<div
					id="popup-modal"
					tabIndex="-1"
					className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
				>
					<div className="relative max-h-full w-full max-w-md">
						<div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
							<button
								type="button"
								className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
								onClick={closeDeleteModal}
							>
								<svg
									className="h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
							<div className="p-6 text-center">
								<svg
									className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 16h-1v-4h-1m-1 4h-1m6-2h-1m4 0a9 9 0 11-9-9 9 9 0 019 9z"
									/>
								</svg>
								<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
									Are you sure you want to delete this pet?
								</h3>
								<button
									type="button"
									className="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
									onClick={confirmDelete}
								>
									Yes, I'm sure
								</button>
								<button
									type="button"
									className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
									onClick={closeDeleteModal}
								>
									No, cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{showAddPetModal && (
				<div
					id="default-modal"
					className="fixed left-0 right-0 top-0 z-50  h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
				>
					<div className="fixed inset-0  flex  justify-center overflow-auto bg-gray-600 bg-opacity-50">
						<div className="m-auto w-full overflow-auto   rounded-lg bg-white p-6 shadow-lg md:w-1/2 ">
							<div className="flex items-center justify-between rounded-t border-b dark:border-gray-600 ">
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
									Add New Pet
								</h3>
								<button
									type="button"
									onClick={closeAddModal}
									className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
									data-modal-toggle="default-modal"
								>
									<svg
										className="h-3 w-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
								</button>
							</div>
							<form id="add-pet-form">
								<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-2">
									<div className="mb-4 w-full">
										<label className="block text-gray-700">Name</label>
										<input
											type="text"
											name="name"
											className="w-full rounded-lg border px-4 py-2"
											onChange={(e) => setPetName(e.target.value)}
											required
										/>
									</div>
									<div className="mb-4 w-full">
										<label className="block text-gray-700">Species</label>
										<select
											id="pet-select"
											value={petSpecies}
											onChange={(e) => {
												setPetSpecies(e.target.value);
											}}
											className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
										>
											<option value="">Choose a species</option>
											<option value="dog">Dog</option>
											<option value="cat">Cat</option>
											<option value="rabbit">Rabbit</option>
											<option value="hamster">Hamster</option>
											<option value="bird">Bird</option>
											<option value="fish">Fish</option>
										</select>
									</div>
								</div>
								<div className="mb-4">
									<label htmlFor="petDescription" className="block">
										Pet description
									</label>
									<textarea
										name="petDescription"
										id="petDescription"
										className="w-full rounded-lg border px-4 py-2 "
										onChange={(e) => setPetDescription(e.target.value)}
									></textarea>
								</div>
								<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-4">
									<div className="mb-4 w-full">
										<label className="block text-gray-700">Breed</label>
										<input
											type="text"
											name="type"
											className="w-full rounded-lg border px-4 py-2"
											onChange={(e) => setPetBreed(e.target.value)}
											required
										/>
									</div>
									<div className="mb-4 w-full">
										<label className="block text-gray-700">Age</label>
										<input
											type="number"
											name="age"
											className="w-full rounded-lg border px-4 py-2"
											onChange={(e) => setPetAge(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-4">
									<div className="mb-4 w-full">
										<label className="block text-gray-700">Weight</label>
										<input
											type="number"
											name="type"
											className="w-full rounded-lg border px-4 py-2"
											onChange={(e) => setPetWeight(e.target.value)}
											required
										/>
									</div>
								</div>
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Color</label>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											margin: "20px 0",
										}}
									>
										{colors.map((color) => (
											<div
												key={color}
												onClick={() => handleColorClick(color)}
												style={{
													backgroundColor: color,
													width: "50px",
													height: "50px",
													margin: "0 10px",
													cursor: "pointer",
													border:
														selectedColor === color
															? "3px solid black"
															: "1px solid gray",
												}}
											/>
										))}
									</div>
								</div>

								<div className="mb-4">
									<label className="block text-gray-700" htmlFor="image">
										Image
									</label>
									<input
										type="file"
										name="image"
										className="w-full border px-4 py-2"
										onChange={handleImageChange}
										required
									/>
								</div>
								{previewImage && (
									<div className="mb-2">
										<img
											src={previewImage}
											className="img-fluid rounded"
											alt="product"
										/>
									</div>
								)}
								<hr />
								<div className="mt-5 flex justify-end">
									<button
										onClick={closeAddModal}
										type="button"
										className="mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
									>
										Cancel
									</button>
									<button
										className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
										onClick={handleSubmit}
									>
										Add Pet
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MyPetList;
