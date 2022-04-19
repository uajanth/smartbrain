import React from "react";
import "./styles.css";

function FaceRecognition(props) {
  const { box, imageUrl } = props;
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imageUrl}
          alt={""}
          width={500}
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
