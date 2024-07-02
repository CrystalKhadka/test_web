import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUserApi } from "../../apis/Api";

const Register = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [gender, setGender] = useState("");
	const [obscurePassword, setObscurePassword] = useState(true);
	const [role, setRole] = useState("");
	const [showModal, setShowModal] = useState(false);

	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [confirmPasswordError, setConfirmPasswordError] = useState("");
	const [birthDateError, setBirthDateError] = useState("");
	const [phoneError, setPhoneError] = useState("");
	const [addressError, setAddressError] = useState("");
	const [genderError, setGenderError] = useState("");
	const [roleError, setRoleError] = useState("");

	const handleGenderChange = (e) => {
		setGender(e.target.value);
	};

	const setDefaultError = () => {
		setFirstNameError("");
		setLastNameError("");
		setEmailError("");
		setPasswordError("");
		setConfirmPasswordError("");
		setBirthDateError("");
		setPhoneError("");
		setAddressError("");
		setGenderError("");
		setRoleError("");
	};

	var validate = () => {
		var isValid = true;

		if (firstName.trim() === "") {
			setFirstNameError("First name is required");
			isValid = false;
		}
		if (lastName.trim() === "") {
			setLastNameError("Last name is required");
			isValid = false;
		}
		if (email.trim() === "") {
			setEmailError("Email is required");
			isValid = false;
		}
		if (password.trim() === "") {
			setPasswordError("Password is required");
			isValid = false;
		}
		if (confirmPassword.trim() === "") {
			setConfirmPasswordError("Confirm Password is required");
			isValid = false;
		}
		if (birthDate.trim() === "") {
			setBirthDateError("Birth Date is required");
			isValid = false;
		}
		if (phone.trim() === "") {
			setPhoneError("Phone is required");
			isValid = false;
		}
		if (address.trim() === "") {
			setAddressError("Address is required");
			isValid = false;
		}
		if (gender.trim() === "") {
			setGenderError("Gender is required");
			isValid = false;
		}
		if (password.trim().length < 8) {
			setPasswordError("Password must be at least 8 characters long");
			isValid = false;
		}

		if (email.includes("@") === false || email.includes(".") === false) {
			setEmailError("Invalid Email");
			isValid = false;
		}
		return isValid;
	};

	const checkBirthDate = () => {
		var today = new Date();
		var date = new Date(birthDate);

		var age = today.getFullYear() - date.getFullYear();
		var m = today.getMonth() - date.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
			age--;
		}
		if (age < 18) {
			setBirthDateError("You must be 18 years or older");
			return false;
		}
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setDefaultError();

		if (!validate() || !checkBirthDate()) {
			return;
		}

		if (password !== confirmPassword) {
			toast.error("Password and Confirm Password doesn't match");
			return;
		}

		setShowModal(true);
	};

	const handleRoleSelect = (selectedRole) => {
		setRole(selectedRole);
	};

	const handleRegister = () => {
		if (role.trim() === "") {
			setRoleError("Role selection is required");
			return;
		}

		setShowModal(false);
		const data = {
			firstName,
			lastName,
			email,
			password,
			birthDate,
			phone,
			address,
			gender,
			role,
		};

		registerUserApi(data)
			.then((res) => {
				if (res.status === 201) {
					toast.success(res.data.message);
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response) {
					if (err.response.status === 400) {
						toast.warning(err.response.data.message);
					} else if (err.response.status === 500) {
						toast.error(err.response.data.message);
					} else {
						toast.error("Something went wrong");
					}
				} else {
					toast.error("Something went wrong");
				}
			});
	};

	return (
		<>
			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 ">
					<div className="rounded-lg bg-white p-8">
						<h2 className="mb-4 text-2xl font-bold">Select Your Role</h2>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
							<div>
								<input
									type="radio"
									id="adopter"
									name="role"
									value="adopter"
									onChange={() => handleRoleSelect("adopter")}
								/>
								<label htmlFor="adopter">Pet Adopter</label>
							</div>
							<div>
								<input
									type="radio"
									id="owner"
									name="role"
									value="owner"
									onChange={() => handleRoleSelect("owner")}
								/>
								<label htmlFor="owner">Pet Owner</label>
							</div>
							<div>
								<input
									type="radio"
									id="shelter"
									name="role"
									value="shelter"
									onChange={() => handleRoleSelect("shelter")}
								/>
								<label htmlFor="shelter">Pet Shelter</label>
							</div>
							{roleError && <p className="text-sm text-red-500">{roleError}</p>}
						</div>
						<div className="mt-4 text-right">
							<button
								type="button"
								className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button
								type="button"
								className="ml-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
								onClick={() => handleRegister()}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="flex min-h-screen items-center justify-center bg-gray-200">
				<div className="my-10 w-full max-w-5xl px-6">
					<div className="rounded-lg bg-white p-8 shadow-lg">
						<h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900">
							Register
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="space-y-6 ">
								<div className="flex flex-wrap gap-x-6 gap-y-6 md:grid md:grid-cols-2 md:gap-4	 ">
									<div className="w-full md:w-full">
										<label
											htmlFor="firstName"
											className="block text-sm font-medium text-gray-700"
										>
											First Name
										</label>
										<div className="relative mt-1 rounded-md shadow-sm">
											<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
												<i className="bi bi-person text-gray-400"></i>
											</div>
											<input
												type="text"
												id="firstName"
												name="firstName"
												autoComplete="given-name"
												required
												className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
											/>
										</div>
										{firstNameError && (
											<p className="text-sm text-red-500">{firstNameError}</p>
										)}
									</div>
									<div className="w-full md:w-full">
										<label
											htmlFor="lastName"
											className="block text-sm font-medium text-gray-700"
										>
											Last Name
										</label>
										<div className="relative mt-1 rounded-md shadow-sm">
											<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
												<i className="bi bi-person text-gray-400"></i>
											</div>
											<input
												type="text"
												id="lastName"
												name="lastName"
												autoComplete="family-name"
												required
												className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
											/>
										</div>
										{lastNameError && (
											<p className="text-sm text-red-500">{lastNameError}</p>
										)}
									</div>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<i className="bi bi-envelope text-gray-400"></i>
										</div>
										<input
											type="email"
											id="email"
											name="email"
											autoComplete="email"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									{emailError && (
										<p className="text-sm text-red-500">{emailError}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Password
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<i className="bi bi-lock text-gray-400"></i>
										</div>
										<input
											id="password"
											name="password"
											type={obscurePassword ? "password" : "text"}
											autoComplete="current-password"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-10 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
											placeholder={obscurePassword ? "********" : "Password"}
											onChange={(e) => setPassword(e.target.value)}
										/>
										<div
											className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
											onClick={() => setObscurePassword(!obscurePassword)}
										>
											<i
												className={
													obscurePassword
														? "bi bi-eye-slash text-gray-400"
														: "bi bi-eye text-gray-400"
												}
											></i>
										</div>
									</div>
									{passwordError && (
										<p className="mt-2 text-sm text-red-600">{passwordError}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Confirm Password
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<i className="bi bi-lock text-gray-400"></i>
										</div>
										<input
											id="confirmPassword"
											name="confirmPassword"
											type={obscurePassword ? "password" : "text"}
											autoComplete="current-password"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-10 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
											placeholder={obscurePassword ? "********" : "Password"}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
										<div
											className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
											onClick={() => setObscurePassword(!obscurePassword)}
										>
											<i
												className={
													obscurePassword
														? "bi bi-eye-slash text-gray-400"
														: "bi bi-eye text-gray-400"
												}
											></i>
										</div>
									</div>
									{confirmPasswordError && (
										<p className="mt-2 text-sm text-red-600">
											{confirmPasswordError}
										</p>
									)}
								</div>
								<div>
									<label
										htmlFor="birthDate"
										className="block text-sm font-medium text-gray-700"
									>
										Birth Date
									</label>
									<div className="relative mt-1 rounded-md shadow-sm">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<i className="bi bi-calendar text-gray-400"></i>
										</div>
										<input
											type="date"
											id="birthDate"
											name="birthDate"
											className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
											required
											value={birthDate}
											onChange={(e) => setBirthDate(e.target.value)}
										/>
									</div>
									{birthDateError && (
										<p className="text-sm text-red-500">{birthDateError}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="phone"
										className="block text-sm font-medium text-gray-700"
									>
										Phone
									</label>
									<div className="relative mt-1 rounded-md">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<i className="bi bi-phone text-gray-400"></i>
										</div>
										<input
											type="tel"
											id="phone"
											name="phone"
											autoComplete="tel"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
										/>
									</div>
									{phoneError && (
										<p className="text-sm text-red-500">{phoneError}</p>
									)}
								</div>
								<div>
									<label
										htmlFor="address"
										className="block text-sm font-medium text-gray-700"
									>
										Address
									</label>
									<div className="relative mt-1 rounded">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<i className="bi bi-pin text-gray-400"></i>
										</div>
										<input
											type="text"
											id="address"
											name="address"
											autoComplete="address"
											required
											className="block w-full appearance-none rounded-md border border-gray-300 py-2 pl-10 pr-3 placeholder-gray-400 shadow-sm focus:border-red-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
											value={address}
											onChange={(e) => setAddress(e.target.value)}
										/>
									</div>
									{addressError && (
										<p className="text-sm text-red-500">{addressError}</p>
									)}
								</div>
								<div>
									<fieldset>
										<legend className="block text-sm font-medium text-gray-700">
											Gender
										</legend>
										<div className="mt-1 grid grid-cols-3 gap-4">
											<div className="flex items-center">
												<input
													id="gender-male"
													name="gender"
													type="radio"
													className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
													value="male"
													checked={gender === "male"}
													onChange={handleGenderChange}
												/>
												<label
													htmlFor="gender-male"
													className="ml-2 block text-sm text-gray-900"
												>
													Male
												</label>
											</div>
											<div className="flex items-center">
												<input
													id="gender-female"
													name="gender"
													type="radio"
													className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
													value="female"
													checked={gender === "female"}
													onChange={handleGenderChange}
												/>
												<label
													htmlFor="gender-female"
													className="ml-2 block text-sm text-gray-900"
												>
													Female
												</label>
											</div>
											<div className="flex items-center">
												<input
													id="gender-other"
													name="gender"
													type="radio"
													className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
													value="other"
													checked={gender === "other"}
													onChange={handleGenderChange}
												/>
												<label
													htmlFor="gender-other"
													className="ml-2 block text-sm text-gray-900"
												>
													Other
												</label>
											</div>
										</div>
									</fieldset>
									{genderError && (
										<p className="text-sm text-red-500">{genderError}</p>
									)}
								</div>
								<div className="flex items-center">
									<input
										id="acceptTerms"
										name="acceptTerms"
										type="checkbox"
										required
										className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
									/>
									<label
										htmlFor="acceptTerms"
										className="ml-2 block text-sm text-gray-900"
									>
										I accept the{" "}
										<a href="/" className="text-blue-600">
											Terms of Use
										</a>{" "}
										&{" "}
										<a href="/" className="text-blue-600">
											Privacy Policy
										</a>
									</label>
								</div>
								<div>
									<button
										type="submit"
										className="px- 4 flex w-full justify-center
                    rounded-md border border-transparent bg-blue-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
									>
										Register Now
									</button>
								</div>
							</div>
						</form>
						<div className="mt-4 text-center">
							<p className="text-sm">
								Already have an account?{" "}
								<Link
									to="/login"
									className="font-medium text-blue-600 hover:text-blue-500"
								>
									Log in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
