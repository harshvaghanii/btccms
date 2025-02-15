import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChange } from "../firebase/auth";

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChange((authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
