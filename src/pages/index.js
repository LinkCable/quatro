import * as React from "react"
import { Link, graphql } from "gatsby"

import { Canvas, useFrame, extend, useThree, useLoader} from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//import useHorizontal from '@oberon-amsterdam/horizontal/hook'
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
   return (<orbitControls ref={controls} args={[camera, domElement]} />)
}

function Box(props) {

  console.log(props.model)
  const oculus_gltf = useLoader(GLTFLoader, oculus)
  const duck_gltf = useLoader(GLTFLoader, duck)

  let gltf
  props.model === "oculus" ? gltf = oculus_gltf : gltf = duck_gltf

  console.log(gltf)

  const bgModel = React.useRef()
  useFrame((state, delta) => (bgModel.current.rotation.y -= 0.01))

  return <primitive
    ref={bgModel}
    object={gltf.scene}
    scale={2}
  />
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const container = React.useRef()
  const [model, setModel] = React.useState("oculus")

  const listenScrollEvent = (event) => {
    if (event.target.scrollLeft < 2000) {
      setModel("oculus")
    } else {
      setModel("heart")
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

  //console.log(scrollDistance)

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
          <rectAreaLight
            width={3}
            height={3}
            color={0xffc9f9}
            intensity={5.6}
            position={[-1, 1, 2]}
            lookAt={[0, 0, 0]}
            penumbra={1}
          />
          <Box position={[0, 0, 0]} model={model}/>
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
