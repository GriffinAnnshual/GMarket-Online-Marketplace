import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Chat from './pages/Chat';
import VerifyMail from './pages/VerifyMail'
import ProductDetails from './pages/ProductDetails'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

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
					path="/chat/:id"
					element={<Chat />}
				/>
				<Route
				path="/email/verification"
				exact
				element={<VerifyMail/>}
				/>
			</Routes>
			<ToastContainer />
		</Router>
	)
}

export default App