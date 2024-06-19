import React, { useRef , Suspense} from "react";
import { useSpring, animated } from '@react-spring/three';
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';

/*
9面に必要なこと
JsonをMapで展開してjson内からデータ取り出すのがコード的には簡潔になるかも
・出てくるときのディレイドタイム
・位置
・画像のsrc（ミニ写真の方）
・画像のsrc（大きい写真の方・顔写真×3）
*/

/*
function Image(src){

  const ref = useRef();
  const texture = useLoader(TextureLoader, src);
  texture.colorSpace = THREE.SRGBColorSpace;
  const aspectRatio = texture.image.width / texture.image.height;
  
  return(<>
  <animated.mesh ref={ref} scale={[aspectRatio*3,3,3]} position={[0,0,0]} >
    <planeGeometry args={[1.0, 1.0]}/>
    <meshBasicMaterial map={texture} transparent={true}/>
  </animated.mesh>
  </>);
}
*/

function Caster_Small({pos,smallPic,largePic1,largePic2,large_pos,id}){

    {/*小さいベース*/}
    const myMesh = useRef();
    const texture = useLoader(TextureLoader, 'src/assets/caster_name/common/small/small_name_base.png');
    texture.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio = texture.image.width / texture.image.height;
    {/*小さいベースの文字*/}
    const myMesh2 = useRef();
    const texture2 = useLoader(TextureLoader, smallPic);
    texture2.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio2 = texture2.image.width / texture2.image.height;
    {/*大きいベース*/}
    const myMesh3 = useRef();
    const texture3 = useLoader(TextureLoader, 'src/assets/caster_name/common/large/large_name_n24.png');
    texture3.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio3 = texture3.image.width / texture3.image.height;
    {/*大きいベースの名前*/}
    const myMesh4 = useRef();
    const texture4 = useLoader(TextureLoader, largePic1);
    texture4.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio4 = texture4.image.width / texture4.image.height;
    {/*大きいベースのテキスト*/}
    const myMesh5 = useRef();
    const texture5 = useLoader(TextureLoader, largePic2);
    texture5.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio5 = texture5.image.width / texture5.image.height;
    {/*大きいベースの戻る*/}
    const myMesh6 = useRef();
    const texture6 = useLoader(TextureLoader, 'src/assets/caster_name/common/large/large_name_back.png');
    texture6.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio6 = texture6.image.width / texture6.image.height;



    /*
    const { scale } = useSpring({
        scale: logoActive ? [aspectRatio*1.0, 1.0, 1.0] : [aspectRatio*1.5,1.5,1.5] ,
        delay: logoActive ? 0 : 300
    });
    const { move } = useSpring({
        move: logoActive ? endPos : startPos,
        delay: logoActive ? 0 : 300,
    });
    */

    return(
    <>
      {/*小さいベースのグループ*/}
      <animated.group position={pos} scale={[1.3,1.3,1.3]}>
        {/*小さいベース*/}
        <animated.mesh ref={myMesh} scale={[aspectRatio*1,1,1]} position={[0,0,0]} >
          <planeGeometry args={[1.0, 1.0]}/>
          <meshBasicMaterial map={texture} transparent={true} color={'white'}/>
        </animated.mesh>

        {/*小さいベース用写真*/}
        <animated.mesh onClick={()=>{console.log(id)}} ref={myMesh2} scale={[aspectRatio2*0.8,0.8,0.8]} position={[0,0,0.01]} >
          <planeGeometry args={[1.0, 1.0]}/>
          <meshBasicMaterial map={texture2} transparent={true} color={'white'}/>
        </animated.mesh>
      </animated.group>

      {/*展開後*/}
      <animated.group position={[-7.1,1.8,-0.1]} scale={[1.0,1.0,1.0]}>
        {/*大きいベース用 ロゴ*/}
        <animated.mesh onClick={()=>{console.log(id)}} ref={myMesh3} scale={[aspectRatio3*0.77,0.77,0.77]} position={[0,0,0.2]} >
          <planeGeometry args={[1.0, 1.0]}/>
          <meshBasicMaterial map={texture3} transparent={true} color={'white'}/>
        </animated.mesh>

        {/*大きいベース用 名前*/}
        <animated.mesh onClick={()=>{console.log(id)}} ref={myMesh4} scale={[aspectRatio4*0.65,0.65,0.65]} position={[2.5,0,0.2]} >
          <planeGeometry args={[1.0, 1.0]}/>
          <meshBasicMaterial map={texture4} transparent={true} color={'white'}/>
        </animated.mesh>

        {/*大きいベース用 テキスト*/}
        <animated.mesh onClick={()=>{console.log(id)}} ref={myMesh5} scale={[aspectRatio5*3.8,3.8,3.8]} position={[3,-2.8,0.2]} >
          <planeGeometry args={[1.0, 1.0]}/>
          <meshBasicMaterial map={texture5} transparent={true} color={'white'}/>
        </animated.mesh>

        {/*大きいベース用 戻るボタン*/}
        <animated.mesh onClick={()=>{console.log(id)}} ref={myMesh6} scale={[aspectRatio6*1.5,1.5,1.5]} position={[14.2,-4.1,0.2]} >
          <planeGeometry args={[1.0, 1.0]}/>
          <meshBasicMaterial map={texture6} transparent={true} color={'white'}/>
        </animated.mesh>
      </animated.group>


      </>
    );

}

function Base_Large({pos,scale}){
  
  const LargeBaseRef = useRef();
  const tex_LargeBase = useLoader(TextureLoader, 'src/assets/caster_name/common/large/large_name_base.png');
  tex_LargeBase.colorSpace = THREE.SRGBColorSpace;
  const aspectRatio_LargeBase = tex_LargeBase.image.width / tex_LargeBase.image.height;

  return(
    <>
      <animated.group position={pos} scale={scale}>
        {/*大きいベース*/}
        <animated.mesh ref={LargeBaseRef} scale={[aspectRatio_LargeBase*1,1,1]} position={[0,0,0]} >
          <planeGeometry args={[1.0, 1.0]}/>
          <meshBasicMaterial map={tex_LargeBase} transparent={true} color={'white'}/>
        </animated.mesh>
      </animated.group>
      </>
    );
}

const CastersList = ({CastersListJson}) =>{

  return(
  <>
    {CastersListJson.map((caster,index)=>
      <Caster_Small key={index} id={index} pos={caster.pos} smallPic={caster.smallPictureSrc} largePic1={caster.largePictureSrc1} largePic2={caster.largePictureSrc2} large_pos={[0,0,0]}/>
    )}

    <Base_Large pos={[0,-0.45,0.1]} scale={[5.7,5.7,5.7]}/>
    {/*<Image src={src/assets/caster_name/caster/caster1/dammyIcom.png}/>*/}
  </>);
}

export default CastersList;