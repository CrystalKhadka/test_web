import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import MyPetList from "./pages/Admin/MyPet/PetList.jsx/MyPetList";
import UpdatePet from "./pages/Admin/MyPet/UpdatePet/UpdatePet";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Test from "./pages/Test/Test";
import UserDashboard from "./pages/User/Dashboard/UserDashboard";
import PetList from "./pages/User/PetList/PetList";
import AdminRoutes from "./protected/Admin/AdminRoutes";
import UserRoutes from "./protected/User/UserRoutes";
import { ThemeProvider } from "./theme/ThemeContext/ThemeContext";

function App() {
	return (
		<ThemeProvider>
			<Router>
				<Navbar />
				<ToastContainer />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />

					<Route element={<UserRoutes />}>
						<Route path="/user/dashboard" element={<UserDashboard />} />
						<Route path="/user/pet/list" element={<PetList />} />
					</Route>

					{/* Owner Routes */}
					<Route element={<AdminRoutes />}>
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
						<Route path="/admin/myPet/list" element={<MyPetList />} />
						<Route path="/admin/myPet/edit/:id" element={<UpdatePet />} />
					</Route>

					{/* Test routes */}
					<Route path="/test" element={<Test />} />
				</Routes>
				{/* <Footer /> */}
			</Router>
		</ThemeProvider>
	);
}

export default App;
