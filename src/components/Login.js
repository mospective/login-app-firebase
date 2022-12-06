import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch(error) {
            setError("Failed to log in.");
            setLoading(false);
        }
        
    }

  return (
    <div className="sign-up__card">
      <div className="card">
        <h2>Login form</h2>
        {error && <div> {error} </div>}
        {loading ? (
          <div>loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="field-grp">
              <label>Email</label>
              <input type="text" ref={emailRef} />
            </div>
            <div className="field-grp">
              <label>Password</label>
              <input type="password" ref={passwordRef} />
            </div>
            <button disabled={loading} className="submit-btn" type="submit">
              Login
            </button>
          </form>
        )}
      </div>
      <div className="notice">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
