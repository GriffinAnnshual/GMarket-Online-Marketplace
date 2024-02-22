import { useEffect, useState } from "react"
import { Navigate} from 'react-router-dom'
import axios from 'axios'
function CheckoutReturn() {
    const [status, setStatus] = useState(null)
    const [customerEmail, setCustomerEmail] = useState("")

    useEffect(() => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const sessionId = urlParams.get("session_id")
        const getCustomer = async () => {
        await axios
        .get(`http://localhost:3000/session-status?session_id=${sessionId}`)
        .then((res) => {
            setStatus(res.data.status)
            setCustomerEmail(res.data.customer_email)
        })
        }
        getCustomer();
    }, [])

  if (status === 'open') {
    return (
      <Navigate to="/payment-form" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}


export default CheckoutReturn