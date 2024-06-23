import React, { useRef } from "react";
import { useLoader , useFrame} from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';

const BackGroundImage = ({Pos,Scale}) => {
    
    const myMesh = useRef();
    const myMesh2 = useRef();
    
    const texture = useLoader(TextureLoader, 'image/background.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio = texture.image.width / texture.image.height;
    Scale[0] = Scale[0] * aspectRatio;

    const texture2 = useLoader(TextureLoader, 'image/background.png');
    texture2.colorSpace = THREE.SRGBColorSpace;

    useFrame(() => {
      if(-43 > myMesh.current.position.x){
        myMesh.current.position.x = 44.3;
      }else{
        myMesh.current.position.x -= 0.005;
      }
    })

    useFrame(() => {
      if(-43 > myMesh2.current.position.x){
        myMesh2.current.position.x = 44.3;
      }else{
        myMesh2.current.position.x -= 0.005;
      }
    })
    
    return(
    <>
    <mesh ref={myMesh} scale={[25*aspectRatio,25,25]} position={[0,0,-4]} >
      <planeGeometry args={[1.0, 1.0]}/>
      <meshBasicMaterial map={texture}/>
    </mesh>

    <mesh ref={myMesh2} scale={[25*aspectRatio,25,25]} position={[43.0,0,-4]} >
      <planeGeometry args={[1.0, 1.0]}/>
      <meshBasicMaterial map={texture2}/>
    </mesh>

    </>
    );
}

export default BackGroundImage;