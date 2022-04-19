import React from "react";
import "./styles.css";

function Navigation(props) {
  const { isSignedIn, onRouteChange } = props;
  if (isSignedIn) {
    return (
      <nav>
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim black pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else if (!isSignedIn) {
    return (
      <nav>
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
}

export default Navigation;
