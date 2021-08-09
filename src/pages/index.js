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
  console.log(props)
  console.log(oculus)

  const gltf = useLoader(GLTFLoader, oculus)
  const model = React.useRef()
  useFrame((state, delta) => (model.current.rotation.y -= 0.01))

  return <primitive
    ref={model}
    object={gltf.scene}
    scale={2}
  />
  /*
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={3}
    >
        <boxGeometry args={[2 ,.5 , 1]} />
        <meshStandardMaterial color={props.color}/>
    </mesh>
  )*/
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  const container = React.useRef()
  const [model, setModel] = React.useState("orange")

  const listenScrollEvent = (event) => {
    console.log(event.target.scrollLeft)
    if (event.target.scrollLeft < 2000) {
      setModel("orange")
    } else {
      setModel("blue")
    }
  }

  React.useEffect(() => {
    new HorizontalScroll({ container:  document.querySelector('.container') });
    container.current.addEventListener('scroll', listenScrollEvent);
    return () => {
      container.current.removeEventListener('scroll', listenScrollEvent)
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
          <Box position={[0, 0, 0]} color={model} />
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
