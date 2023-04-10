/**
 * Model component that renders models with animations
 */

import * as React from "react"
import * as THREE from "three"
import { graphql } from "gatsby"


import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"


const Model = (modelFile, props) => {

  const ref = React.useRef()
  const model = useGLTF(modelFile)

  let mixer
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach(clip => {
        const action = mixer.clipAction(clip)
        action.play();
    });
  }

  useFrame((state, delta) => {
    mixer?.update(delta)
  })
  
  return (
    <primitive
      ref={ref}
      object={model.scene}
      material={model.materials}
      position={props.position}
      {...props}
    />
  )
}

export default Model
