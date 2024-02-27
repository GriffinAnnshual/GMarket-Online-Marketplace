
import selling from '../assets/images/selling-pic.png'
function PostListing() {
    const post  = ""
  return (
		<div className="w-[100%] h-screen flex justify-center">
			<div className="flex justify-center">
				{post == "" && (
					<div className="">
						<img
							src={selling}
							className="w-40 mt-20 mx-auto"></img>
						<div className="text-center mt-2">
							<b>{"You haven't listed anything yet"}</b>

							<p className="pt-2">{" Let go of what you don't use anymore"}</p>
						</div>
						<div className="w-full py-2 hover:bg-gray-700 hover:text-white font-bold text-center rounded-md my-4 border-2 border-black  cursor-pointer flex items-center justify-center  ">
							Start Selling
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default PostListing