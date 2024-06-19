import React, { useState, useRef, useEffect} from "react";
import { Canvas, useFrame ,useLoader} from "@react-three/fiber";
import { useSpring, animated } from '@react-spring/three'
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Html, OrbitControls } from '@react-three/drei';
import AnimatedBox from "./components/AnimatedBox";
import CustomButton from './components/CustomButton';
import CustomButton2 from './components/CustomButton2';
import Header from './components/Header';
import ImageComponent from "./components/ImageComponent";
import Description from "./components/Description";

function MyRotatingBox({startPos, endPos}) {

  const myMesh = React.useRef();
  const [active, setActive] = useState(false);
  
  const { scale } = useSpring({ scale: active ? 1.5 : 1 });
  const { move } = useSpring({ move: active ? endPos : startPos });
  const { opacity } = useSpring({ opacity: active ? 1 : 0.5 });
  
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });
  
  return (
    <animated.mesh scale={scale} position={move} onClick={() => {
        setActive(!active);
    }} ref={myMesh}>
        <boxGeometry />
        <meshPhongMaterial color="royalblue"/>
    </animated.mesh>
  );
}

/*
function ImageComponent({startPos, endPos, logoActive}) {

  const myMesh = React.useRef();
  
  const texture = useLoader(TextureLoader, 'src/assets/mainLogo.png', (loader) => {
    loader.colorSpace = THREE.SRGBColorSpace;
    
  });
  const aspectRatio = texture.image.width / texture.image.height;

  const [active, setActive] = useState(false);
  const { scale } = useSpring({
    scale: logoActive ? [aspectRatio*1.0, 1.0, 1.0] : [aspectRatio*1.5,1.5,1.5] ,
    delay: logoActive ? 0 : 300});
  const { move } = useSpring({
    move: logoActive ? endPos : startPos,
    delay: logoActive ? 0 : 300,
   });
  
  //画像を読みこんでマテリアルで色設定でもいいかな
  
  return (
    <animated.mesh scale={scale} position={move} onClick={() => {
      setActive(!active);
      }} ref={myMesh}>
      <planeGeometry args={[1.5, 1.5]}/>
      <meshBasicMaterial map={texture} transparent={true} color={'white'}/>
    </animated.mesh>
  );
}
*/


export default function App() {

  const bt_pos_top = `${300}px`;

  const [logoActive, setLogoActive] = useState(false);
  const [textActive, setTextActive] = useState(false);
  const [descriptionActive, setDescriptionActive] = useState(false);

  const button1 = () =>{
    setLogoActive(!logoActive);
    setDescriptionActive(!descriptionActive);
  }

  const button2 = () =>{
    setTextActive(!textActive);
  }

  
  return (
    <>
    <Header/>
    <div>
      <Canvas style={{backgroundColor:'white' , width: '100vw', height: '100vh'}} >
        <ambientLight intensity={1.0} />
        <directionalLight />
        {/*<AnimatedBox position={[0,0,3]} logoActive={logoActive} color={'blue'}/>*/}
        <AnimatedBox position={[0,0,3]} textActive={textActive} color={'yellow'}/>

        <CustomButton btName={"番組について"}   style={{left:'-600px', top:bt_pos_top}} button1={button1}/>
        <CustomButton btName={"ライブ配信"}     style={{left:'0px', top:bt_pos_top}}/>
        <CustomButton2 btName={"キャスター紹介"} style={{left:'600px', top:bt_pos_top}}  button2={button2}/>
        {/*<ImageComponent startPos={[0,0,0]} endPos={[0,4.5,-2.5]} logoActive={logoActive}/>*/}
        <ImageComponent startPos={[0,0,0]} endPos={[0,4.5,-2.5]} logoActive={logoActive} />
        <Description position={[0,1.5,0]} startDelay={100} returnDelay={0} descriptionActive={descriptionActive}  src={'src/assets/ProgramDescription/description1.png'}/>
        <Description position={[0,0.5,0]} startDelay={400} returnDelay={0} descriptionActive={descriptionActive}  src={'src/assets/ProgramDescription/description1.png'}/>
        <Description position={[0,-0.5,0]} startDelay={700} returnDelay={0} descriptionActive={descriptionActive}  src={'src/assets/ProgramDescription/description1.png'}/>
        {/*<OrbitControls/>*/}
      </Canvas>
    </div>
    </>
  );
}