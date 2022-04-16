import React from "react";
import "./styles.css";

function Navigation(props) {
  if (props.isSignedIn) {
    return (
      <nav>
        <p
          onClick={() => props.onRouteChange("signout")}
          className="f3 link dim black pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else if (!props.isSignedIn) {
    return (
      <nav>
        <p
          onClick={() => props.onRouteChange("signin")}
          className="f3 link dim black pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => props.onRouteChange("register")}
          className="f3 link dim black pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
}

export default Navigation;
