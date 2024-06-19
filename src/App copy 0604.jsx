{/* CSS */}
import "./App.css";
{/* library */}
import React, { useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
{/* custom component */}
//import AnimatedBox from "./components/AnimatedBox";
//import CastersList from "./components/CastersList";
import Header from './components/Header';
import ImageComponent from "./components/ImageComponent";
import Description from "./components/Description";
import CasterImage from "./components/CasterImage";
{/* Json */}
import CastersListJson from "./assets/castersList.json";
import DiscriptionListJson from "./assets/DiscriptionList.json";

//import { useSpring, animated } from '@react-spring/three'
//import { TextureLoader } from 'three';
//import CustomButton from './components/CustomButton';
//import CustomButton2 from './components/CustomButton2';

const openLivePage = () =>{
  window.open("https://news.ntv.co.jp/live", '_blank');
}

export default function App() {

  const[casterId,setCasterId] = useState("");

  const [logoActive, setLogoActive] = useState(false);
  const [descriptionActive, setDescriptionActive] = useState(false);
  const [casterGrpActive, setCasterGrpActive] = useState(false);//9面IN-OUT
  
  let casterActiveArray = [];
  let setCasterActiveArray = [];
  for(i=0;i<9;i++){
    const [casterActive, setCasterActive] = useState(false);//これは複数作って1S用にしたい
    casterActiveArray.push(casterActive);
    setCasterActiveArray.push(setCasterActive);
  }
  console.log("console");
  console.log(casterActiveArray);


  const button1 = () =>{
    console.log("button1");
    if(descriptionActive && casterGrpActive == false){
      //概要がONでキャスターリストがOFFのとき
      setLogoActive(false);
      setDescriptionActive(false);
    }else if(descriptionActive == false && casterGrpActive == false){
       //概要がまだ押されていないとき かつキャスターリストもOFFのとき
      setLogoActive(true);
      setDescriptionActive(true);
    }else if(casterGrpActive && descriptionActive == false){
       //キャスターリストがONで概要がOFFのとき
      setDescriptionActive(true);
      setCasterGrpActive(false);
    }

  }

  const button2 = () =>{

    if(casterGrpActive && descriptionActive == false){
      //キャスターリストがONで概要がOFFのとき
      setLogoActive(false);
      setCasterGrpActive(false);
    }else if(descriptionActive == false && casterGrpActive == false){
      //キャスターリストがまだ押されていないとき かつ概要もOFFのとき
      setLogoActive(true);
      setCasterGrpActive(true);
    }else if(descriptionActive && casterGrpActive == false){
      //概要がONでキャスターリストがOFFのとき
      setDescriptionActive(false);
      setCasterGrpActive(true);
    }
  }


  return (
    <>
    <Header  />
    <div>
      <Canvas  onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }} style={{backgroundColor:'gray' , width: '100vw', height: '80vh'}} >
      
        <ambientLight intensity={1.0} />
        <directionalLight />
        {/*<AnimatedBox position={[0,0,3]} textActive={textActive} color={'yellow'}/>*/}
        
        {/*<CustomButton btName={"番組について"}   style={{left:'-600px', top:bt_pos_top}} button1={button1}/>*/}
        {/*<CustomButton btName={"ライブ配信"}     style={{left:'0px', top:bt_pos_top}}/>*/}
        {/*<CustomButton2 btName={"キャスター紹介"} style={{left:'600px', top:bt_pos_top}}  button2={button2}/>*/}
        
        {/*番組ロゴ*/}
        <ImageComponent startPos={[0,0,0]} endPos={[0,4.5,-2.5]} logoActive={logoActive} />
        {/*番組説明文1*<Description position={[0,1.5,0]}  scale={[1.5,1.5]} startDelay={300} returnDelay={0} descriptionActive={descriptionActive}  src={'src/assets/ProgramDescription/description1.png'}/>/}
        {/*番組説明文2*<Description position={[0,-0.2,0]}  scale={[1.5,1.5]} startDelay={600} returnDelay={0} descriptionActive={descriptionActive}  src={'src/assets/ProgramDescription/description1.png'}/>/}
        {/*番組説明文3*<Description position={[0,-1.9,0]} scale={[1.5,1.5]} startDelay={900} returnDelay={0} descriptionActive={descriptionActive}  src={'src/assets/ProgramDescription/description1.png'}/>/}
        {/*<OrbitControls/>*/}
        {/*<CastersList CastersListJson={CastersListJson}/>*/}
        <Description DiscriptionListJson={DiscriptionListJson} descriptionActive={descriptionActive}/>
        <CasterImage casterActive={casterActive} setCasterActive={setCasterActive} descriptionActive={descriptionActive} casterGrpActive={casterGrpActive} casterId={casterId} setCasterId={setCasterId} CastersListJson={CastersListJson}/>
       
      </Canvas>

      <button onClick={button1}>番組について</button>
      <button onClick={openLivePage}>ライブ配信</button>
      <button onClick={button2}>キャスター紹介</button>
    </div>


    </>
  );
}