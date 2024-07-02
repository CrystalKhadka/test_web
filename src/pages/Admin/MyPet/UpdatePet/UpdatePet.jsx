import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePetByIdApi, viewPetByIdApi } from "../../../../apis/Api";

const UpdatePet = () => {
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

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		setPetImage(file);
		setPreviewImage(URL.createObjectURL(file));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("petName", petName);
		formData.append("petSpecies", petSpecies);
		formData.append("petBreed", petBreed);
		formData.append("petAge", petAge);
		formData.append("petWeight", petWeight);
		formData.append("petColor", petColor);
		formData.append("petDescription", petDescription);
		formData.append("petImage", petImage);

		console.log(formData);

		updatePetByIdApi(id, formData)
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					if (err.response.status === 404) {
						toast.error(err.response.data.message);
					} else if (err.response.status === 500) {
						toast.error(err.response.data.message);
					} else {
						toast.error("Something went wrong! Please try again later.");
					}
				} else {
					toast.error("Server Error! Please try again later.");
				}
			});
	};

	const { id } = useParams();

	const [petName, setPetName] = useState("");
	const [petBreed, setPetBreed] = useState("");
	const [petSpecies, setPetSpecies] = useState("");
	const [petAge, setPetAge] = useState("");
	const [petWeight, setPetWeight] = useState("");
	const [petColor, setPetColor] = useState("");
	const [petDescription, setPetDescription] = useState("");
	const [petImage, setPetImage] = useState("");
	const [previewOldImage, setOldPreviewImage] = useState("");
	const [previewImage, setPreviewImage] = useState("");

	useEffect(() => {
		// Fetch pet data from the server
		viewPetByIdApi(id)
			.then((res) => {
				const pet = res.data.data;
				console.log(pet);
				setPetName(pet.petName);
				setPetBreed(pet.petBreed);
				setPetSpecies(pet.petSpecies);
				setPetAge(pet.petAge);
				setPetWeight(pet.petWeight);
				setPetColor(pet.petColor);
				setSelectedColor(pet.petColor);
				setPetDescription(pet.petDescription);
				setOldPreviewImage(pet.petImage);
				setPetImage(pet.petImage);
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					if (err.response.status === 404) {
						toast(err.response.data.message);
					} else if (err.response.status === 500) {
						toast(err.response.data.message);
					} else {
						toast("Something went wrong! Please try again later.");
					}
				} else {
					toast("Server Error! Please try again later.");
				}
			});
	}, [id]);
	return (
		<>
			<div className="md:ml-64 md:px-8 md:py-16">
				<form id="update-pet-form">
					<div className=" flex flex-wrap gap-x-20 gap-y-5 md:grid md:grid-cols-2  ">
						<div>
							<div className="flex flex-wrap gap-x-6  md:grid md:grid-cols-2 md:gap-2">
								<div className="mb-4 w-full">
									<label className="block text-gray-700">Name</label>
									<input
										type="text"
										name="name"
										className="w-full rounded-lg border px-4 py-2"
										onChange={(e) => setPetName(e.target.value)}
										value={petName}
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
									value={petDescription}
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
										value={petBreed}
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
										value={petAge}
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
										value={petWeight}
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
						</div>
						<div>
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
							<div className="grid grid-cols-2">
								<div>
									<h1>Before Update</h1>
									{previewOldImage && (
										<div className="mb-2">
											<img
												src={`http://localhost:5000/pets/${previewOldImage}`}
												className="img-fluid rounded"
												alt="product"
											/>
										</div>
									)}
								</div>
								<div>
									<h1>After Update</h1>
									{previewImage && (
										<div className="mb-2">
											<img
												src={previewImage}
												className="img-fluid rounded"
												alt="product"
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
					<hr />
					<div className="mt-5 flex justify-start">
						<button
							className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
							onClick={handleSubmit}
						>
							Update Pet
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default UpdatePet;
