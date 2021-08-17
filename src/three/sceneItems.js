import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
import {makeTextSprite} from "./drawText"
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "threejs-meshline";

import wheel from "./models/table.glb"
let model= undefined

function AddLine(start, end, color = "#000000") {
  const material = new MeshLineMaterial({
    lineWidth: 0.1,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    color: new THREE.Color(color),
    sizeAttenuation : true
  });
  const line = new MeshLine();
  const LinesGroup = new THREE.Group();

  line.setVertices([start, end]);
  let mesh = new THREE.Mesh(line, material);
  LinesGroup.add(mesh);

  return LinesGroup;

}

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.9);
  let lightBack = new THREE.SpotLight(0xff9900, 0.6);
  let lightFront = new THREE.SpotLight(0x00ffff, 0.8);
  let PointLight = new THREE.PointLight(0xffffff, 1);
  lightBack.position.set(2, 50, -7);
  lightFront.position.set(-2, -30, 7);
  PointLight.position.set(10, 0, 20);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);
  scene.add(PointLight)
}

// Any thing will be added to scene should be done here
const addToScene = () => {
  addLights();
  loadModel(wheel).then(glb=>{
    model = glb
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
    model.scale.set(0.001,0.001,0.001)
    scene.add(model)
  }
  )


  var labelsGroup = new THREE.Group();
  labelsGroup.name = "arrows";
 let line =  AddLine( new THREE.Vector3(0,0,0), new THREE.Vector3(20,2,2),"#333",[])
  console.log("LL",line)
 
  labelsGroup.add(line)
  scene.add(labelsGroup)
};

export { addToScene,model };
