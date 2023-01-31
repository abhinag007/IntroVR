import * as THREE from './libs/three/three.module.js';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.min.js";
// import { MarchingCubes } from '../three/examples/jsm/objects/MarchingCubes.js';
// import { VRButton } from '../three/examples/jsm/webxr/VRButton.js';
// import { CSS3DRenderer, CSS3DObject} from '../three/examples/jsm/renderers/CSS3DRenderer.js'

import { VRButton } from './libs/VRButton.js';
// import ThreeMeshUI from './three-mesh-ui/src/three-mesh-ui.js'



let container;
let camera, scene, renderer;
let controller1, controller2;

let controls, blob;

let points = [];

let moon, jeff;

class App {

    constructor() {
        this.init();
        // this.initBlob();
        console.log("done");
        this.animate();
    }

    init() {

        container = document.createElement('div');
        document.body.appendChild(container);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);



        // const spaceTexture = new THREE.TextureLoader().load('space.jpg');
        // scene.background = spaceTexture;

        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 50);
        camera.position.set(0, 1.6, 3);

        controls = new OrbitControls(camera, container);
        controls.target.set(0, 1.6, 0);
        controls.update();

        Array(400).fill().forEach(this.addStar);

        const moonTexture = new THREE.TextureLoader().load('moon.jpg');
        const normalTexture = new THREE.TextureLoader().load('normal.jpg');

        moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({
            map: moonTexture,
            normalMap: normalTexture,
        })
        );

        scene.add(moon);

        
        moon.position.z = 30;
        moon.position.y = 10;
        moon.position.setX(-10);


        // Avatar

        const jeffTexture = new THREE.TextureLoader().load('jeff.png');

        jeff = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: jeffTexture }));

        scene.add(jeff);
        jeff.position.z = -1
        jeff.position.setX(-5);


        // const tableGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.5);
        // const tableMaterial = new THREE.MeshStandardMaterial({
        //     color: 0x444444,
        //     roughness: 1.0,
        //     metalness: 0.0
        // });
        // const table = new THREE.Mesh(tableGeometry, tableMaterial);
        // table.position.y = 0.35;
        // table.position.z = 0.85;
        // scene.add(table);

        // const floorGometry = new THREE.PlaneGeometry(4, 4);
        // const floorMaterial = new THREE.MeshStandardMaterial({
        //     color: 0x222222,
        //     roughness: 1.0,
        //     metalness: 0.0
        // });
        // const floor = new THREE.Mesh(floorGometry, floorMaterial);
        // floor.rotation.x = - Math.PI / 2;
        // scene.add(floor);

        // const grid = new THREE.GridHelper(10, 20, 0x111111, 0x111111);
        // grid.material.depthTest = false; // avoid z-fighting
        // scene.add(grid);

       

        scene.add(new THREE.HemisphereLight(0x888877, 0x777788));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 6, 0);
        scene.add(light);

        // Create Text
        // const loader = new THREE.FontLoader();

        // loader.load('./fonts/Kwokwi_Regular.json', function (font){
        //     const geometry = new THREE.TextGeometry("Credex Technology",{
        //         font:font,
        //         size:0.2,
        //         height:0.1,
        //     })

        //     const textMesh  = new THREE.Mesh(geometry,[
        //         new THREE.MeshPhongMaterial({color: 0xad4000}),
        //         new THREE.MeshPhongMaterial({color: 0x5c2301})
        //     ])
        //     textMesh.rotation.x = 15;
        //     textMesh.rotation.y = 2;
 
        //     scene.add(textMesh);
        // });


        //

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.xr.enabled = true;
        container.appendChild(renderer.domElement);


        var map = new THREE.TextureLoader().load( "all1.png" );
        var material1 = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
        var sprite = new THREE.Sprite( material1 );
        sprite.position.set(0,1,5);
        sprite.scale.set( 9, 9, 1 );
        scene.add( sprite );
        

        var map = new THREE.TextureLoader().load( "party.png" );
        var material1 = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
        var sprite = new THREE.Sprite( material1 );
        sprite.position.set(10,0,-5);
        sprite.scale.set( 18, 9, 1 );
        scene.add( sprite );

        // const interaction = new THREE.interaction(renderer, scene, camera);


        // const cube = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshBasicMaterial({ color: 0xffffff }),
        //   );
        //   scene.add(cube);
        //   cube.cursor = 'pointer';
        //   cube.on('click', function(ev) {
        //     console.log("Clicked")
        //   });
        //   cube.on('touchstart', function(ev) {});
        //   cube.on('touchcancel', function(ev) {});
        //   cube.on('touchmove', function(ev) {});
        //   cube.on('touchend', function(ev) {});
        //   cube.on('mousedown', function(ev) {});
        //   cube.on('mouseout', function(ev) {});
        //   cube.on('mouseover', function(ev) {});
        //   cube.on('mousemove', function(ev) {});
        //   cube.on('mouseup', function(ev) {});
        //   // and so on ...
          
        //   /**
        //    * you can also listen at parent or any display-tree node,
        //    * source event will bubble up along with display-tree.
        //    */
        //   scene.on('touchstart', ev => {
        //     console.log(ev);
        //   })
        //   scene.on('touchmove', ev => {
        //     console.log(ev);
        //   })
          




        // document.body.appendChild(VRButton.createButton(renderer));
        const btn = new VRButton( renderer );


        // this.createButton();
        // controllers


        function onSelectStart() {

            this.userData.isSelecting = true;
            // camera.position.z += 0.01;
            // onSelectStart();

            window.location.replace("https://meta2-omega.vercel.app/");


        }
        
        
        function onSelectEnd() {

            this.userData.isSelecting = false;

        }

        controller1 = renderer.xr.getController(0);
        controller1.addEventListener('selectstart', onSelectStart);
        controller1.addEventListener('selectend', onSelectEnd);
        controller1.userData.id = 0;
        scene.add(controller1);

        controller2 = renderer.xr.getController(1);
        controller2.addEventListener('selectstart', onSelectStart);
        controller2.addEventListener('selectend', onSelectEnd);
        controller2.userData.id = 1;
        scene.add(controller2);

        //

        const geometry = new THREE.CylinderGeometry(0.01, 0.02, 0.08, 5);
        geometry.rotateX(- Math.PI / 2);
        const material = new THREE.MeshStandardMaterial({ flatShading: true });
        const mesh = new THREE.Mesh(geometry, material);

        const pivot = new THREE.Mesh(new THREE.IcosahedronGeometry(0.01, 3));
        pivot.name = 'pivot';
        pivot.position.z = - 0.05;
        mesh.add(pivot);

        controller1.add(mesh.clone());
        controller2.add(mesh.clone());

        //

        window.addEventListener('resize', this.onWindowResize);

    }

    zoomCamera(){
        camera.position.z +=1;
    }

    addStar() {
        const geometry = new THREE.SphereGeometry(0.25, 24, 24);
        const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geometry, material);
      
        const [x, y, z] = Array(3)
          .fill()
          .map(() => THREE.MathUtils.randFloatSpread(100));
      
        star.position.set(x, y, z);
        scene.add(star);
      }


    initBlob() {


        // const material = new THREE.MeshStandardMaterial({
        //     color: 0xffffff,
        //     // envMap: reflectionCube,
        //     roughness: 0.9,
        //     metalness: 0.0,
        //     transparent: true
        // });

        // blob = new MarchingCubes(64, material, false, false, 500000);
        // blob.position.y = 1;
        // scene.add(blob);

        // this.initPoints();

    }

    // initPoints() {

    //     points = [
    //         { position: new THREE.Vector3(), strength: 0.04, subtract: 10 },
    //         { position: new THREE.Vector3(), strength: - 0.08, subtract: 10 }
    //     ];

    // }

    onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    //

    animate() {

        renderer.setAnimationLoop(this.render);

    }

    // transformPoint(vector) {

    //     vector.x = (vector.x + 1.0) / 2.0;
    //     vector.y = (vector.y / 2.0);
    //     vector.z = (vector.z + 1.0) / 2.0;

    // }

    handleController(controller) {

        // const pivot = controller.getObjectByName('pivot');

        // if (pivot) {

        //     const id = controller.userData.id;
        //     const matrix = pivot.matrixWorld;

        //     points[id].position.setFromMatrixPosition(matrix);
        //     transformPoint(points[id].position);

        //     if (controller.userData.isSelecting) {

        //         const strength = points[id].strength / 2;

        //         const vector = new THREE.Vector3().setFromMatrixPosition(matrix);

        //         transformPoint(vector);

        //         points.push({ position: vector, strength: strength, subtract: 10 });

        //     }

        // }

    }

   


    render() {
        const t = document.body.getBoundingClientRect().top;

        // this.handleController(controller1);
        // this.handleController(controller2);

        // const t = document.body.getBoundingClientRect().top;
        moon.rotation.x += 0.01;
        // moon.rotation.y += 0.075;
        // moon.rotation.z += 0.05;
      
        jeff.rotation.x += 0.01;
        jeff.rotation.y += 0.01;
        jeff.rotation.z += 0.01;


        renderer.render(scene, camera);

    }
}
export { App };
