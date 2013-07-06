var renderer, scene, camera;

function setup()
{
	// set the scene size
	var WIDTH = 640,
	  HEIGHT = 360;

	// // set some camera attributes
	var VIEW_ANGLE = 45,
	  ASPECT = WIDTH / HEIGHT,
	  NEAR = 0.1,
	  FAR = 10000;

	var c = document.getElementById("gameCanvas");

	// // create a WebGL renderer, camera
	// // and a scene
	renderer = new THREE.WebGLRenderer();
	camera =
	  new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

	scene = new THREE.Scene();

	// // add the camera to the scene
	scene.add(camera);

	// // the camera starts at 0,0,0
	// // so pull it back
	camera.position.z = 300;

	// // start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// // attach the render-supplied DOM element
	c.appendChild(renderer.domElement);

	// // set up the sphere vars
	var radius = 50,
		segments = 36,
		rings = 36;
		
	// // create the sphere's material
	var sphereMaterial =
	  new THREE.MeshLambertMaterial(
		{
		  color: 0xFF5000
		});
		
	// // create a new mesh with
	// // sphere geometry - we will cover
	// // the sphereMaterial next!
	var sphere = new THREE.Mesh(

	  new THREE.SphereGeometry(
		radius,
		segments,
		rings),

	  sphereMaterial);

	// // add the sphere to the scene
	scene.add(sphere);

	// // create a point light
	var pointLight =
	  new THREE.PointLight(0xFFFFFF);

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);
	
	draw();
}

function draw()
{	
	renderer.render(scene, camera);

	requestAnimationFrame(draw);
}