import * as React from "react"
import { Link, graphql } from "gatsby"

import { Canvas, useFrame, extend, useThree, useLoader} from "@react-three/fiber"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

//import useHorizontal from '@oberon-amsterdam/horizontal/hook'
import HorizontalScroll from '@oberon-amsterdam/horizontal'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import Layout from "../components/layout"
import Seo from "../components/seo"

extend({ OrbitControls })

function CameraControls(props) {
  const {
    camera,
    gl: { domElement },
   } = useThree()
   const controls = React.useRef();
   useFrame((state) => controls.current.update());
   return (<orbitControls ref={controls} args={[camera, domElement]} />)
}

function Box(props) {
  const mesh = React.useRef()
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={3}
    >
        <boxGeometry args={[1, .5, 1]} />
        <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function containerScrolled(props) {
  console.log(props.target.scrollLeft);
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  //const [container, setContainer] = React.useState()
  const container = React.useRef()

  React.useEffect(() => {
    new HorizontalScroll({ container:  document.querySelector('.container') });
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <div className="container" ref={container} onScroll={containerScrolled}>
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
          <ambientLight color={0xffffff} />
          <Box position={[0, 0, 0]} />
          <Box position={[50, 0, 0]} />
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
