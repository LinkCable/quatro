import * as React from "react"
import * as THREE from "three";
import { graphql } from "gatsby"

import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import HorizontalScroll from '@oberon-amsterdam/horizontal'

import Layout from "../components/layout"
import Seo from "../components/seo"

import oculus from '../models/oculus.gltf'
import duck from '../models/duck/duck.gltf'

extend({ OrbitControls })

function CameraControls(props) {
  const {
    camera,
    gl: { domElement },
   } = useThree()
   const controls = React.useRef()
   useFrame((state) => controls.current.update())
   camera.position.set( 0, 0, 10 );
   return (<orbitControls ref={controls} args={[camera, domElement]} />)
}

function Box(props) {

  const meta = useGLTF('../../3d/meta.glb')
  const headset = useGLTF('../../3d/headset-res.glb')
  const oculus_gltf = useGLTF(oculus)
  const duck_gltf = useGLTF(duck)

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
      bgModel.current.rotation.y -= 0.01
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
    if (event.target.scrollLeft < 2000) {
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
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
        <h1>
          This is a test of the pacer system.
        </h1>
      </div>
      <React.Suspense fallback={null}>
        <Canvas className="canvas">
          <ambientLight />
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
