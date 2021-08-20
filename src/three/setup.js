import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { displayCoards } from "./helper.js";
import settings from "./variables/settings.js";
import Stats from "stats-js";
import {addToScene} from "./sceneItems"
import {ARButton} from "./ARButton"

THREE.Cache.enabled = true;

const stats = new Stats();

// For 100% width&Height
let width = window.innerWidth;
let height = window.innerHeight;
// ----------------------------------------------> render
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  powerPreference: "high-performance",
  antialias: settings.enableAntialias,
  logarithmicDepthBuffer:false,
  
});
renderer.setPixelRatio(settings.quality);

function render() {
  renderer.render(scene, camera);
}

// ----------------------------------------------> scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x000000);

// ----------------------------------------------> camera
const camera = new THREE.PerspectiveCamera(
  40, // fov = field of view
  width / height, // aspect ratio
  0.001, // near plane
  80000 // far plane
);
camera.position.set(35, 16, 30);

// ----------------------------------------------> controls
const controls = new OrbitControls(camera, renderer.domElement);
function setupControls() {
  controls.target = new THREE.Vector3(0, 6, 0);
  const{ctrlSpeed ,maxZoom,minZoom,maxPolarAngle,minPolarAngle,autoRotate,autoRotateSpeed,enableDamping,dampingFactor}=settings

  controls.zoomSpeed = ctrlSpeed;
  controls.panSpeed = ctrlSpeed;
  controls.rotateSpeed = ctrlSpeed;

  controls.maxDistance = maxZoom;
  controls.minDistance = minZoom;

  controls.maxPolarAngle = maxPolarAngle;
  controls.minPolarAngle = minPolarAngle;

  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = autoRotateSpeed;

  controls.enableDamping = enableDamping;
  controls.dampingFactor =dampingFactor;
}

// ----------------------------------------------> resize
const handleWindowResize = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

// ----------------------------------------------> setup
const sceneSetup = (root) => {
  renderer.setSize(width, height);
  renderer.xr.enabled=true
  new ARButton(renderer)
  root.appendChild(renderer.domElement);
  window.addEventListener("resize", handleWindowResize);

  if (settings.developmentModel) {
    displayCoards(100,100);
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
  }

  setupControls();
  addToScene()
};

export {
  sceneSetup,
  scene,
  controls,
  render,
  renderer,
  camera,
  stats,
};