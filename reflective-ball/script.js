        import * as THREE from 'three';
       // import { OrbitControls } from './js/OrbitControls.js';
        //import {FlakesTexture} from './js/FlakesTexture.js';
        //import {RGBELoader} from './js/RGBELoader.js';

        let scene, camera, renderer, controls, pointlight; 

        function init() {
            scene = new THREE.Scene();

            renderer = new THREE.WEBGLRenderer({alpha:true, antialias:true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000);
            camera.position.set(0,0,500);
            controls = new OrbitControls(camera, renderer.domElement);

            pointlight = new THREE.PointLight(0xffffff, 1);
            pointlight.position.set(200,200,200);
            scene.add(pointlight);

            let ballGeo = new THREE.SphereGeometry(100,64,64);
            let ballMat = new THREE.MeshPhysicalMaterial();
            let ballMesh = new THREE.Mesh(ballGeo, BallMat);
            scene.add(ballMesh);

            animate();
        }

        function animate() {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        init();