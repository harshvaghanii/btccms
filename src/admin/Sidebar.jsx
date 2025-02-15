import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Panel</h2>
            <ul>
                <li><Link to="/admin">Dashboard</Link></li>
                <li><Link to="/admin/team">Manage Team</Link></li>
                <li><Link to="/admin/team/add">Add Team Member</Link></li>
                {/* Future: Add project management links here */}
            </ul>
        </div>
    );
};

export default Sidebar;
