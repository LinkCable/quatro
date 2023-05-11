import * as React from "react"
import * as THREE from "three"
import { graphql } from "gatsby"


import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ScrollControls, Scroll, PerspectiveCamera, useVideoTexture, useTexture, useGLTF } from "@react-three/drei"

import Layout from "../components/layout"
import Seo from "../components/seo"

import halloween from "../videos/halloween.mp4"
import halloweenPlaceholder from "../images/halloween.png"

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

function Video(props) {
  const texture = useVideoTexture(halloween);
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
  const { height } = useThree((state) => state.viewport)

  return (
    <>
      <Model
        scale = {.6}
        modelFile="/3d/intro-anim.glb"
        position = {[1.2,-0.2,0]}
      />
      <Model
        scale = {.5}
        modelFile="/3d/quest-pro.glb"
        position = {[1.4,height*-1.05,0]}
        rotation = {[-0.35, 0, 0.14]}
      />
      <Video
        videoPosition = {[.7,height*-1.9,0]}
        video={halloween}
      />
      <Model
        scale = {.8}
        modelFile="/3d/misc.glb"
        position = {[1,height*-3,0]}
      />
       <Model
        scale = {.5}
        modelFile="/3d/thumbs-up.glb"
        position = {[0,height*-3.9,0]}
      />
    </>
  )
}


function LoadingState() {

  return (
    <div className="statement fallback">
      <div className="glass">
        <h1>I am a product designer</h1>
        <p>Experienced in VR, privacy, search, and social.</p> 
        <p>Particularly skilled with designing complex systems, working horizontally across product verticals, and prototyping.</p>
        <p>Passionate about emerging technologies and social dynamics.</p>
      </div>
    </div>
  )
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle} className="home">
      <Seo title="Home" />
      <React.Suspense fallback={<LoadingState/>}>
        <Canvas className="canvas">
          <ScrollControls
            pages={5}
            distance={1} // A factor that increases scroll bar travel (default: 1)
            damping={.2} // Friction, higher is faster (default: 4)
          >
            <Scroll>              
              <Models/>
            </Scroll>
            <Scroll html>
              <div className="statement intro" style={{top: "4vh"}}>
                <div className="glass">
                  <h1>I am a product designer</h1>
                  <p>Experienced in VR, privacy, search, and social.</p> 
                  <p>Particularly skilled with designing complex systems, working horizontally across product verticals, and prototyping.</p>
                  <p>Passionate about emerging technologies and social dynamics.</p>
                </div>
              </div>
              <div className="statement vr" style={{top: "90vh"}}>
                <div className="glass">
                  <h1>I work on VR privacy to build user trust</h1>
                  <p>
                    Currently shipping privacy experiences for the Meta Quest (f.k.a. Oculus) ecosystem such as <a href="https://www.oculus.com/blog/meta-accounts/">new profile settings</a> and <a href="https://www.oculus.com/blog/meta-quest-pro-privacy/">privacy features</a> for the Quest Pro.
                  </p>
                </div>
              </div>
              <div className="statement fb" style ={{top: "202vh"}}>
                <div className="glass">
                  <h1>I used to work on Facebook</h1>
                  <p>
                    I was a designer on Search, supporting <a href="https://about.fb.com/news/2018/12/facebook-watch-what-weve-built-whats-ahead/">Facebook Watch</a> and Hashtags, collaborating with <a href="https://www.facebook.com/community/whats-new/updating-admin-tools/">Facebook Groups</a>. I worked on discovery, consumption, and creation experiences.
                  </p>
                </div>
              </div>
              <div className="statement others" style ={{top: "310vh"}}>
                <div className="glass">
                  <h1>Sometimes I do other kinds of design</h1>
                  <p>
                    Like making <a href="https://www.veryokvinyl.com/products/the-song-of-saya-official-soundtrack?variant=41649689362622">vinyl obi strips</a>, <a href="https://github.com/tachiyomiorg/tachiyomi">manga apps</a>,  <a href="https://www.instagram.com/bootleggerphil/">cocktails</a>, and <a href="https://www.youtube.com/watch?v=awM5fZc8LSU">emoji</a>.
                  </p>
                </div>
              </div>
              <div className="statement end" style ={{top: "410vh"}}>
                <div className="glass">
                <h1>That's all for now</h1>
                <p>
                  But feel free to <a href="mailto:hi@philkt.me">drop me a line</a> if you're interested in chatting.
                </p>
                </div>
              </div>
            </Scroll>
          </ScrollControls>

          <PerspectiveCamera makeDefault position={[0,0,5]}/>

          
          <directionalLight
            castShadow
            position={[0, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={1}
            shadow-bias={-0.0001}
          />
          <ambientLight intensity={0.7} />

          
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
