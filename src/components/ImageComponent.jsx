import React, { useRef } from "react";
import { useSpring, animated } from '@react-spring/three';
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';

const ImageComponent = ({startPos, endPos , logoActive}) => {
    
    const myMesh = useRef();
    //src/assets/mainLogo.png
    const texture = useLoader(TextureLoader, '/image/mainLogo.png', (loader) => {
        loader.colorSpace = THREE.SRGBColorSpace;
    });
    const aspectRatio = texture.image.width / texture.image.height;

    const { scale } = useSpring({
        scale: logoActive ? [aspectRatio*1.0, 1.0, 1.0] : [aspectRatio*1.5,1.5,1.5] ,
        delay: logoActive ? 0 : 300
    });
    const { move } = useSpring({
        move: logoActive ? endPos : startPos,
        delay: logoActive ? 0 : 300,
    });

    return(
    <animated.mesh ref={myMesh} scale={scale} position={move} >
      <planeGeometry args={[1.5, 1.5]}/>
      <meshBasicMaterial map={texture} transparent={true} color={'white'}/>
    </animated.mesh>
    );
}

export default ImageComponent;