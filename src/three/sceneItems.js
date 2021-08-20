import * as THREE from "three";
import { scene } from "./setup";
import { loadModel } from "./ModelLoader";
import {makeTextSprite} from "./drawText"
import {setHDRLighting} from "./panorama"
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "threejs-meshline";

import wheel from "./models/table.glb"
let model= undefined

function addLights() {
  const amplight = new THREE.AmbientLight("#ffffff", 0.2);
  let lightBack = new THREE.SpotLight(0xff9900, 0.2);
  let lightFront = new THREE.SpotLight(0x00ffff, 0.2);
  let PointLight = new THREE.PointLight(0xffffff, 0.2);
  lightBack.position.set(2, 50, -7);
  lightFront.position.set(-2, -30, 7);
  PointLight.position.set(10, 0, 20);

  scene.add(amplight);
  scene.add(lightBack);
  scene.add(lightFront);
  scene.add(PointLight)
}

function AddLine(start, end, color = "#000000") {
  const material = new MeshLineMaterial({
    lineWidth: 0.07,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    color: new THREE.Color(color),
    sizeAttenuation : true
  });
  const line = new MeshLine();
  line.setVertices([start, end]);

  return  new THREE.Mesh(line, material);;
}

function addAnnotation(targets, name){
 let test = [
   {start:[0,8,0],end:[5,13,2],color:"#f94",name:"Table"},
   {start:[-13,5,0],end:[-12,10,1],color:"#f94",name:"Chair"},
]
 test.forEach(target => {
    let { start, end,color,name } =target
    start = new THREE.Vector3().fromArray(start)
    end = new THREE.Vector3().fromArray(end)
    let line = AddLine(
      end,
      start,
      color,
    );

    let lable = addLable(end,target);
    var annotation = new THREE.Group();
    annotation.name = name;

    annotation.add(lable);
    annotation.add(line);

    // labelsGroup.add(renderTextLabel);
  //   // renderedItem.label = renderTextLabel;
  //   indexGroupParent.add(indexGroup);
  //   labelsGroup.add(indexGroupParent);
  scene.add(annotation)
  });
  // return "hi";
}


function addLable({x,y,z},target){
  var text2d = makeTextSprite(
    target.name,
    target.color,
    "#333a",
    [12, 4],
    "bold",
    1.5,
    target.color,
    "target",
     50
  );
  text2d.position.set(x , y+0.7 , z)
  return text2d
}

// Any thing will be added to scene should be done here
const addToScene = () => {
  addLights();
  addAnnotation()
  setHDRLighting()
  loadModel(wheel).then(glb=>{
    model = glb
    console.log(model)
    model.position.set(0, 0, 0)
    model.scale.set(0.0007,0.0007,0.0007)
    scene.add(model)
  }
  )
};

export { addToScene,model };
