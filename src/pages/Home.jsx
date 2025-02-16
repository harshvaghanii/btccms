import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChange } from "../firebase/auth";

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChange((authUser) => {
            if (authUser) {
                navigate("/admin");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

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
