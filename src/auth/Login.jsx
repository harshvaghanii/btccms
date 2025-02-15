// // src/auth/Login.js
// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             navigate("/admin"); // Redirect to admin panel
//         } catch (err) {
//             setError("Invalid credentials. Please try again.");
//         }
//     };

//     return (
//         <div className="login-container">
//             <h2>Admin Login</h2>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;


import React from 'react'

const Login = () => {
    return (
        <div>Login</div>
    )
}

export default Login