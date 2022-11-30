import * as React from "react"
import * as THREE from "three";
import { graphql } from "gatsby"

import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollControls, useScroll, Scroll, useAnimations, Html, Merged } from "@react-three/drei"
import { a } from "@react-spring/three";

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
    position={props.position}
    {...props}
  />
}

function Tidbit(props) {
  return (
  <Html
    center={true}
    position={props.position}
    zIndexRange={[5, 1]}>
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
  console.log(scroll)

  //React.useEffect(() => void set({ camera: ref.current }), []);

  useFrame((state, delta) => {
    ref.current.translateZ(scroll.offset * 20);
    //ref.current.position.lerp(new THREE.Vector3(40, 0, 0), 0.05)
    ref.current.updateMatrixWorld();
  })

  return <perspectiveCamera
    ref={ref}
    fov={90}
    {...props}
  />
}


function Page(props) {
  const group = React.useRef()

  return (
    <group ref={group}  {...props}>
      <Model modelFile={props.modelFile} position={props.modelPosition} scale={props.scale} />
      <Tidbit header={props.header} sentence={props.sentence} position={props.textPosition}/>
    </group>
  )
}

function Scene(props) {
  const { width } = useThree((state) => state.viewport)


  return (
    <>
      <Page
        modelPosition = {[0, -1, 0 ]}
        textPosition = {[0, 0, 0 ]}
        scale = {.75}
        modelFile="/3d/gundam.glb"
        header="I am a product designer."
        sentence="Passionate about emerging technologies and social dynamics."
      />
      <Page
        modelPosition = {[8, 0, 0 ]}
        textPosition = {[17, 0, 0 ]}
        scale = {1}
        modelFile="/3d/meta.glb"
        header="I currently do my thing at Meta."
        sentence="Been designing here 4 years."
      />
      <Page
        modelPosition = {[20, 0, 0 ]}
        textPosition = {[40, 0, 0 ]}
        scale = {1}
        modelFile="/3d/headset.glb"
        header="I've been in the VR Privacy space for the past year or so."
        sentence="While I've been here I've shipped new privacy settings and features for the Quest Pro."
      />
    </>
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
            className="scrollControls"
          >
            <Camera position={[5, 0, 0]}/>
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
