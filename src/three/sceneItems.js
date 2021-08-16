import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.9);
  let lightBack = new THREE.SpotLight(0xffffff, 0.2);
  let lightFront = new THREE.SpotLight(0xffffff, 0.2);
  lightBack.position.set(2, 50, -7);
  lightFront.position.set(-2, -30, 7);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);
}

function addBox(position){
  const box = new THREE.BoxGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial({color:0xff00ff})
  const mesh = new THREE.Mesh(box,material)
  mesh.position.fromArray(position)
  scene.add(mesh)
}

// Any thing will be added to scene should be done here
const addToScene = () => {
  addLights();

  // Testing boxes
  addBox([1,4,0])
  addBox([1,0,0])
  addBox([4,0,0])
  addBox([0,0,4])
  addBox([0,4,4])
    
};

export { addToScene };
