import React from "react";
import "./styles.css";

function FaceRecognition(props) {
  const { boxes, imageUrl } = props;
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
        {boxes
          ? boxes.map((box, index) => {
              return (
                <div
                  key={index}
                  className="bounding-box"
                  style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                  }}
                ></div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default FaceRecognition;
