/* eslint-disable react/prop-types */

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import EditProfile from "../components/EditProfile"
import Footer from "../components/Footer"
import ViewProfile from "../components/ViewProfile"

function Dashboard(props) {
  const {page} = props
  return (
		<div className="w-screen h-screen">
			<Header />
			<div className="flex">
				<Sidebar />
				{page == "edit" && <EditProfile />}
				{page === "profile" && <ViewProfile/>}
			</div>
      <Footer/>
		</div>
	)
}

export default Dashboard