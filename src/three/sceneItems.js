import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
import {makeTextSprite} from "./drawText"
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "threejs-meshline";

import wheel from "./models/wheel.glb"
let model= undefined

function AddLine(start, end, color = "#000000") {
  const LinesGroup = new THREE.Group();
  const material = new MeshLineMaterial({
    lineWidth: 0.01,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    color: new THREE.Color(color),
    sizeAttenuation : true
  });
  const line = new MeshLine();

  line.setVertices([new THREE.Vector3(0,0,0),new THREE.Vector3(10,10,10)]);
  let mesh = new THREE.Mesh(line, material);
  LinesGroup.add(mesh);
  
  return mesh;

}

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
    var text2d = makeTextSprite(
      "Hello",
      "#333",
      "#FFEA00dd",
      [5, 2],
      "bold",
      1.5,
      "#fffe",
      "target",
       100
    );
    text2d.position.set(10,10,0)
    scene.add(text2d)
    console.log(model)
    model.position.set(0, 0, 0)
    scene.add(model)
  }
  )
 let line =  AddLine( new THREE.Vector3(0,0,0), new THREE.Vector3(20,2,2))
  console.log("LL",line)
 
  scene.add(line)
};

export { addToScene,model };
