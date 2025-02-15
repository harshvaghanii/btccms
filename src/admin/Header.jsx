import React from "react";

const Header = ({ onLogout }) => {
  return (
    <div className="header">
      <h2>Admin Dashboard</h2>
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Header;
