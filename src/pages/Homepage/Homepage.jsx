import React from "react";
import { Link, Navigate } from "react-router-dom";

const Homepage = () => {
	const user = JSON.parse(localStorage.getItem("user"));

	return user ? (
		user.role === "owner" ? (
			<Navigate to="/admin/dashboard" />
		) : (
			<Navigate to="/user/dashboard" />
		)
	) : (
		<>
			<div className="bg-[url('../public/assets/images/bg.png')] bg-cover bg-center bg-no-repeat">
				<div className="container mx-auto flex min-h-screen flex-col justify-center py-12 sm:px-4 lg:px-8">
					{/* Hero Section */}
					<div className="hero-section py-32 text-center">
						<div className="container mx-auto px-4">
							<h1 className="mb-4 text-5xl font-bold md:text-7xl">
								Find Your Perfect Pet
							</h1>
							<p className="mb-8 text-xl md:text-3xl">
								Adopt a furry friend today and make a difference!
							</p>
							<Link
								className="btn btn-primary rounded bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-700"
								to="/login"
							>
								Get Started
							</Link>
						</div>
					</div>
					{/* About Section */}
					<div className="about-section py-20">
						<div className="container mx-auto px-4 text-center">
							<h2 className="mb-6 text-4xl font-bold">About PetConnect</h2>
							<p className="mb-10 text-xl">
								PetConnect is designed to simplify the pet adoption process by
								using location-based searching. It connects potential adopters
								with nearby pet owners or shelters, making the process more
								accessible. With features like pet browsing, messaging, and user
								profiles, it aims to create a better experience for both
								adopters and owners.
							</p>
							<p className="mb-10 text-xl">
								Our mission is to promote responsible pet ownership and reduce
								pet overpopulation in shelters. By leveraging technology and
								innovation, we strive to create a more accessible and efficient
								platform for connecting pets with loving homes.
							</p>
						</div>
					</div>
					{/* Contact Section */}
					<div className="contact-section bg-cover bg-center py-20">
						<div className="container z-10 mx-auto px-4">
							<h2 className="mb-6 text-4xl font-bold">Contact Us</h2>
							<p className="mb-10 text-xl">
								Have questions or feedback? Reach out to us!
							</p>
							<form className="mx-auto max-w-lg">
								<div className="mb-6">
									<input
										type="text"
										name="name"
										placeholder="Your Name"
										className="w-full rounded border p-3"
									/>
								</div>
								<div className="mb-6">
									<input
										type="email"
										name="email"
										placeholder="Your Email"
										className="w-full rounded border p-3"
									/>
								</div>
								<div className="mb-6">
									<textarea
										name="message"
										placeholder="Your Message"
										className="w-full rounded border p-3"
									></textarea>
								</div>
								<button
									type="submit"
									className="btn btn-primary rounded bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-700"
								>
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Homepage;
