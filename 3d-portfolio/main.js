import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
// the perspective camera is the most common 3JS camera, and it mimicks what the human eyeballs would see
// it takes 4 arguments, 1st is field of view(whats visible), 2nd is aspect ratio (which is based off the users browsers window, and you get that by dividing the window.innerWidth by the window.innerHeight)
// 3rd is the view frustum (to control which objects are visible to the camera itself) and 4th is 1000th which means we can see everything.  
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// now that we have a camera, we need a renderer to render the actual graphics to the screen.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});