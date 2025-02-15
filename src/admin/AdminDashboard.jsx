import React from "react";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! Manage your content here.</p>
            <button onClick={handleLogout} style={{ backgroundColor: "red" }}>
                Logout
            </button>
        </div>
    );
}

export default AdminDashboard;
