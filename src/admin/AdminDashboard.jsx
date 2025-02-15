import React from "react";
import { Routes, Route } from "react-router-dom";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import TeamManagement from "./TeamManagement";
import AddEditTeamMember from "./AddEditTeamMember";

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="admin-container">
            <Sidebar />
            <div className="main-content">
                <Header onLogout={handleLogout} />
                <div className="dashboard-content">
                    <Routes>
                        {/* ✅ Remove `/admin` from paths since it's already handled in `App.js` */}
                        <Route path="/" element={<h3>Welcome, Admin! Select an option from the sidebar.</h3>} />
                        <Route path="team" element={<TeamManagement />} />
                        <Route path="team/add" element={<AddEditTeamMember />} />
                        <Route path="team/edit/:id" element={<AddEditTeamMember />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
