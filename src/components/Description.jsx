import React, { useRef , useState , useEffect} from "react";
import { useSpring, animated } from '@react-spring/three';
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';


function DescriptionImage({pos,scale,src,stateArray,onClickFlag,setStateArray,opacity}){

    const ref = useRef();

    useEffect(() => {
        THREE.ColorManagement.enabled = true;
        if (ref.current) {
            ref.current.material.needsUpdate = true;
            ref.current.material.transparent = true;
        }
    }, []);

    const texture = useLoader(TextureLoader, src);
    texture.colorSpace = THREE.SRGBColorSpace;
    const aspectRatio = texture.image.width / texture.image.height;

    return(<>
    <animated.group position={pos} scale={scale} >
        <animated.mesh ref={ref} scale={[aspectRatio*1,1,1]} onClick={()=>{
            //if(onClickFlag) setStateArray(!stateArray);
            }}>
            <planeGeometry args={[1.0, 1.0]}/>
            <animated.meshBasicMaterial map={texture} transparent={true} opacity={opacity}/>
        </animated.mesh>
    </animated.group>
    </>);
}

const Description = ({DiscriptionListJson,descriptionActive}) =>{
    
    const stateArray = [];
    const setStateArray = [];
    const springPropsArray = [];

    for(let i=0; i<3; i++){
        //ここのStateって小さいベースをクリックしたら大きいやつが出る⇔消えるステート
        const [opasityState,setOpasityState] = useState(false);
        stateArray.push(opasityState);
        setStateArray.push(setOpasityState);

        //これは小さいベース自体の透明度のspring
        springPropsArray.push(
            useSpring({
            //imgScale : descriptionActive ? [aspectRatio,1,1] : [aspectRatio,1,1],
            opacity: descriptionActive ? 1.0 : 0.0,
            delay: descriptionActive ? (300 * (i/2)) + 300 : 0,
            config: { mass: 5, tension: 200, friction: 80 , duration: 400 }, // 調整可能なアニメーション設定
        }));

        //console.log(springPropsArray);
    }

    return(
    <>
    {/*
        {CastersListJson.map((caster,index)=>
            <Caster_Small key={index} id={index} pos={caster.pos} smallPic={caster.smallPictureSrc} largePic1={caster.largePictureSrc1} largePic2={caster.largePictureSrc2} large_pos={[0,0,0]}/>
        )}
    */}
        {DiscriptionListJson.map((discription,index)=>
        
            <animated.group position={[0,-0.3,0]} scale={[1,1,1]} key={index}>
                {/* 説明文1 */}
                <DescriptionImage src={discription.src} pos={discription.pos} scale={discription.scale}  opacity={springPropsArray[index].opacity} 
            />
            </animated.group>
        )}

        </>
    );
}

export default Description;