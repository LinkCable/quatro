import * as React from "react"
import * as THREE from "three";
import { graphql } from "gatsby"

import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollControls, useScroll, Scroll, useAnimations, Html, Merged } from "@react-three/drei"
import { a } from "@react-spring/three";
//import Scroll from "../components/scroll";

import Layout from "../components/layout"
import Seo from "../components/seo"


function Model(props) {

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
    scale={props.scale}
  />
}

function Tidbit(props) {
  return (
  <Html center={true} >
    <div className="statement">
      <h1>
        {props.header}
      </h1>
      <p>
        {props.sentence}
      </p>
    </div>
  </Html>
  )
}


function Camera(props) {
  const ref = React.useRef()
  const set = useThree((state) => state.set);
  const scroll = useScroll()
  React.useEffect(() => void set({ camera: ref.current }), []);
  useFrame((state, delta) => {
    ref.current.updateMatrixWorld();
  })

  return <perspectiveCamera
    ref={ref}
    {...props}
  />
}


function Page(props) {
  const { width } = useThree((state) => state.viewport)
  const group = React.useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    group.current.position.x = scroll.offset * 4
  })

  console.log(props)
  return (
    <group ref={group} position={props.position} {...props}>
      <Model modelFile={props.modelFile} />
      <Tidbit header={props.header} sentence={props.sentence} />
    </group>
  )
}

function Scene(props) {
  const { width } = useThree((state) => state.viewport)
  return (
    <>
      <Page
        position = {[ 0, 0, 0 ]}
        modelFile="/3d/meta.glb"
        header="I am a product designer."
        sentence="Passionate about emerging technologies and social dynamics."
      />
      <Page
        position = {[ 100, 0, 0 ]}
        modelFile="/3d/headset-res.glb"
        header="I am a product designer."
        sentence="Passionate about emerging technologies and social dynamics."
      />
    </>
    /*
    <Html position={props.position}>
      <Html center={true}>
        <div className="statement">
          <h1>
            I am a product designer.
          </h1>
          <p>
            Passionate about emerging technologies and social dynamics.
          </p>
        </div>
      </Html>
      <Model position={[20, 0, 0]} scale={1} modelFile = "/3d/meta.glb"/>
      <Html center={true} position={[20, 0, 0]}>
        <div className="statement">
          <h1>
            I currently work at Meta.
          </h1>
          <p>
            I've been at the company for 4 years.
          </p>
        </div>
      </Html>
      <Model position={[40, 0, 0]} scale={20} modelFile = "/3d/headset-res.glb" />
    </Html>*/
  )

}


const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const container = React.useRef();

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <React.Suspense fallback={null}>
        <Canvas className="canvas">
          <ScrollControls
            pages={3} // Each page takes 100% of the height of the canvas
            distance={1} // A factor that increases scroll bar travel (default: 1)
            damping={4} // Friction, higher is faster (default: 4)
            horizontal // Can also scroll horizontally (default: false)
          >
            <Scroll>
               <Scene />
            </Scroll>
          </ScrollControls>
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
