import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext/ThemeContext";

const UserNavbar = () => {
	const { toggleTheme } = useTheme();
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "default",
	);
	const user = JSON.parse(localStorage.getItem("user"));

	// Custom class for active link
	const activeLinkClass = ({ isActive }) =>
		isActive
			? "block px-3 py-2 mx-auto rounded bg-blue-700 text-white"
			: "block px-3 py-2 mx-auto rounded hover:bg-gray-700 text-gray-700 dark:text-white dark:hover:bg-gray-600";

	// Dynamic classes based on theme

	const dropdownHoverClass = "dark:hover:bg-gray-700  hover:bg-gray-100";

	return (
		<nav
			className={` bg-gray-100 text-gray-800 shadow-lg dark:bg-gray-900 dark:text-white`}
		>
			<div className="container mx-auto flex flex-wrap items-center justify-between p-4">
				{/* Logo */}
				<img
					src="./../../assets/icons/icon.jpg"
					className="h-16"
					alt="App Logo"
				/>

				{/* Mobile Menu Button */}
				<button
					data-collapse-toggle="navbar-dropdown"
					type="button"
					className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
					aria-controls="navbar-dropdown"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					<svg
						className="h-5 w-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg>
				</button>

				{/* Desktop Menu */}
				<div
					id="navbar-dropdown"
					className="hidden w-full flex-col md:flex md:w-auto md:flex-1 md:flex-row md:justify-between"
				>
					<div></div>
					<div className="mt-4 flex w-full flex-col p-4 font-medium md:mt-0 md:w-auto md:flex-row md:p-0">
						<NavLink to="/" className={activeLinkClass}>
							Home
						</NavLink>
						<NavLink to="/user/pet/list" className={activeLinkClass}>
							Pet List
						</NavLink>
						<NavLink to="/settings" className={activeLinkClass}>
							Settings
						</NavLink>
						{user ? (
							<NavLink to="/chat" className={activeLinkClass}>
								Chat
							</NavLink>
						) : null}
					</div>

					{/* User Dropdown */}
					<div className="flex w-full justify-start md:w-auto">
						{user ? (
							<div className="relative">
								<button
									id="dropdownNavbarLink"
									className={`flex items-center justify-between rounded bg-white px-3 py-2 text-gray-700 dark:bg-gray-800 dark:text-gray-300`}
									onClick={() => {
										const dropdown = document.getElementById("dropdownNavbar");
										if (dropdown) {
											dropdown.classList.toggle("hidden");
										}
									}}
								>
									{user.firstName}
									<svg
										className="ms-2.5 h-2.5 w-2.5"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 10 6"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 4 4 4-4"
										/>
									</svg>
								</button>
								<div
									id="dropdownNavbar"
									className={`absolute right-0 z-10 mt-2 hidden w-48 divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-300`}
								>
									<ul className="py-2 text-sm">
										<li>
											<NavLink
												to="/profile"
												className={({ isActive }) =>
													isActive
														? "block bg-gray-100 px-4 py-2"
														: `block px-4 py-2 ${dropdownHoverClass}`
												}
											>
												Profile
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/my-pets"
												className={({ isActive }) =>
													isActive
														? "block bg-gray-100 px-4 py-2"
														: `block px-4 py-2 ${dropdownHoverClass}`
												}
											>
												My Pets
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/favorite"
												className={({ isActive }) =>
													isActive
														? "block bg-gray-100 px-4 py-2"
														: `block px-4 py-2 ${dropdownHoverClass}`
												}
											>
												Favorite
											</NavLink>
										</li>
										<li>
											<div className="px-4 py-2">
												<label
													htmlFor="theme-select"
													className="mb-1 block text-sm text-gray-700 dark:text-gray-300"
												>
													Theme
												</label>
												<select
													id="theme-select"
													className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
													value={theme}
													onChange={(e) => {
														setTheme(e.target.value);
														toggleTheme(e.target.value);
													}}
												>
													<option value="light">Light</option>
													<option value="dark">Dark</option>
													<option value="default">Default</option>
												</select>
											</div>
										</li>
									</ul>
									<div className="py-1">
										<button
											onClick={() => {
												localStorage.removeItem("user");
												localStorage.removeItem("token");
												window.location.href = "/";
											}}
											className={`block w-full px-4 py-2 text-sm ${dropdownHoverClass}`}
										>
											Sign out
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="flex space-x-2">
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive
											? "block rounded bg-gray-500 px-3 py-2 text-white"
											: "block rounded bg-blue-500 px-3 py-2 text-white hover:bg-gray-500"
									}
								>
									Login
								</NavLink>
								<NavLink
									to="/register"
									className={({ isActive }) =>
										isActive
											? "block rounded bg-gray-500 px-3 py-2 text-white"
											: "block rounded bg-blue-500 px-3 py-2 text-white hover:bg-gray-500"
									}
								>
									Register
								</NavLink>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default UserNavbar;
