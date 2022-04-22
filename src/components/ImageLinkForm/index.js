import React from "react";
import "./styles.css";

function ImageLinkForm(props) {
  const { onInputChange, onImageDetect } = props;
  return (
    <div>
      <p className="f3">
        {"Enter the url of an image to detect faces in the picture"}
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            className="f4 ps2 w-70 center"
            type="text"
            onChange={onInputChange}
          ></input>
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-blue"
            type="submit"
            onClick={onImageDetect}
          >
            {"Detect"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
