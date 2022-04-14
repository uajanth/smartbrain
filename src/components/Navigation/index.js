import React from "react";
import styles from "./style.module.css";

function Navigation(props) {
  return (
    <nav className={styles.nav}>
      <p className="f3 link dim black pa3 pointer">Sign Out</p>
    </nav>
  );
}

export default Navigation;
