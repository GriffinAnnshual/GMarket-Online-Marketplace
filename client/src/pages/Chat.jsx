import { useState } from "react"
import "./../assets/styles/chat.css"
import Header from "../components/Header"
import { useParams } from "react-router-dom"
import prodcut_details from "../utils/product_details"
function App() {
    const {id} = useParams();
    const { name, category, seller} = prodcut_details[id]
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState("")
    const [bid, setbid] = useState("")
    const [newbid,setnewbid] = useState("- ");

    const handlebid = () =>{
        setnewbid(bid);
    }
	const handleSendMessage = () => {
		if (newMessage.trim() !== "") {
			setMessages([...messages, { text: newMessage, sender: "user" }])
			setNewMessage("")
		}
	}

	return (
		<div>
			<Header />
			<div className="main flex flex-col gap-4 bg-blue-500">
				<div className=" text-white font-bold font-montserrat text-4xl text-customBlue">
					Chat With Seller
				</div>
				<div className="text-slate-900 font-bold gap-4 flex flex-col justify-center text-center">
					<div className="text-3xl">{seller} is Live!</div>
					<div className="text-2xl">
						Category : {category} - {name}
					</div>
				</div>

				<div className="ChatContainer w-[40%] my-100">
					<div className="Chat">
						<div className="MessageList text-xl p-10 ">
							{messages.map((message, index) => (
								<div
									key={index}
									className={`Message ${message.sender} px-2`}>
									{message.text}
								</div>
							))}
						</div>
						<div className="border-t-2 border-black">
							<div className="p-5 flex gap-4 justify-evenly items-center">
								<div className="font-bold text-2xl">Current bid: {newbid}$</div>
								<input
									className="w-[40%] border-2 border-blue-200 bg-slate-300 h-14 px-2"
									type="text"
									value={bid}
									onChange={(e) => setbid(e.target.value)}
									placeholder="Enter bid value in $"
								/>
								<button
									className=" text-2xl h-[15%] w-[30%] bg-blue-400"
									onClick={handlebid}>
									Bid
								</button>
							</div>
							<div className=" flex items-center gap-4 InputContainer text-xl font-bold">
								<input
									className="w-[70%] border-2 border-blue-200 bg-slate-300 h-14 px-2"
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="Type your message..."
								/>
								<button
									className="h-[15%] w-[30%] bg-blue-400"
									onClick={handleSendMessage}>
									Send
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
