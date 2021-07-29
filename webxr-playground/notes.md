3d graphics is all about rendering shapes in a 3D space using a coordinates 

webGLRender - y axis points up, 

EUS: East, Up, South 
X Axis points east
Y axis points up
Z axis points south 

Vertices 
- A single vertice is a vertex
- it is a vector value 
- a vector is a group of numbers 
- THREE.js vertex is a Vector3 

An Object is made up of Vertices and Faces 
A cube for examble has 8 vertices and 6 faces. 

A Vector3 value is the direction the face is pointing - this is ususally a unit length 

Next is the material, where you can either color or image map over objects

UV Mapping - Vector2 Value

U - left to right
V - up and down 

Bottom left is (0, 0)
Top right is (1, 1)

Web GL uses shaders 
specifcally a vertex shader and a fragment shader 

The Vertex Shader moves the vertex to normalized clip coordinate
x, y, and z between -1 and 1

Three.js does most of the mathematical heavy lifting, 

Matrices have models, view, and Projection 

fragment shader works at the pixel level

rendering pipeline 
- from 3D data to 2D image
- vertex shader
- fragment shader
-  shaders are designed for parallel processing on GPU devices 

Three.js was created in 2010 by Ricardo Cabello, Mr Doob

WebXR itself is more about how to view/navigate a 3D enviroment, it itself doesn't render a 3D enviroment. 

WebGL is a low-level API for accesing the GPU on the device, it is hard to use. Three.JS makes it easy to use. 

WebXR will split into AR and VR examples

WebXR brings together augmented and virtual realities and serves both via a single API for developers

Quiz Notes 

WebXR must be delivered via https
any http site cannot be a WebXR, it needs the damn s

Github.pages can setup a free secure website/server

Ivan Sutherland is considered the father of computer graphics 

EUS is the coordinate system used by Three.js

Three.js comes in 3 flavors
Javascript
Module JS
TypeScript 

All WebXR examples of Three.js use the module version 

THREE.PerspectiveCamera
- Field of view (fov) in degress
- aspect ratio of rendered view ie, width/height
- near plane. Anything closer than this will be hidden 
- far plane. Anything further away that this will be hidden

Real time computer graphics uses a virtual cage to define a clipping region

this cage is called a Frustrum
  - Keep near and far in a sensible range for your scene
  - the depth buffer uses near and far values
  - near and far values affect the accuracy of the depth buffer for triangles that are a similar distance from the camera

  -- left off on Section 2.8 the THREE.js editor