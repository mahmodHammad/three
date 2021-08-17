import * as THREE from "three";
import { scene ,render,renderer} from "./setup";


import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const hdrbg = require("./HDR/bush_restaurant_2k.hdr")


function setHDRLighting(){
    new RGBELoader()
    .setDataType( THREE.UnsignedByteType ) // alt: FloatType, HalfFloatType
    .load( hdrbg, function ( texture, textureData ) {
      var envMap = pmremGenerator.fromEquirectangular( texture ).texture;
      // scene.background = envMap;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
      render();
    } );
    var pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();
  }

export {setHDRLighting}