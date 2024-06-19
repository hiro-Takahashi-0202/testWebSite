import React, { useRef, useState, useEffect } from 'react';

function AnimatedBoxOpacity({ position }) {
  const ref = useRef();
  ref.current.material.transparent = true;
  ref.current.material.opacity = 0.5;

  /*
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prevOpacity) => (prevOpacity === 100 ? 0 : prevOpacity + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (ref.current) {
      // ref.current.material が存在するかどうかを確認してからプロパティにアクセスする
      if (ref.current.material) {
        ref.current.material.opacity = opacity / 100;
        ref.current.material.needsUpdate = true;
        console.log("ref.current.material.opacity:",ref.current.material.opacity);
      }
    }
  }, [opacity]);
  */

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry />
      <meshStandardMaterial/>
    </mesh>
  );
}

export default AnimatedBoxOpacity;
