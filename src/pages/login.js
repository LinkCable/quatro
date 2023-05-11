import * as React from "react"
import * as THREE from "three"
import { graphql } from "gatsby"

import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Html } from "@react-three/drei"
import Layout from "../components/layout"


function Model(props) {
  const ref = React.useRef()
  const model = useGLTF(props.modelFile)

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

const Login = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  

  return (
    <Layout location={location} title={siteTitle} className="login">
      <Canvas className="canvas">
        <Model
          scale = {.6}
          modelFile="/3d/key.glb"
          position = {[0,.5,0]}
        />
          
        <directionalLight
          castShadow
          position={[0, 0, 2]}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-left={-8}
          shadow-camera-bottom={-8}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          intensity={2}
          shadow-bias={1}
        />
        <directionalLight
          castShadow
          position={[2, 0, -2]}
          shadow-camera-right={-2}
          shadow-camera-top={0}
          shadow-camera-left={2}
          shadow-camera-bottom={4}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          intensity={2}
          shadow-bias={-0.0001}
        />
        <Html center occlude position={[0, -.5, 0]}>
          <form action="/.netlify/functions/login" method="POST">
              <label for="password">Got a password?</label>
              <div className="password-submit">
                <input type="password" name="password" id="password" />
                <button type="submit">Go</button>
              </div>
          </form>
        </Html>
        </Canvas>
      
    </Layout>
  )
}

export default Login

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
