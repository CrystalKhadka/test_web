/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import AdminNavbar from "./admin/AdminNavbar";
import UserNavbar from "./user/UserNavbar";

const Navbar = () => {
	const user = JSON.parse(localStorage.getItem("user"));

	return user && user.role === "owner" ? <AdminNavbar /> : <UserNavbar />;
};

export default Navbar;
