//https://react-spring.dev/docs
//https://react-spring.dev/docs/guides/react-three-fiber
//https://qiita.com/okkuyama/items/e835fa4e483c0bc05733

import React from 'react';
import { useSpring, animated } from '@react-spring/three';
import { useRef, useEffect } from "react";

function AnimatedBox({ position , logoActive , color}) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.material.needsUpdate = true;
      ref.current.material.transparent = true;
    }
  }, []);

  const springProps = useSpring({
    opacity: logoActive ? 1.0 : 0.0,
    delay: logoActive ? 300 : 0,
    config: { mass: 5, tension: 200, friction: 80 , duration: 500 }, // 調整可能なアニメーション設定
  });

  return (
    <animated.mesh ref={ref} position={position} rotation={[10, 50, 0]}>
      <boxGeometry />
      <animated.meshBasicMaterial color={color} opacity={springProps.opacity} />
    </animated.mesh>
  );
}

export default AnimatedBox;