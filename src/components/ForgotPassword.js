import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch(error) {
            setError("Failed to reset password");
            setLoading(false);
        }
        
    }

  return (
    <div className="sign-up__card">
      <div className="card">
        <h2>Password reset</h2>
        {error && <div> {error} </div>}
        {message && <div> {message} </div>}
          <form onSubmit={handleSubmit}>
            <div className="field-grp">
              <label>Email</label>
              <input type="text" ref={emailRef} />
            </div>
            <button disabled={loading} className="submit-btn" type="submit">
              Reset password
            </button>
          </form>
          <div className="forgot-password">
            <Link to="/login">Log in</Link>
          </div>
      </div>
      <div className="notice">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
