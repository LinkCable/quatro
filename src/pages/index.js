import * as React from "react"
import * as THREE from "three";
import { graphql } from "gatsby"

import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import HorizontalScroll from '@oberon-amsterdam/horizontal'
//import "react-horizontal-vertical/dist/index.umd.css";
//import { Rhv } from 'react-horizontal-vertical';


import Layout from "../components/layout"
import Seo from "../components/seo"

//import oculus from '../models/oculus.gltf'

extend({ OrbitControls })

function CameraControls(props) {
  const {
    camera,
    gl: { domElement },
   } = useThree()
   const controls = React.useRef()
   useFrame((state) => controls.current.update())
   camera.position.set( 0, 0, 0 );
   camera.rotation.set( 0, 0, 0 )
   return (<orbitControls ref={controls} args={[camera, domElement]} />)
}

function Box(props) {

  const meta = useGLTF('../../3d/meta.glb')
  const headset = useGLTF('../../3d/headset-res.glb')
  headset.scene.scale.set(10,10, 10);

  let model
  props.model === "meta" ? model = meta : model = headset

  let mixer
  if (model.animations.length) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach(clip => {
        const action = mixer.clipAction(clip)
        action.play();
    });
  }

  const bgModel = React.useRef()
  useFrame((state, delta) => {
    if (model === headset) {
      model.scene.scale.set(20,20,20)
      model.scene.position.set(0, -1, 0)
      bgModel.current.rotation.y -= 0.003
    }
    mixer?.update(delta)
  })

  return <primitive
    ref={bgModel}
    object={model.scene}
    material={model.materials}
    scale={2}
  />
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const container = React.useRef()
  const [model, setModel] = React.useState("meta")

  const listenScrollEvent = (event) => {
    if (event.target.scrollLeft < 1300) {
      setModel("meta")
    } else {
      setModel("duck")
    }
  }



  React.useEffect(() => {
    new HorizontalScroll({
      container: document.querySelector('.container'),
      showScrollbars: false
    });


    let observable = container.current;
    console.log(observable);
    if (observable) {
      observable.addEventListener('scroll', listenScrollEvent);
      return () => {
        observable.removeEventListener('scroll', listenScrollEvent)
      }
    }
    else {
      return () => null
    }




  }, [])


  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <div className="container" ref={container}>
        <div>
          <h1>
            I am a product designer.
          </h1>
          <p>
            Passionate about emerging technologies and social dynamics.
          </p>
        </div>
        <div>
          <h1>
            I currently work on VR Privacy at Meta.
          </h1>
          <p>
            Passionate about emerging technologies and social dynamics.
          </p>
        </div>
        <div>
          <h1>
            I most recently worked on features supporting the Meta Quest Pro launch.
          </h1>
          <p>
            Including work on face and eye tracking, as well as the Meta account.
          </p>
        </div>
        <div>
          <h1>
            This is a test of the pacer system.
          </h1>
        </div>
        <div>
          <h1>
            This is a test of the pacer system.
          </h1>
        </div>
      </div>
      <React.Suspense fallback={null}>
        <Canvas className="canvas">
          <pointLight position={[0, 20, 20]} />
          {/* <rectAreaLight
            width={1}
            height={1}
            color={0xffc9f9}
            intensity={0.6}
            position={[-1, 1, 2]}
            lookAt={[0, 0, 0]}
            penumbra={1}
          /> */}
          <Box position={[0, 0, 0]} model={model} />
          <CameraControls />
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
