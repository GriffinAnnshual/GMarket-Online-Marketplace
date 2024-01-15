import { useSelector, useDispatch } from "react-redux"
import {setEmailVerified} from "../store/reducers/userReducer"
const VerifyMail = () => {
  const dispatch = useDispatch();
  const handleClick = () =>{
	dispatch(setEmailVerified(true))
  }
  const emailVerified = useSelector((state)=> state.user.emailVerified)
  console.log(emailVerified)
  return (
		<>   
			<div>Check your mail</div>
			<p>Email Verified: {emailVerified}</p>
			<button onClick={handleClick}>
				Set verified
			</button>
		</>
	)
}

export default VerifyMail