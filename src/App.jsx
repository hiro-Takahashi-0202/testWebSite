{/* CSS */}
import "./App.css";
{/* library */}
import React, { useState } from "react";
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from '@react-three/drei';
{/* custom component */}
//import AnimatedBox from "./components/AnimatedBox";
//import CastersList from "./components/CastersList";
import Header from './components/Header';
import Footer from './components/Footer';
import ImageComponent from "./components/ImageComponent";
import Description from "./components/Description";
import CasterImage from "./components/CasterImage";
import BackGroundImage from "./components/BackGroundImage";
import Cube from "./components/Cube";
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



  return (
    <>
    <Header />
      <Canvas onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping }} style={{width: '100vw', height: '80vh',padding: "0px" }} >
      
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
        */}

        {/*<OrbitControls/>*/}
        {/*<Description DiscriptionListJson={DiscriptionListJson} descriptionActive={descriptionActive}/>
        <CasterImage casterActiveArray={casterActiveArray} setCasterActiveArray={setCasterActiveArray} descriptionActive={descriptionActive} casterGrpActive={casterGrpActive} casterId={casterId} setCasterId={setCasterId} CastersListJson={CastersListJson}/>
        <BackGroundImage Pos={[0,0,-4]} Scale={[25,25,25]}/>*/}
      </Canvas>

      <div style={{ display: "flex", justifyContent: "center", padding:"10px" }}>
        <button className="button" onClick={button1} >番組について</button>
        <button className="button" onClick={openLivePage}>ライブ配信</button>
        <button className="button" onClick={button2}>キャスター紹介</button>
      </div>
      
      <div style={{ display: "flex", justifyContent: "center" , paddingBottom:"100px"}}>
        <td className="selected" valign="top">
        </td>
        <td className="selected" valign="top">
        {/*<!-- item -->*/}
          <div className="table">
            <h3><a className="table_text" href="https://www.gtasu.com/golf/wladies/" target="_blank">5/3(金・祝)・5/5(日・祝)<br/>ワールドレディスチャンピオンシップサロンパスカップ2024を生中継！</a></h3>
          </div>

          {/*<!-- item -->*/}
          <div className="table">
            <h3><a className="table_text" href="https://www.ntv.co.jp/news24/marines/" target="_blank">千葉ロッテマリーンズ主催公式戦を全試合放送！</a></h3>
          </div>

          {/*<!-- item -->*/}
          <div className="table">
            <h3><a className="table_text" href="./images/cs_info_20220120.pdf" target="_blank">日テレ系 CS3チャンネル 2022年4月からスカパー!にて3チャンネルセット商品として販売</a></h3>
          </div>

          {/*<!-- フェイスブック固定 -->*/}
          <div className="table">
          <h3><a href="https://www.facebook.com/ntvnews24/" title="タイトル" target="_blank">日テレNEWS24<br/>公式Facebookページ</a></h3>
          <h4>よりよい番組づくりに活用していきたいと考えていますので、
          <br/>ぜひ「いいね！」を押して参加してください。</h4>
          </div>
        </td>

        <td className="selected" valign="top">
        {/*<!-- item -->*/}
          <div className="table_banner">
            <img src="src/assets/banner/banner_newsapp.png"/>
          </div>
          <div className="table_banner">
            <img src="src/assets/banner/banner_marines.jpg"/>
          </div>
          <div className="table_banner">
            <img src="src/assets/banner/news24catv.png"/>
          </div>
          <div className="table_banner">
            <img src="src/assets/banner/news24facebook.png"/>
          </div>
        </td>
      </div>
      
      <Footer  />
      {/*<Footer  />*/}
    </>
  );
}