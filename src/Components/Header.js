import React from "react";
import icon from "../Components/chef.png"

export default function Header() {
  return (
    <>
      <header className="head">
        <img src={icon} alt="logo" />
        <h1 className="head">Chef Claude</h1>
      </header>
    </>
  );
}
