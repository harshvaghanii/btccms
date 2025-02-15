import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
    return (
        <div>
            <nav style={{ padding: "10px", background: "#f8f8f8" }}>
                <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
                <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
                <Link to="/admin">Admin</Link>
            </nav>
            <main>{children}</main>
        </div>
    );
}

export default Layout;
