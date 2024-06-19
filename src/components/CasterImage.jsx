import React, { useRef, useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/three';
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';

function Image({ pos, scale, src, opacity ,setCasterActive ,name}) {
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
    
    return (
        <animated.group position={pos} scale={scale}>
            <animated.mesh
                name={name}
                ref={ref}
                scale={[aspectRatio * 1, 1, 1]}
                
                onClick={(event) => {
                    if(event.eventObject.material.opacity == 1){
                        event.stopPropagation();

                        if(typeof setCasterActive === 'function' && event.eventObject.name === 'largeBase_Back'){//クリックされたとき
                            setCasterActive(false);
                        }
                        else if(typeof setCasterActive === 'function'){
                            setCasterActive(true);
                        }
                    }
                }}
            >
                <planeGeometry args={[1.0, 1.0]} />
                <animated.meshBasicMaterial map={texture} transparent={true} opacity={opacity} />
            </animated.mesh>
        </animated.group>
    );
}

const CasterImage = ({ CastersListJson, casterGrpActive, casterActiveArray, setCasterActiveArray , setCasterOpenFlag ,casterOpenFlag}) => {
    const stateArray = [];
    const setStateArray = [];
    const springPropsArray = [];
    const springPropsArray_single = [];

    for (let i = 0; i < 9; i++) {
        const [opasityState, setOpasityState] = useState(false);
        stateArray.push(opasityState);
        setStateArray.push(setOpasityState);

        springPropsArray.push(
            useSpring({
                opacity: casterGrpActive ? 1.0 : 0.0,
                delay: casterGrpActive ? (100 * (i / 2)) + 300 : 0,
                config: { mass: 5, tension: 200, friction: 80, duration: 200 },
            })
        );
        
        springPropsArray_single.push(
            useSpring({
                opacity: casterActiveArray[i] ? 1.0 : 0.0,
                delay:casterActiveArray[i] ? 0 : 150,
                config: { mass: 5, tension: 200, friction: 80, duration: 200 },
            })
        );
        
    }


    return (
        <>
            {CastersListJson.map((caster, index) => (
                <animated.group position={[0,0,0]} scale={[1, 1, 1]} key={index}>
                   {/*console.log(casterActiveArray)*/}
                    <animated.group position={caster.smallPicName_Pos} scale={[1, 1, 1]} key={index}>
                        <Image
                            pos={[0, 0, 0]}
                            scale={[1.5, 1.5, 1.5]}
                            opacity={springPropsArray[index].opacity}
                            src={"src/assets/caster_name/common/small/small_name_base.png"}
                        />

                        <Image
                            pos={[0, 0, 0.01]}
                            scale={caster.smallPicName_Scale}
                            opacity={springPropsArray[index].opacity}
                            src={caster.smallPicName_Src}
                            
                            casterActive={casterActiveArray[index]}
                            setCasterActive={setCasterActiveArray[index]}
                        />
                    </animated.group>

                    <animated.group position={[0, -0.55, 0.05]} scale={[3.87, 3.87, 3.87]}>
                        {/*大きいベース*/}
                        <Image
                            pos={[0, 0, 0.02]}
                            scale={[1.5, 1.5, 1.5]}
                            opacity={springPropsArray_single[index].opacity}
                            src={"src/assets/caster_name/common/large/large_name_base.png"}
                        />
                        {/*番組ロゴ*/}
                        <Image
                            pos={[-1.8, 0.58, 0.05]}
                            scale={[0.22,0.22, 0.22]}
                            opacity={springPropsArray_single[index].opacity}
                            src={"src/assets/caster_name/common/large/large_name_n24.png"}
                        />
                        {/*名前テキスト*/}
                        <Image
                            pos={caster.largeName_Pos}
                            scale={caster.largeName_Scale}
                            opacity={springPropsArray_single[index].opacity}
                            src={caster.largeName_Src}
                        />
                        {/*本文テキスト*/}
                        <Image
                            pos={caster.largeText_Pos}
                            scale={caster.largeText_Scale}
                            opacity={springPropsArray_single[index].opacity}
                            src={caster.largeText_Src}
                        />
                        {/*戻るボタン*/}
                        <Image
                            pos={[1.7, -0.45, 0.1]}
                            scale={[0.4, 0.4, 0.4]}
                            opacity={springPropsArray_single[index].opacity}
                            src={"src/assets/caster_name/common/large/large_name_back.png"}
                            name={"largeBase_Back"}
                            setCasterActive={setCasterActiveArray[index]}
                        />
                        {/*写真1*/}
                        <Image
                            pos={caster.largePic1_Pos}
                            scale={caster.largePic1_Scale}
                            opacity={springPropsArray_single[index].opacity}
                            src={caster.largePic1_Src}
                        />
                        {/*写真2*/}
                        <Image
                            pos={caster.largePic2_Pos}
                            scale={caster.largePic2_Scale}
                            opacity={springPropsArray_single[index].opacity}
                            src={caster.largePic2_Src}
                        /> 
                        {/*写真3*/}
                        <Image
                            pos={caster.largePic3_Pos}
                            scale={caster.largePic3_Scale}
                            opacity={springPropsArray_single[index].opacity}
                            src={caster.largePic3_Src}
                        />
                    </animated.group>

                </animated.group>
            ))}
        </>
    );
};

export default CasterImage;

//小さいベースを押したらすべての大きなベースが出てきてしまうのでstateをそれぞれわけるのかなんなのか 67gyoume