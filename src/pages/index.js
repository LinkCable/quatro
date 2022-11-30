import * as React from "react"
import * as THREE from "three";
import { graphql } from "gatsby"

import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollControls, useScroll, useAnimations, Html } from "@react-three/drei"
import { a } from "@react-spring/three";
import Scroll from "../components/scroll";

import Layout from "../components/layout"
import Seo from "../components/seo"


function Model(props) {


  console.log(props.modelFile)
  const model = useLoader(GLTFLoader, props.modelFile)

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

  return <primitive
    object={model.scene}
    material={model.materials}
    position={props.position}
    scale={props.scale}
  />
}

function Camera(props) {
  const ref = React.useRef()
  const [y] = Scroll([0, 200], { domTarget: window });
  const set = useThree((state) => state.set);
  React.useEffect(() => void set({ camera: ref.current }), []);
  useFrame(() => ref.current.updateMatrixWorld());
  return <a.perspectiveCamera
    ref={ref}
    {...props}
    position-x={y.to((y) => (y / 500) * 25)}
  />
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const container = React.useRef();

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <div className="container" ref={container}>
        {/*
        <div className="statement">
          <h1>
            I am a product designer.
          </h1>
          <p>
            Passionate about emerging technologies and social dynamics.
          </p>
        </div>
        <div className="statement">
          <h1>
            I currently work on VR Privacy at Meta.
          </h1>
          <p>
            Passionate about emerging technologies and social dynamics.
          </p>
        </div>
        <div className="statement">
          <h1>
            I most recently worked on features supporting the Meta Quest Pro launch.
          </h1>
          <p>
            Including work on face and eye tracking, as well as the Meta account.
          </p>
        </div>
        <div className="statement">
          <h1>
            This is a test of the pacer system.
          </h1>
        </div>
        <div className="statement">
          <h1>
            This is a test of the pacer system.
          </h1>
        </div>
        */}
      </div>
      <React.Suspense fallback={null}>
        <Canvas className="canvas">
          <Html>
            <div className="statement">
              <h1>
                I am a product designer.
              </h1>
              <div>
                Passionate about emerging technologies and social dynamics.
              </div>
            </div>
          </Html>
          <Camera position={[0, 0, 10]} />
          <Model position={[0, 0, 0]} scale={1} modelFile = "/3d/meta.glb"/>
          <Model position={[0, 0, 0]} scale={2} modelFile = "/3d/headset-res.glb" />
          <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          />

          <pointLight position={[0, 20, 20]} />
        </Canvas>
      </React.Suspense>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
