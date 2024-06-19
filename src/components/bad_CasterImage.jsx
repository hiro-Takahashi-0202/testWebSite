//このソースコードで起こったことを確認すること
import React, { useRef , useState , useEffect} from "react";
import { useSpring, animated } from '@react-spring/three';
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';


function Image({pos,scale,src,stateArray,onClickFlag,setStateArray,opacity,setCasterActive,casterActive}){

    const ref = useRef();
    console.log("aaa");
    console.log(typeof(setCasterActive));//point1
    

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
            if (typeof setCasterActive === 'function') {
                setCasterActive(!casterActive);
            } else {
                console.error('setCasterActive is not a function');
            }
            }}>
            <planeGeometry args={[1.0, 1.0]}/>
            <animated.meshBasicMaterial map={texture} transparent={true} opacity={opacity}/>
        </animated.mesh>
    </animated.group>
    </>);
}


const CasterImage = ({CastersListJson,casterActive,setCasterActive,casterGrpActive}) =>{
    
    const stateArray = [];
    const setStateArray = [];
    const springPropsArray = [];
    const springPropsArray_single = [];

    //console.log("aaaa");
    //console.log(typeof(setCasterActive));

    for(let i=0; i<9; i++){
        //大きいベースを表示するState
        const [opasityState,setOpasityState] = useState(false);
        stateArray.push(opasityState);
        setStateArray.push(setOpasityState);

        //これは小さいベース自体の透明度のspring
        springPropsArray.push(
            useSpring({
            //imgScale : descriptionActive ? [aspectRatio,1,1] : [aspectRatio,1,1],
            opacity: casterGrpActive ? 1.0 : 0.0,
            delay: casterGrpActive ? (100 * (i/2)) + 300 : 0,
            config: { mass: 5, tension: 200, friction: 80 , duration: 400 }, // 調整可能なアニメーション設定
        }));

        //これは大きいベース自体の透明度のspring
        springPropsArray_single.push(
            useSpring({
            opacity: casterActive ? 1.0 : 0.0,
            delay: casterActive ? 0 : 0,
            config: { mass: 5, tension: 200, friction: 80 , duration: 400 }, // 調整可能なアニメーション設定
        }));
        
    }

    return(
    <>
        {CastersListJson.map((caster,index)=>
            <animated.group position={[0,0,0]} scale={[1,1,1]} key={index}>
                {/* 小ベース */}
                <animated.group position={caster.smallPicName_Pos} scale={[1,1,1]} key={index}>
                    <Image pos={[0,0,0]} scale={[1.5,1.5,1.5]}
                        opacity={springPropsArray[index].opacity} 
                        src={"src/assets/caster_name/common/small/small_name_base.png"}
                        casterActive={casterActive}
                        setCasterActive={setCasterActive}/>
                        
                    {/* 小ベースの写真＆テキスト */}
                    <Image casterGrpActive={casterGrpActive} pos={[0,0,0.01]} scale={caster.smallPicName_Scale}
                        opacity={springPropsArray[index].opacity} 
                        onClickFlag={true}
                        src={caster.smallPicName_Src}
                        />

                </animated.group>


                 {/* 大ベース */}
                <animated.group position={[0,-0.55,0]} scale={[4,4,4]} >
                    <Image casterActive={casterActive} setCasterActive={setCasterActive} onClickFlag={false} stateArray={stateArray[index]} setStateArray={setStateArray[index]} id={0} pos={[0,0,0]} scale={[1.5,1.5,1.5]}
                            opacity={springPropsArray_single[index].opacity} 
                            src={"src/assets/caster_name/common/large/large_name_base.png"}/>
                </animated.group>

            </animated.group>
        )}

    </>
    );
}

export default CasterImage;