import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { currentUser, updateEmailProfile, updatePasswordProfile } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
            return setError("The passwords do not match");
        }

        const promises = [];
        setError("");
        setLoading(true);
        
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmailProfile(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatePasswordProfile(passwordRef.current.value));
        }

        Promise.all(promises)
        .then(() => {
            navigate("/");
        }).catch(() => {
            setError("Unable to update your profile");
        }).finally(() => {
            setLoading(false);
        });        
    }

  return (
    <div className="sign-up__card">
        <div className="card">
            <h2>Profile</h2>
            {error && <div> { error } </div>}
            <form onSubmit={handleSubmit}>
                <div className="field-grp">
                    <label>Email</label>
                    <input type="text" ref={emailRef} defaultValue={currentUser.email}/>
                </div>
                <div className="field-grp">
                    <label>Password</label>
                    <input type="password" ref={passwordRef} placeholder="leave blank to keep the same" />
                </div>
                <div className="field-grp">
                    <label>Password confirmation</label>
                    <input type="password" ref={passwordConfirmationRef} placeholder="leave blank to keep the same"/>
                </div>
                <button disabled={loading} className="submit-btn" type="submit">Update profile</button>
            </form>
        </div>
        <div className="notice">
            <Link to="/">Cancel</Link>
        </div>
    </div>
  )
}
