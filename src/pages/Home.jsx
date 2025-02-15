import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container">
            <h1>Welcome to BTC CMS</h1>
            <p>Your centralized management system.</p>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <Link to="/admin">
                <button style={{ backgroundColor: "green", marginTop: "10px" }}>
                    Admin Dashboard
                </button>
            </Link>
        </div>
    );
}

export default Home;
