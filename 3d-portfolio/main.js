import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

// the perspective camera is the most common 3JS camera, and it mimicks what the human eyeballs would see
// it takes 4 arguments, 1st is field of view(whats visible), 2nd is aspect ratio (which is based off the users browsers window, and you get that by dividing the window.innerWidth by the window.innerHeight)
// 3rd is the view frustum (to control which objects are visible to the camera itself) and 4th is 1000th which means we can see everything.  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// now that we have a camera, we need a renderer to render the actual graphics to the screen. The renderer needs to know which dom element to use, Which will be the canvas with the id of background 
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// these help set the screen to match the users screen 
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
// by default the camera is positioned in the middle of the scene, so will move the camera's postion along the z-axis

camera.position.setZ(30);

// now the final thing we'll do is call the renderer's render method passing in the scene and the camera as arguments

renderer.render(scene, camera);

// this gives us a blank screen, so we need to add an object to it
// Creating an object requires three steps
// creating the Gerometry, the {x,y,z} points that makeup or define a shape
// threeJS has a ton of prebuilt shapes you can use in the documentation
// for this project we will use the TorusGeometry which is like a big 3D ring  

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100,)

// now we have to give the geometry/shape a material, like a texture or color, or any material to use as a wrapping paper of sorts
// There are many pre-built, but you could make your own (thats way way more advanced THREE.js)
// Materials typically require a light source to bounce off of them, but for this exercise, we will use a basic material which does not require a light source. 

//const material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true }); // we set the wireframe to true to get a better view of the actual geometry 
// update -  we will change the mesh material for one that does take in a light source, and we'll remove the wireframe
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
// Now that that light is a factor, we need to add a light source to see the object

//the third step is to create a mesh which combines the geometry with the material, and the mesh is the actual object we'll be adding to the scene
const torus = new THREE.Mesh( geometry, material);
// and we add it to the scene
scene.add(torus)
// but to acctually see it we need to re-rerender the scene

// renderer.render(scene, camera );

// but that can get kind of annoying, so we will use a function instead
// this function is basicly telling the browser to make an animation 
// And then the function will trigger the re-render method 
// this kind of creates a loop of sorts (more of a gaming thing)

//so lets add lighting - 
const pointLight = new THREE.PointLight(0xffffff)
// and position the light
// pointLight.position.set(5, 5, 5) - this is too close and only lights up the inside of the shape, so we set it up to 20 to get the full shape - update- we set it back to 5, 5, 5 
pointLight.position.set(5, 5, 5)
// we can also add an ambient light to light up everything
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// since lighting can get confusing, there is one thing we can do to get a little help

// const lightHelper = new THREE.PointLightHelper(pointLight) // this creates a little wireframe that shows the positon and direction of the light source 
// const gridHelper = new THREE.GridHelper(200, 50); // grid helper here will give us a little grey line, thats because our current perspective is level 
// scene.add(lightHelper, gridHelper);
// to make this more interactive we'll use orbit controls 
// so we declare it at the top of the code, and then we add it here passing in the camera and renderer dom element as arguments
const controls = new OrbitControls(camera, renderer.domElement); // this listens to dom events on the mouse and positions the camera accordingly.
// and we have to call this in the animation function 

// Now to occupy the space around everything, we'll add some stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff })
  const star = new THREE.Mesh( geometry, material );
  //creating the star is easy, the tricky part is do randomly place them. 
  // first we need to randomly generate a random x, y, & z postion for every star
  // we do that by filling an array with three values, and then map each value to the THREE.JS random float spread function 
  // The float spread will randomly generate a number from 1 to 100
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
  // we can take those numbers and set the position of the star
  star.position.set(x, y, z) ;
  scene.add(star)
}

// to set how many stars will be in the scene, we'll set an array with a value of 200, and have it call the add star function
Array(200).fill().forEach(addStar);
// so no we have 200 randomly positioned stars, to make it look cooler, we will add a space background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

function moveCamera() {
  //first we need to calculate where the user is currently scrolled to
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  rj.rotation.y += 0.01;
  rj.rotation.z += 0.01;
  // so we rotate both the moon and the avatar, but the most important part is rotateing the position of the camera itself 
  // top value is always negative so multiply it by a negative number
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;


}
document.body.onscroll = moveCamera


function animate() {
  requestAnimationFrame( animate);
  
  //every shape we have takes different properties, like rotation, position, and scale
  //so we want to rotate the object on the x frame by 1 for every frame, and we'll do the same the y & z axis as well
  // so changing this properties inside the look will create the animation 
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  // so now the object is animated in an infinite loop

  controls.update();

  renderer.render(scene, camera);

}

//call the function 
animate()

// and check the browser, and viola 

// For the Avatar

const rjTexture = new THREE.TextureLoader().load('me2.jpg');

const rj = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: rjTexture})
);

scene.add(rj);

// For the Moon 

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

// so lets reposition the moon further down the z-axis
// in THREE.JS the '=' sign is equal to setX (you can use either or)
moon.position.z = 30;
moon.position.setX(-10);



