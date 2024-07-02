import React from "react";
import { FaFacebookF, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
	const handleEmailClick = () => {
		toast.success("Email copied to clipboard");
	};
	const user = JSON.parse(localStorage.getItem("user"));
	return user?.role === "owner" ? (
		<></>
	) : (
		<>
			<footer className=" bottom-0 w-full bg-gray-800 py-6 text-white">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-evenly gap-4">
						<div className="md:col-span-1">
							<div className="flex items-center">
								<h3 className="text-lg font-bold">Pet Connect</h3>
							</div>
							<p className="text-sm">Swipe. Adopt. Love.</p>
						</div>
						<div className="md:col-span-1">
							<span className="mb-2 block text-lg font-bold">Help</span>
							<a href="/terms" className="mb-1 block text-sm">
								Terms & Conditions
							</a>
							<a href="/privacy" className="mb-1 block text-sm">
								Privacy Policy
							</a>
						</div>
						<div className="md:col-span-1">
							<span className="mb-2 block text-lg font-bold">Contact Us</span>
							<span
								className="mb-1 block cursor-pointer text-sm"
								onClick={handleEmailClick}
							>
								khadkacrystal@gmail.com
							</span>
							<div className="flex flex-wrap space-x-6">
								<Link
									to="https://www.instagram.com/khadkacrystal/?hl=en"
									className="mr-2"
								>
									<FaInstagram className="text-lg text-white" />
								</Link>
								<Link
									to="https://www.facebook.com/crystal.khadka/"
									className="mr-2"
								>
									<FaFacebookF className="text-lg text-white" />
								</Link>
								<Link to="https://github.com/CrystalKhadka">
									<FaGithub className="text-lg text-white" />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
