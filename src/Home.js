import React, { useState, useEffect, useRef } from "react";
import { sceneSetup, scene } from "./three/setup";
import { startAnimationLoop } from "./three/Animate";

export default function Cat({ handleFullScreen }) {
  const textInput = useRef(null);

  useEffect(() => {
    const canvasTarget = textInput.current;
    sceneSetup(canvasTarget);
    startAnimationLoop();
  }, []);

  return (
    <React.Fragment>
      <div ref={textInput} className="canvas"></div>
    </React.Fragment>
  );
}
