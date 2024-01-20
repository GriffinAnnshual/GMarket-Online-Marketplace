import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VerifyMail from './pages/VerifyMail'
import ProductDetails from './pages/ProductDetails'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Cart from './pages/Cart';

function App() {
  return (
		<Router>
			<Routes>
				<Route
					exact
					path="/"
					element={<Home />}>
					{" "}
				</Route>
				<Route
					exact
					path="/signup"
					element={<Signup />}>
					{" "}
				</Route>
				<Route
					exact
					path="/login"
					element={<Login />}>
					{" "}
				</Route>
				<Route
					exact
					path="/product/:id"
					element={<ProductDetails />}
				/>
				<Route
					exact
					path="/cart"
					element={<Cart />}
				/>
				<Route
				path="/email/verification"
				exact
				element={<VerifyMail/>}
				/>
			</Routes>
			<ToastContainer
				className="w-[60%] h-[10%] md:w-[30%] md:whitespace-nowrap md:h-[10%]"
				autoClose={1500}
				position='top-center'
				hideProgressBar={true}
				newestOnTop={true}
				theme="light"
				/>
		</Router>
	)
}

export default App