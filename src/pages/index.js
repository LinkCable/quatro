import * as React from "react"
import * as THREE from "three";
import { graphql } from "gatsby"

import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollControls, useScroll, Scroll, useAnimations, Text, Html, PerspectiveCamera} from "@react-three/drei"

import Layout from "../components/layout"
import Seo from "../components/seo"


function Model(props) {
  const ref = React.useRef()
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
    ref={ref}
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


function CameraControls(props) {
  const ref = React.useRef()
  const set = useThree((state) => state.set);
  const scroll = useScroll();

  useFrame((state, delta) => {
    ref.current.position.x = scroll.offset * 30;
    ref.current.updateMatrixWorld();
  })

  return <PerspectiveCamera
    position={[0, 0, 3]}
    makeDefault
    ref={ref}
    {...props}
  />
}


function Page(props) {
  const group = React.useRef()
  return (
    <group ref={group} {...props}>
      <Model modelFile={props.modelFile} position={props.modelPosition} scale={props.scale} />
     {/*<Text
      position={props.textPosition}
      fontSize={0.12}
      color={0x1a202c}
      font={"fonts/array/Array-BoldWide.woff"}
      characters="abcdefghijklmnopqrstuvwxyz0123456789!">
        {props.header}
     </Text>*/}
      <Tidbit header={props.header} sentence={props.sentence} position={props.textPosition}/>
    </group>
  )
}

function Scene(props) {

  return (
    <>
      <Page
        modelPosition = {[0, 0, .5]}
        textPosition = {[0, 0, 0]}
        scale = {.75}
        modelFile="/3d/shapes.glb"
        header="I am a product designer."
        sentence="Passionate about emerging technologies and social dynamics."
      />
      <Page
        modelPosition = {[4, 0, 0]}
        textPosition = {[4, 0, 0]}
        scale = {.9}
        modelFile="/3d/meta.glb"
        header="I currently do my thing at Meta."
        sentence="Been designing here 4 years."
      />
      <Page
        modelPosition = {[10.2, 0, -1]}
        textPosition = {[15, 0, 0]}
        scale = {.75}
        modelFile="/3d/headset.glb"
        header="I've been in the VR privacy space for the past year or so."
        sentence= {
          <p>
            While I've been here I've shipped <a href="https://www.oculus.com/blog/meta-accounts/">new profile settings</a> and <a href="https://www.oculus.com/blog/meta-quest-pro-privacy/">privacy features</a> for the Quest Pro.
          </p>
        }
      />
      <Page
        modelPosition = {[10.5, 0, -1]}
        textPosition = {[19, 0, 0]}
        scale = {1}
        modelFile="/3d/facebook.glb"
        header="Prior to that I worked on the Facebook app."
        sentence= {
          <p>
            I was a designer on Search, supporting <a href="https://about.fb.com/news/2018/12/facebook-watch-what-weve-built-whats-ahead/">Facebook Watch</a> and Hashtags, working together with <a href="https://www.facebook.com/community/whats-new/updating-admin-tools/">Facebook Groups</a>.
          </p>
        }
      />
    </>
  )
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <React.Suspense fallback={null}>
        <Canvas className="canvas">
          <ScrollControls
            //pages={2} // Each page takes 100% of the height of the canvas
            distance={1} // A factor that increases scroll bar travel (default: 1)
            damping={4} // Friction, higher is faster (default: 4)
            horizontal
          >
            <Scroll>
              <CameraControls />
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
