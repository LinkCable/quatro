---
title: My New Website is Up
date: 2023-01-18T18:02:57.208Z
description: Been a long journey...
---
The first commit for this website was on [Jun 15, 2021](https://github.com/LinkCable/quattro/commit/224045acbaa506eca0a2347684c9420909931571) where I had decided "I want to make a website with a blog!"

T﻿hat led me to discovering [Gatsby](https://www.gatsbyjs.com/) and digging into the [JAMStack](https://jamstack.org/), so I would not have to deal with any messy hosting and easily spin up and manage entries. Of course I though it'd be easier than it actually was for me, but the next day Jun 16 I did get it deployed on Netlify.

T﻿he other major investment I made was to dabble with [three.js](https://threejs.org/) and bring in some 3D space into my site, as I had recently moved to designing for Oculus so I wanted my portfolio to reflect some light 3D integration. I kept the premise simple: a basic slideshow of 3D models with some text over them. The two react libraries [three-react-fiber](https://github.com/pmndrs/react-three-fiber) and [react-three/drei](https://github.com/pmndrs/drei) were immensely helpful here. 

T﻿he thing that took the longest and most number of attempts was actually getting horizontal scrolling to work. I went through numerous react libraries that I ended up abandoning as I wasn't thinking in 3D: I should move the camera on the X axis instead of worrying about scrolling the window. That's what `ScrollControls` in `drei` allowed me to do. (but it still doesn't work on mobile shhhh I'm working on it)

I﻿ then downloaded/created my own 3D models to put over the site. Shout out to Elin and Marcus Kane from Sketchfab for the [Meta](https://sketchfab.com/3d-models/meta-logo-913b2a99b7404b80b75a8d3927ce20d0) and [Quest Pro](https://sketchfab.com/3d-models/project-cambria-mockup-ce29a185c5c94e2684315e73c37513ce) models. Had to bust out my Blender skills to clean up the models and also make some of my own. I also leveraged the new [Bezel](https://www.bezel.it/) website which is like Figma but for 3D (started by a former co-worker!)

S﻿ome irritating bugs that still exist is that for some reason the home page does not work on iOS at all! The `canvas` is set to `display: none` just on iOS which makes no sense to me, so hopefully I'll be able to figure it out soon.

But, 1 year and a half later, on 1/18/2023 my site is now live!