import React, { useRef, useState, useEffect } from "react";
import { useSpring, animated } from '@react-spring/three';
import { useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import { TextureLoader } from 'three';

function Image({ pos, scale, src, opacity ,onClickFlag, casterActive ,setCasterActive ,casterGrpActive,id,name}) {
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
                    console.log(event.eventObject.name);
                    //console.log(event.eventObject.material.opacity);
                    /*
                    if(event.eventObject.material.opacity === 0){
                        console.log("透明な3Dオブジェクトをクリックしました");
                        console.log(event.eventObject.name);
                        console.log("--------------------");
                    }else if(event.eventObject.material.opacity === 1){
                        console.log("透明ではない3Dオブジェクトをクリックしました");
                        console.log(event.eventObject.name);
                        event.stopPropagation();
                        console.log("--------------------");
                    }
                    */

                    if (onClickFlag){
                        if (typeof setCasterActive === 'function' &&  casterActive === false && casterGrpActive){
                            setCasterActive(true);
                            console.log("表示");
                        }else if(typeof setCasterActive === 'function' && casterActive === true ) {
                            setCasterActive(false);
                            console.log("非表示");
                        }
                        else{
                            console.log("該当なし");
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
                config: { mass: 5, tension: 200, friction: 80, duration: 400 },
            })
        );
        
        springPropsArray_single.push(
            useSpring({
                opacity: casterActiveArray[i] ? 1.0 : 0.3,
                delay:casterActiveArray[i] ? 0 : 0,
                config: { mass: 5, tension: 200, friction: 80, duration: 400 },
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
                            onClickFlag={false}
                            name={"smallBase:"+caster.ID}
                            
                        />

                        <Image
                            pos={[0, 0, 0.01]}
                            scale={caster.smallPicName_Scale}
                            opacity={springPropsArray[index].opacity}
                            src={caster.smallPicName_Src}
                            onClickFlag={true}
                            casterGrpActive={casterGrpActive}
                            
                            casterActive={casterActiveArray[index]}
                            setCasterActive={setCasterActiveArray[index]}
                            casterId={index}
                            name={"smallPicture:"+caster.ID}
                            onClick={(event) => {event}}
                        />
                    </animated.group>

                    <animated.group position={[0, -0.55, 0]} scale={[4, 4, 4]}>
                        {/*大きいベース*/}
                        <Image
                            pos={[0, 0, 0.02]}
                            scale={[1.5, 1.5, 1.5]}
                            opacity={springPropsArray_single[index].opacity}
                            src={"src/assets/caster_name/common/large/large_name_base.png"}
                            //casterActive={casterActive}
                            //setCasterActive={setCasterActive}
                            onClickFlag={false}
                            name={"largeBase:"+caster.ID}
                            
                        />
                        {/*戻るボタン*/}
                        <Image
                            pos={[1.9, -0.5, 0.02]}
                            scale={[0.4, 0.4, 0.4]}
                            opacity={springPropsArray_single[index].opacity}
                            src={"src/assets/caster_name/common/large/large_name_back.png"}
                            //casterActive={casterActive}
                            //setCasterActive={setCasterActive}
                            //onClickFlag={true}
                            onClickFlag2={true}
                            comment={"戻るボタンが押されました"}
                            id={index}
                            name={"largeBase_Back:"+caster.ID}
                        />
                        {/*名前*/}
                        <Image
                            pos={caster.largePic1_Pos}
                            scale={caster.largePic1_Scale}
                            opacity={springPropsArray_single[index].opacity}
                            src={caster.largePic1_Src}
                            //casterActive={casterActive}
                            //setCasterActive={setCasterActive}
                            onClickFlag={false}
                            callindex={caster.ID}
                            name={"largeBase_Name:"+caster.ID}
                        />
                    </animated.group>
                </animated.group>
            ))}
        </>
    );
};

export default CasterImage;

//小さいベースを押したらすべての大きなベースが出てきてしまうのでstateをそれぞれわけるのかなんなのか 67gyoume