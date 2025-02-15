// src/admin/AdminDashboard.js
import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };

    return (
        <div>
            <h2>Welcome to the Admin Panel</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
