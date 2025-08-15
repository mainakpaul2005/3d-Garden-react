import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three"; 
import { BighornModel, CoconutTreeModel, NeemTreeModel, AloeVeraModel, GardenBridgeModel, JungleModel } from "./components/Models";  // ✅ Import Jungle Model

function CameraControls() {
  const { camera } = useThree();
  const speed = 0.5;

  useEffect(() => {
    const handleKeyDown = (event) => {
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction); 
      direction.y = 0; // ✅ Keep movement on XZ plane

      const right = new THREE.Vector3();
      right.crossVectors(direction, camera.up).normalize(); 

      switch (event.key.toLowerCase()) {
        case "w": case "arrowup":
          camera.position.addScaledVector(direction, speed); // ✅ Move Forward
          break;
        case "s": case "arrowdown":
          camera.position.addScaledVector(direction, -speed); // ✅ Move Backward
          break;
        case "a": case "arrowleft":
          camera.position.addScaledVector(right, -speed); // ✅ Move Left
          break;
        case "d": case "arrowright":
          camera.position.addScaledVector(right, speed); // ✅ Move Right
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera]);

  return null;
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [5, 3, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        {/* ✅ HDRI/EXR Skybox */}
        <Environment files="/hdris/sky_background.exr" background />

        {/* ✅ Models Stay Fixed */}
        <BighornModel position={[0, -1, 0]} /> 
        <CoconutTreeModel position={[-3, -1, 2]} scale={0.1} />  
        <NeemTreeModel position={[7, -1, 2]} scale={0.05} />  
        <AloeVeraModel position={[2, -1.10, 4]} scale={0.08} />  
        <GardenBridgeModel position={[-2, -2.80, -40]} scale={0.3} />  

        {/* ✅ Added Jungle Model Without Changing Other Code */}
        <JungleModel position={[0, -1.80, -60]} scale={[2, 2, 2]} />  

        {/* ✅ First-Person Camera Movement */}
        <CameraControls />

        <OrbitControls 
          minDistance={1}  
          maxDistance={100} 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI} 
          enablePan={true} 
        />
      </Canvas>
    </div>
  );
}

export default App;
