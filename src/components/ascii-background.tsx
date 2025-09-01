'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, AsciiRenderer, useGLTF, Environment } from '@react-three/drei'

interface ModelProps {
  scale: number
  rotation: [number, number, number]
  modelUrl: string
  position: [number, number, number]
}

function Model({ scale, rotation, modelUrl, position }: ModelProps) {
  const { scene } = useGLTF(modelUrl)
  return (
    <primitive
      object={scene}
      scale={scale}
      rotation={rotation}
      position={position}
    />
  )
}

export function AsciiBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />

        <Suspense fallback={null}>
          <Model
            scale={1}
            rotation={[0, 0, 0]}
            modelUrl="https://danielcodepen.s3.us-east-1.amazonaws.com/figma.fbx.glb"
            position={[0, -0.2, 0]}
          />
          <Environment preset="studio" />
        </Suspense>

        <Suspense fallback={null}>
          <AsciiRenderer
            resolution={0.15}
            characters=" .:-=+*#%@"
            fgColor="#007BE5"
            bgColor="#ffffff"
            invert={false}
          />
        </Suspense>

        <OrbitControls
          autoRotate={true}
          autoRotateSpeed={1}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  )
}