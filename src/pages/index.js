import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Canvas, useFrame } from "@react-three/fiber"

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = React.useRef()
  // Set up state for the hovered state
  const [hovered, setHover] = React.useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return the view, these are regular Threejs elements expressed in JSX
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

const Home = ({ data, location }) =>  {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Canvas className="canvas">
        <ambientLight color={0xffffff} />
        <Box position={[0, 0, 0]} />
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
