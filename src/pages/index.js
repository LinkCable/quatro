import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Canvas, useFrame } from "@react-three/fiber"

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = React.useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = React.useState(false)
  const [active, setActive] = React.useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'blue' : 'orange'} />
    </mesh>
  )
}

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <Canvas>
        <Box position={[-1.2, 0, 0]} />
      </Canvas>
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
