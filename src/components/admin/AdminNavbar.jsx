// src/components/AdminNavbar/AdminNavbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../theme/ThemeContext/ThemeContext";

const AdminNavbar = () => {
	const { toggleTheme } = useTheme();
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "default",
	);
	const user = JSON.parse(localStorage.getItem("user"));

	const activeLinkClass = ({ isActive }) =>
		isActive
			? "block rounded bg-gray-700 px-4 py-2 text-white"
			: "block rounded px-4 py-2 text-gray-700 hover:bg-gray-700";

	return (
		<div className="sidebar">
			<button
				data-drawer-target="sidebar-multi-level-sidebar"
				data-drawer-toggle="sidebar-multi-level-sidebar"
				aria-controls="sidebar-multi-level-sidebar"
				type="button"
				className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="h-6 w-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
					></path>
				</svg>
			</button>
			<aside
				id="sidebar-multi-level-sidebar"
				className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full w-64 bg-gray-100 text-black dark:bg-gray-800 dark:text-white ">
					<div className="flex h-full flex-col justify-between p-6">
						<h1 className="mb-6 text-center text-2xl font-semibold">
							Pet Owner Dashboard
						</h1>
						<div className="flex flex-col space-y-4 ">
							<NavLink to="/admin/dashboard" className={activeLinkClass}>
								Dashboard
							</NavLink>
							<NavLink to="/admin/myPet/list" className={activeLinkClass}>
								Pet Profile Management
							</NavLink>
							<NavLink to="/pet/adopted" className={activeLinkClass}>
								Adopted Pets
							</NavLink>
							<NavLink to="/pet/applications" className={activeLinkClass}>
								Adoption Applications
							</NavLink>
							<NavLink to="/chat" className={activeLinkClass}>
								Messaging
							</NavLink>
						</div>
						<div className="relative">
							<button
								id="dropdownNavbarLink"
								className="flex w-full items-center justify-between px-3 py-2 text-black dark:text-white"
								onClick={() =>
									document
										.getElementById("dropdownNavbar")
										.classList.toggle("hidden")
								}
							>
								{user.firstName}
								<svg
									className="ml-2.5 h-2.5 w-2.5"
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
								className="z-10 hidden divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
							>
								<ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
									<li>
										<NavLink
											to="/profile"
											className={({ isActive }) =>
												isActive
													? "block bg-gray-100 px-4 py-2"
													: "block px-4 py-2 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600"
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
													: "block px-4 py-2 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600"
											}
										>
											My Pets
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/settings"
											className={({ isActive }) =>
												isActive
													? "block bg-gray-100 px-4 py-2"
													: "block px-4 py-2 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-600"
											}
										>
											Settings
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
											window.location.reload();
										}}
										className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
									>
										Sign out
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</aside>
		</div>
	);
};

export default AdminNavbar;
