import "./App.css";
import React, { useState } from "react";
import Particles from "react-tsparticles";
import { tsParticles } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Navigation from "./components/Navigation/index";
import Logo from "./components/Logo/index";
import Rank from "./components/Rank/index";
import ImageLinkForm from "./components/ImageLinkForm/index";
import FaceRecognition from "./components/FaceRecognition/index";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedin] = useState(false);
  const [user, setUser] = useState({
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
    },
  });

  const resetState = () => {
    setInput("");
    setImageUrl("");
    setBoxes("");
    setRoute("signin");
    setIsSignedin(false);
    setUser({
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    });
  };

  const loadUser = (data) => {
    setUser({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    const clarifaiFaces = data.outputs[0].data.regions;

    clarifaiFaces.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  const displayFaceBox = (boxes) => {
    setBoxes(boxes);
  };

  const onImageDetect = () => {
    setBoxes([]);
    setImageUrl(input);
    fetch("https://uajanth-smartbrain-api.herokuapp.com/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    })
      .then((response) => response.json())
      .then(function (response) {
        if (response) {
          fetch("https://uajanth-smartbrain-api.herokuapp.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user.user),
          })
            .then((response) => response.json())
            .then((user) => setUser({ user: user }))
            .catch((err) => console.log(err));
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });

    setUser((prevState) => prevState);
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedin(false);
      resetState();
    } else if (route === "home") {
      setIsSignedin(true);
    }
    setRoute(route);
  };

  const particlesInit = async (main) => {
    await loadFull(tsParticles);
  };

  return (
    <div>
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        options={{
          fps_limit: 60,
          interactivity: {
            detect_on: "canvas",
            events: {
              onclick: { enable: true, mode: "push" },
              onhover: {
                enable: true,
                mode: "attract",
                parallax: { enable: false, force: 60, smooth: 10 },
              },
              resize: true,
            },
            modes: {
              push: { quantity: 4 },
              attract: { distance: 200, duration: 0.4, factor: 5 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            line_linked: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
              bounce: false,
              direction: "none",
              enable: true,
              out_mode: "out",
              random: false,
              speed: 2,
              straight: false,
            },
            number: { density: { enable: true, value_area: 800 }, value: 120 },
            opacity: {
              anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
              random: false,
              value: 0.5,
            },
            shape: {
              character: {
                fill: false,
                font: "Verdana",
                style: "",
                value: "*",
                weight: "400",
              },
              image: {
                height: 100,
                replace_color: true,
                src: "images/github.svg",
                width: 100,
              },
              polygon: { nb_sides: 5 },
              stroke: { color: "#000000", width: 0 },
              type: "circle",
            },
            size: {
              anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
              random: true,
              value: 5,
            },
          },
          polygon: {
            draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
            move: { radius: 10 },
            scale: 1,
            type: "none",
            url: "",
          },
          retina_detect: true,
        }}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      <Logo />
      {route === "register" && (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
      {route === "signin" || route === "signout" ? (
        <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        ""
      )}
      {route === "home" && (
        <React.Fragment>
          <Rank name={user.user.name} entries={user.user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onImageDetect={onImageDetect}
          />
          <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
