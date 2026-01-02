import icon from "./chef.png"
import React from "react";
export default function Header() {
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.sub;
    } catch {}
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="header">
      <img src={icon} alt="logo" className="logo-image" />
      <div className="logo"> Chef Claude</div>

      {token && (
        <div className="header-right">
          <span>Hi, User {userId}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
