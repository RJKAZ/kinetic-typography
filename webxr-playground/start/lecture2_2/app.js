import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );


				// in this code we create a camera, specifically a perspective camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
				this.camera.position.set( 0, 0, 4);

				// this code is creating a default scene which is white
				this.scene = new THREE.Scene();
				// this code is making the scene gray by using a hex value
				this.scene.background = new THREE.Color( 0xaaaaaa);

				// now our Three.js object will be black unless we add light
				const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
				this.scene.add(ambient);

				const light = new THREE.DirectionalLight();
				light.position.set(0.2, 1, 1);
				this.scene.add(light);

				// then we create the renderer which is an instance of a WebGL renderer
				// setting the Anti-Alias to true is very very important, especially if you have a 3D headset, otherwise eveything will be jagged
				this.renderer = new THREE.WebGLRenderer({ antialias: true });
				// setting the pixel ratio keeps things from being blurry 
				this.renderer.setPixelRatio( window.devicePixelRatio);
				// this sets the size of the renderer which is taking in the full window's width and height of our screen.
				this.renderer.setSize( window.innerWidth, window.innerHeight);
				// and when a new renderer is created, it creates a dom element and needs to be added to the container 
				container.appendChild(this.renderer.domElement);
				//  the renderer has a method called setAnimationLoop that has a callback

				this.renderer.setAnimationLoop( this.render.bind(this));

				// now lets add an object to the scene
				
				// this creates a box
				const geometry = new THREE.BoxBufferGeometry();
				// this creatres the material that colors the box
				const material = new THREE.MeshStandardMaterial({color: 0xff0000});

				this.mesh = new THREE.Mesh(geometry, material);

				this.scene.add(this.mesh);

				// we add an orbit controller so the user can interact with the object

				const controls = new OrbitControls( this.camera, this.renderer.domElement);

        window.addEventListener('resize', this.resize.bind(this) );
	}	
    
    resize(){
			// this is to make it responsive to screen size
			this.camera.aspect = window.innerWidth/window.innerHeight;
			//this.camera.updateProjectionMatrix(); commenting out this line creates a unique effect when we resize the renderer
			this.renderer.setSize( window.innerWidth, window.innerHeight);
        
    }
    
	render( ) {  
		//to rotate the cube
		this.mesh.rotateY( 0.01);
		this.renderer.render(this.scene, this.camera)
        
    }
}

export { App };