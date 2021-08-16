import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "stats-js";
import TWEEN from "@tweenjs/tween.js";
import { displayCoards } from "./helper.js";
import settings from "./variables/settings";
import {addToScene} from "./sceneItems"
THREE.Cache.enabled = true;

const stats = new Stats();

let projectName = "loca";
let width = window.innerWidth;
let height = window.innerHeight;
// ----------------------------------------------> render
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  powerPreference: "high-performance",
  antialias: false,
});
renderer.setPixelRatio(settings.quality);
function render() {
  renderer.render(scene, camera);
  TWEEN.update();
}
// ----------------------------------------------> scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xaaaaaa);
// ----------------------------------------------> camera
const camera = new THREE.PerspectiveCamera(
  40, // fov = field of view
  width / height, // aspect ratio
  0.001, // near plane
  8000 // far plane
);
camera.position.set(0, 0, 8);

// ----------------------------------------------> controls
const controls = new OrbitControls(camera, renderer.domElement);
function setupControls(speed) {
  let ctrSpeed = speed || settings.ctrlSpeed;
  controls.zoomSpeed = ctrSpeed;
  controls.panSpeed = ctrSpeed;
  controls.rotateSpeed = ctrSpeed;

  controls.target = new THREE.Vector3(0, 1, 0);

  controls.maxDistance = settings.maxZoom;
  controls.minDistance = settings.minZoom;

  controls.maxPolarAngle = settings.maxPolarAngle;
  controls.minPolarAngle = settings.minPolarAngle;

  controls.autoRotate = settings.autoRotate;
  controls.autoRotateSpeed = settings.autoRotateSpeed;

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
}

function stopTweenAnimation() {
  TWEEN.removeAll();
}

controls.addEventListener("start", stopTweenAnimation);
// ----------------------------------------------> resize
const handleWindowResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
// ----------------------------------------------> setup
const sceneSetup = (root, theprojectName) => {
  projectName = theprojectName;
  renderer.setSize(width, height);
  root.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize);
  if (settings.developmentModel) {
    displayCoards();
  }
  setupControls();
  if (settings.developmentModel) {
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
  }
  addToScene()
};

function setProjectName(newprojectName) {
  projectName = newprojectName;
}

export {
  sceneSetup,
  scene,
  controls,
  render,
  camera,
  stats,
  projectName,
  setProjectName,
};
