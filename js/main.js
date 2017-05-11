var scene = new THREE.Scene();
scene.background = new THREE.Color(0xC4D4CB);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
var accelerationX = accelerationY =  accelerationZ = 0 ;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cubeGeometry = new THREE.CubeGeometry( 10, 10, 1 );
var stickGeometryY = new THREE.CubeGeometry( 8.5, .75, .75 );
var stickGeometryX = new THREE.CubeGeometry( .75,10, .75 );
var sphereGeometry = new THREE.SphereGeometry(.4,10,10);
var metal = new THREE.MeshStandardMaterial( {color: 0x999999, roughness:0.3, metalness:0.7} );
var sphere = new THREE.Mesh(sphereGeometry, metal);

var wood, controls, cube, spotLight;

var loader = new THREE.TextureLoader();

// load a resource
loader.load(
	// resource URL
	"tex/woodsmall.jpg",
	// Function when resource is loaded
	function ( texture ) {
		// do something with the texture
		wood = new THREE.MeshStandardMaterial( { 
			map: texture, 
			roughness: 0.63, 
			metalness:0.31,
			normalScale: new THREE.Vector2( 0.1, 0.1 )
		} );

		addMarbleField();
		render();
	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	// Function called when download errors
	function ( xhr ) {
		console.log( 'An error happened' );
	}
);


function addMarbleField() {
    stickGeometryX.faceVertexUvs[0] = [];

    stickGeometryX.faceVertexUvs[0][0] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0.1, 0)];
    stickGeometryX.faceVertexUvs[0][1] = [new THREE.Vector2(0, 1), new THREE.Vector2(.1, 1), new THREE.Vector2(.1, 0)];

    stickGeometryX.faceVertexUvs[0][2] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0.1, 0)];
    stickGeometryX.faceVertexUvs[0][3] = [new THREE.Vector2(0, 1), new THREE.Vector2(.1, 1), new THREE.Vector2(.1, 0)];

    stickGeometryX.faceVertexUvs[0][4] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0.1, 0)];
    stickGeometryX.faceVertexUvs[0][5] = [new THREE.Vector2(0, 1), new THREE.Vector2(.1, 1), new THREE.Vector2(.1, 0)];

    stickGeometryX.faceVertexUvs[0][6] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0.1, 0)];
    stickGeometryX.faceVertexUvs[0][7] = [new THREE.Vector2(0, 1), new THREE.Vector2(.1, 1), new THREE.Vector2(.1, 0)];

    stickGeometryX.faceVertexUvs[0][8] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0.1, 0)];
    stickGeometryX.faceVertexUvs[0][9] = [new THREE.Vector2(0, 1), new THREE.Vector2(.1, 1), new THREE.Vector2(.1, 0)];

    stickGeometryX.faceVertexUvs[0][10] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0.1, 0)];
    stickGeometryX.faceVertexUvs[0][11] = [new THREE.Vector2(0, 1), new THREE.Vector2(.1, 1), new THREE.Vector2(.1, 0)];

    stickGeometryY.faceVertexUvs[0] = [];

    stickGeometryY.faceVertexUvs[0][0] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0.1), new THREE.Vector2(1, 0)];
    stickGeometryY.faceVertexUvs[0][1] = [new THREE.Vector2(0, .1), new THREE.Vector2(1, 0.1), new THREE.Vector2(1, 0)];

    stickGeometryY.faceVertexUvs[0][2] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0.1), new THREE.Vector2(1, 0)];
    stickGeometryY.faceVertexUvs[0][3] = [new THREE.Vector2(0, .1), new THREE.Vector2(1, 0.1), new THREE.Vector2(1, 0)];

    stickGeometryY.faceVertexUvs[0][4] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0.1), new THREE.Vector2(1, 0)];
    stickGeometryY.faceVertexUvs[0][5] = [new THREE.Vector2(0, .1), new THREE.Vector2(1, 0.1), new THREE.Vector2(1, 0)];

    stickGeometryY.faceVertexUvs[0][6] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0.1), new THREE.Vector2(1, 0)];
    stickGeometryY.faceVertexUvs[0][7] = [new THREE.Vector2(0, .1), new THREE.Vector2(1, 0.1), new THREE.Vector2(1, 0)];

    stickGeometryY.faceVertexUvs[0][8] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0.1), new THREE.Vector2(1, 0)];
    stickGeometryY.faceVertexUvs[0][9] = [new THREE.Vector2(0, .1), new THREE.Vector2(1, 0.1), new THREE.Vector2(1, 0)];

    stickGeometryY.faceVertexUvs[0][10] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 0.1), new THREE.Vector2(1, 0)];
    stickGeometryY.faceVertexUvs[0][11] = [new THREE.Vector2(0, .1), new THREE.Vector2(1, 0.1), new THREE.Vector2(1, 0)];


    cube = new THREE.Mesh(cubeGeometry, wood);

    var stickY1 = new THREE.Mesh(stickGeometryX, wood);
    var stickY2 = new THREE.Mesh(stickGeometryX, wood);
    var stickX1 = new THREE.Mesh(stickGeometryY, wood);
    var stickX2 = new THREE.Mesh(stickGeometryY, wood);

    cube.add(stickX1);
    cube.add(stickX2);
    cube.add(stickY1);
    cube.add(stickY2);

    stickX1.position.set(0, 4.625, 0.75);
    stickX2.position.set(0, -4.625, 0.75);
    stickY1.position.set(4.625, 0, 0.75);
    stickY2.position.set(-4.625, 0, 0.75);
    sphere.position.set(0, 0, .9)

    scene.add(cube);
    cube.add(sphere);

    spotLight = new THREE.SpotLight(0xffffdd, 1, 200, 0.79, 0.2, 1);
    scene.add(spotLight);
    spotLight.target = cube;
    spotLight.position.set(7, 7, 15);

}
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffdd, 0.2)


    scene.add(ambientLight);

    camera.position.z = 15;

    window.ondeviceorientation = function (event) {
        accelerationX = event.beta * (Math.PI / 180);
        accelerationY = event.gamma * (Math.PI / 180);
    }

    var sphereAcceleration = new THREE.Vector3(0, 0, 0);

    var keyboardRotationX = 0;
    var keyboardRotationY = 0;

    document.addEventListener("keydown", function (e) {
        if (e.code == "KeyW") {
            keyboardRotationX++;
        }
        else if (e.code == "KeyS") {
            keyboardRotationX--;
        }
        else if (e.code == "KeyA") {
            keyboardRotationY++;
        }
        else if (e.code == "KeyD") {
            keyboardRotationY--;
        }
    });

    function calculateSphereAcceleration() {
            sphereAcceleration.multiplyScalar(0.95);

        if (!(sphere.position.x <= 3.95 && sphere.position.x >= -3.95)) {
            sphere.position.x = Math.min(3.95, Math.max(sphere.position.x, -3.95));
            sphereAcceleration = sphereAcceleration.reflect(new THREE.Vector3(1, 0, 0));
        }
        else if (!(sphere.position.y <= 3.95 && sphere.position.y >= -3.95)) {
            sphere.position.y = Math.min(3.95, Math.max(sphere.position.y, -3.95));
            sphereAcceleration = sphereAcceleration.reflect(new THREE.Vector3(0, 1, 0));

        }
        else {
            sphereAcceleration.x += cube.rotation.y / 15;
            sphereAcceleration.y += -cube.rotation.x / 15;
        }

    }

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        cube.rotation.x = accelerationX + (keyboardRotationX / 25);
        cube.rotation.y = accelerationY + (keyboardRotationY / 25);
        calculateSphereAcceleration();
        sphere.position.x += sphereAcceleration.x;
        sphere.position.y += sphereAcceleration.y;


        controls.update();
    }
