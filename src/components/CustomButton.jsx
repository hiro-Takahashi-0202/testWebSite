import { Html } from '@react-three/drei';
import React, { useState, useRef } from 'react';
import * as THREE from 'three';

const CustomButton = ({btName, style , button1}) => {

    const [hovered, setHover] = useState(false);
    
    const color_true = new THREE.Color("rgb(224, 0, 84)");
    const color_false = new THREE.Color("rgb(0, 0, 255)");
    const buttonBackgroundColor = hovered ? color_false : color_true;

    return(
        <Html>
            <div
                onClick={(event)=>{console.log(event.target.innerText);
                    button1();
                }}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
                style={{
                        textAlign: 'center',
                        position: 'relative',
                        fontSize: '50px',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        minWidth:"300px",
                        backgroundColor: buttonBackgroundColor.getStyle() ,
                        color:'white',
                        border:'white',
                        ...style}}
            >{btName}</div>
        </Html>
    );
}

export default CustomButton;


