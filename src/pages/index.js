import * as React from "react"
import * as THREE from "three";
import { graphql } from "gatsby"

import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ScrollControls, Scroll, PerspectiveCamera, useVideoTexture, useTexture } from "@react-three/drei"

import Layout from "../components/layout"
import Seo from "../components/seo"

import halloween from "../videos/halloween.mp4"
import halloweenPlaceholder from "../images/halloween.png";


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


function Phone(props) {
  const texture = useVideoTexture(props.video);
  const fallbackTexture = useTexture(halloweenPlaceholder);
  const aspectRatio = 1846 / 896;

  return (
    <>
        <mesh scale={[1, 1*aspectRatio, 0]} position={props.videoPosition} >
          <planeGeometry />
          <React.Suspense fallback={
            <meshBasicMaterial map={fallbackTexture} toneMapped={false} />
          }>
            <meshBasicMaterial map={texture} toneMapped={false} />
          </React.Suspense>
        </mesh>
    </>
    
  )
}


function Models(props) {
  const { width } = useThree((state) => state.viewport)

  return (
    <>
      <Model
        scale = {.75}
        modelFile="/3d/shapes.glb"
        position = {[0,0,0]}
      >
      </Model>
      <Model
        scale = {.75}
        modelFile="/3d/meta.glb"
        position = {[width,0,0]}
      />
      <Model
        scale = {.35}
        modelFile="/3d/quest-pro.glb"
        position = {[width*2,.5,0]}
      />
      <Phone
        videoPosition = {[width*3,.7,0]}
        video={halloween}
      />
      <Model
        scale = {.8}
        modelFile="/3d/misc-portfolio.glb"
        position = {[width*4,.5,0]}
      />
    </>
  )
}


const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle} className="home">
      <Seo title="Home" />
      <React.Suspense fallback={null}>
        <Canvas className="canvas">
          <ScrollControls
            pages={6}
            distance={1} // A factor that increases scroll bar travel (default: 1)
            damping={4} // Friction, higher is faster (default: 4)
            horizontal
          >
            <Scroll>              
              <Models/>
            </Scroll>
            <Scroll html>
              <div className="statement intro">
                <h1>I am a product designer</h1>
                <p>Passionate about emerging technologies and social dynamics.</p>
              </div>
              <div className="statement meta" style={{left: "100vw"}}>
                <h1>I currently do my thing at Meta</h1>
                <p>Been designing here 4 years.</p>
              </div>
              <div className="statement vr" style={{left: "200vw"}}>
                <h1>Right now I focus on privacy in VR</h1>
                <p>
                  I've helped launch <a href="https://www.oculus.com/blog/meta-accounts/">new profile settings</a> and <a href="https://www.oculus.com/blog/meta-quest-pro-privacy/">privacy features</a> for the Quest Pro.
                </p>
              </div>
              <div className="statement fb" style ={{left: "300vw"}}>
                <h1>I used to work on Facebook</h1>
                <p>
                  I was a designer on Search, supporting <a href="https://about.fb.com/news/2018/12/facebook-watch-what-weve-built-whats-ahead/">Facebook Watch</a> and Hashtags, working together with <a href="https://www.facebook.com/community/whats-new/updating-admin-tools/">Facebook Groups</a>.
                </p>
              </div>
              <div className="statement others" style ={{left: "400vw"}}>
                <h1>I sometimes design other stuff</h1>
                <p>
                  Like <a href="https://www.veryokvinyl.com/products/the-song-of-saya-official-soundtrack?variant=41649689362622">vinyl obi strips</a>, <a href="https://github.com/tachiyomiorg/tachiyomi">manga apps</a>,  <a href="https://www.instagram.com/bootleggerphil/">cocktails</a>, and <a href="https://www.youtube.com/watch?v=awM5fZc8LSU">emoji</a>.
                </p>
              </div>
              <div className="statement end" style ={{left: "500vw"}}>
                <h1>That's all for now</h1>
                <p>
                  But feel free to <a href="mailto:hi@philkt.me">drop me a line</a> if you're interested in chatting.
                </p>
                
              </div>
            </Scroll>
          </ScrollControls>
          
          
          <PerspectiveCamera makeDefault position={[0,0,5]}/>

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
          <pointLight position={[0, 20, 50]} intensity={0.1}/>

          
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
