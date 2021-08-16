import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
import wheel from "./models/wheel.glb"
let model= undefined

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 1);
  let lightBack = new THREE.SpotLight(0xffffff, 0.2);
  let lightFront = new THREE.SpotLight(0xffffff, 0.2);
  let PointLight = new THREE.PointLight(0xffffff, 0.9);
  lightBack.position.set(2, 50, -7);
  lightFront.position.set(-2, -30, 7);
  PointLight.position.set(10, 0, 20);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);
  scene.add(PointLight)
}

function addBox(position){
  const box = new THREE.BoxGeometry(4*Math.random(),4*Math.random(),4*Math.random())
  const material = new THREE.MeshStandardMaterial({color:0xffffff*Math.random()})
  const mesh = new THREE.Mesh(box,material)
  mesh.position.fromArray(position)
  scene.add(mesh)
}

// Any thing will be added to scene should be done here
const addToScene = () => {
  addLights();
  loadModel(wheel).then(glb=>{
    model = glb.getChildByName("Cube")
    console.log(model)
    model.position.set(0, 0, 0)
    scene.add(model)
  }
  )
    
};

export { addToScene,model };
