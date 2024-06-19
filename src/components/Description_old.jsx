import React, { useRef, useEffect, Suspense } from "react";
import { useSpring, animated } from '@react-spring/three';
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';


const Description = ({src,descriptionActive,scale,startDelay,returnDelay,position}) =>{
    
    const ref = useRef();  

    useEffect(() => {
        THREE.ColorManagement.enabled = true;
        if (ref.current) {
            ref.current.material.needsUpdate = true;
            ref.current.material.transparent = true;
        }
    }, []);
    /*
    const texture = useLoader(TextureLoader, src, (loader) => {
        loader.colorSpace = THREE.SRGBColorSpace;
    });
    */
    const texture = new THREE.TextureLoader().load(src);
    texture.colorSpace = THREE.SRGBColorSpace;

    /*
    useEffect(() => {
        //THREE.ColorManagement.enabled = true;
        if (ref.current) {
            ref.current.material.needsUpdate = true;
            ref.current.material.transparent = true;
            
        }
    }, []);
    */
    
    /*
    THREE.ColorManagement.enabled = true;
    const texture = useLoader(TextureLoader, src);
    texture.colorSpace = THREE.SRGBColorSpace;
    */


    //texture.crossOrigin = 'anonymous'
    //texture.colorSpace = THREE.SRGBColorSpace;

    const aspectRatio = 8;//texture.image.width / texture.image.height;
    
    /*
    useEffect(() => {
        if (texture) {
            console.log("2:textureはありまぁす！");
            
        }
    }, texture);
    */

    //const aspectRatio = texture.image.width / texture.image.height;
    
    const springProps = useSpring({
        imgScale : descriptionActive ? [aspectRatio,1,1] : [aspectRatio,1,1],
        opacity: descriptionActive ? 1.0 : 0.0,
        delay: descriptionActive ? startDelay : returnDelay,
        config: { mass: 5, tension: 200, friction: 80 , duration: 500 }, // 調整可能なアニメーション設定
    });


    return(
        <>
        {console.log(descriptionActive)}
        <Suspense fallback={null}>
        <animated.mesh ref={ref} position={position} scale={springProps.imgScale}>
            <planeGeometry args={scale}/>
            <animated.meshBasicMaterial map={texture} transparent={true} opacity={springProps.opacity}/>
        </animated.mesh>
        </Suspense>
        </>
    );
}

export default Description;