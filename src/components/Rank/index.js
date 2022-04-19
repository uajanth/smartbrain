import React from "react";

function Rank(props) {
  const { name, entries } = props;
  return (
    <div>
      <div className="black f3">{`${name}, your current entry count is...`}</div>
      <div className="black f1" style={{ textAlign: "center" }}>
        {entries}
      </div>
    </div>
  );
}

export default Rank;
