{/* CSS */}
import "./App.css";

{/* library */}
import React, { useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from '@react-three/drei';

{/* custom component */}
import Header from './components/Header';
import Footer from './components/Footer';
import ImageComponent from "./components/ImageComponent";
import Description from "./components/Description";
import CasterImage from "./components/CasterImage";
import BackGroundImage from "./components/BackGroundImage";

{/* Json */}
import CastersListJson from "./castersList.json";
import DiscriptionListJson from "./DiscriptionList.json";

//import { useSpring, animated } from '@react-spring/three'
//import { TextureLoader } from 'three';
//import CustomButton from './components/CustomButton';
//import CustomButton2 from './components/CustomButton2';

const openLivePage = () =>{
  window.open("https://news.ntv.co.jp/live", '_blank');
}

export default function App() {

  const[casterId,setCasterId] = useState("");

  const [logoActive, setLogoActive] = useState(false);//ロゴIN-OUT
  const [descriptionActive, setDescriptionActive] = useState(false);//概要IN-OUT
  const [casterGrpActive, setCasterGrpActive] = useState(false);//9面IN-OUT

  //キャスター1S展開の判定用stateを配列にする
  let casterActiveArray = [];
  let setCasterActiveArray = [];
  for(let i=0;i<9;i++){
    const [casterActive, setCasterActive] = useState(false);
    casterActiveArray.push(casterActive);
    setCasterActiveArray.push(setCasterActive);
  }

  const button1 = () =>{
    
    if(descriptionActive && casterGrpActive == false){
      //概要がONでキャスターリストがOFFのときは初期画面に戻る
      setLogoActive(false);
      setDescriptionActive(false);
    }else if(descriptionActive == false && casterGrpActive == false){
       //概要がまだ押されていないとき かつキャスターリストもOFFのときは
       //ロゴを上にあげて概要を表示する
      setLogoActive(true);
      setDescriptionActive(true);
    }else if(casterGrpActive && descriptionActive == false && casterActiveArray.includes(true)){
       //キャスターリストと1SがON・概要がOFFのときはキャスターリストを消して概要を表示する
      setDescriptionActive(true);
      setCasterGrpActive(false);

      for( let i = 0;i < casterActiveArray.length;i++){
        if(casterActiveArray[i] == true){
          setCasterActiveArray[i](false);
        }
      }
    }else if(casterGrpActive && descriptionActive == false){
      //キャスターリストがONで概要がOFFのときはキャスターリストを消して概要を表示する
      console.log("button1-4");
     setDescriptionActive(true);
     setCasterGrpActive(false);
   }

  }

  const button2 = () =>{

    if(casterGrpActive && descriptionActive == false){
      //キャスターリストがONで概要がOFFのときにボタンが押されたら+キャスター1Sが展開されていたらOFFにする
      setLogoActive(false);
      setCasterGrpActive(false);
      for( let i = 0;i < casterActiveArray.length;i++){
        if(casterActiveArray[i] == true){
          setCasterActiveArray[i](false);
          console.log("console.log:",setCasterActiveArray[i]);
        }
      }
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

  const buttonStyle = {
    fontSize: '24px',
    padding: '10px 20px',
  };

  var aspRatio = window.innerWidth / window.innerHeight;
  console.log(aspRatio);
  // 視野角
  let fov;
  if (aspRatio > 1) {
    fov = 75;
  } else if (aspRatio > 0.8) {
    fov = 55;
  } else if (aspRatio > 0.6) {
    fov = 70;
  } else if (aspRatio > 0.5) {
    fov = 80;
  } else {
    fov = 90;
  }
  console.log(fov)

  return (
    <>
    <Header />
    {/*<div className="responsive">*/}
    {/*<div style={{width:window.innerWidth, height:window.innerWidth/2.8}}>*/}
    <div style={{width:"100vw", height:"80vh"}}>
    <Canvas camera={{fov:fov}}
    onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
        
        {/*
        const width = window.innerWidth;
        const height = window.innerHeight;

        // レンダラーのサイズを調整する
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(500, 100);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        */}

        }}>{/*style={{width: '100vw', height: '80vh',padding: "0px" }}  */}
      
        <ambientLight intensity={1.0} />
        <directionalLight />
        
        {/*番組ロゴ*/}
        {/*<OrbitControls/>*/}
        <ImageComponent startPos={[0,0,0]} endPos={[0,4.5,-2.5]} logoActive={logoActive} />
        <Description DiscriptionListJson={DiscriptionListJson} descriptionActive={descriptionActive}/>
        <CasterImage casterActiveArray={casterActiveArray} setCasterActiveArray={setCasterActiveArray} descriptionActive={descriptionActive} casterGrpActive={casterGrpActive} casterId={casterId} setCasterId={setCasterId} CastersListJson={CastersListJson}/>
        <BackGroundImage Pos={[0,0,-4]} Scale={[25,25,25]}/>
      </Canvas>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center", padding:"10px" }}>
        <button className="button" onClick={button1} >番組について</button>
        <button className="button" onClick={openLivePage}>ライブ配信</button>
        <button className="button" onClick={button2}>キャスター紹介</button>
      </div>
      

      <Footer  />
      {/*<Footer  />*/}
    </>
  );
}