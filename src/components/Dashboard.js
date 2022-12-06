import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    let navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch {
            console.log("failed to logout")
        }
    }

  return (
   <div>
     <div>Dashboard</div>
        <p>Dasboard page</p>
        <p>User email: { currentUser && currentUser.email }</p>
        <Link to="/update-profile">Update profile</Link>
        <button onClick={handleLogout}>Log out</button>
   </div>
  )
}
