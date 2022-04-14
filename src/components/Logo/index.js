import React from "react";
import "./styles.css";
import logo from "./logo.png";
import Tilt from "react-tilt";

function Logo() {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img className="pa2" src={logo} alt="brain-user-logo" />
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
