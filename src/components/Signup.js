import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError("The passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch(error) {
            setError("Failed to create an account.");
            setLoading(false);
        }

        
    }

  return (
    <div className="sign-up__card">
        <div className="card">
            <h2>Sign up form</h2>
            {error && <div> { error } </div>}
            <form onSubmit={handleSubmit}>
                <div className="field-grp">
                    <label>Email</label>
                    <input type="text" ref={emailRef} />
                </div>
                <div className="field-grp">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} />
                </div>
                <div className="field-grp">
                    <label>Password confirmation</label>
                    <input type="password" ref={passwordConfirmationRef} />
                </div>
                <button disabled={loading} className="submit-btn" type="submit">Sign up</button>
            </form>
        </div>
        <div className="notice">
            Already have an account? <Link to="/login">Log in</Link>
        </div>

    </div>
  )
}
