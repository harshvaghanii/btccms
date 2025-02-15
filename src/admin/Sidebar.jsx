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
                <li><Link to="/admin/projects">Manage Projects</Link></li>
                <li><Link to="/admin/projects/add">Add Project</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
