# GLTS
GLTS is a library for developing with pure WebGL.



## Example

- Install GLTS as npm package

```
npm install -i glts
```

### HTML

```html
<!DOCTYPE html>
<html lang='ja'>
  <head>
    <meta charset="utf-8">
    <title>GLTS</title>
    <script type="module" src="..\node_modules\glts\public\lib\GLTS.js"></script>
    <script id="vs" type="x-shader/x-vertex">
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec4 color;
    uniform   mat4 mvpMatrix;
    uniform   mat4 invMatrix;
    uniform   vec3 lightDirection;
    uniform   vec3 eyeDirection;
    uniform   vec4 ambientColor;
    varying   vec4 vColor;
    
    void main(void){
      vec3  invLight = normalize(invMatrix * vec4(lightDirection, 0.0)).xyz;
      vec3  invEye   = normalize(invMatrix * vec4(eyeDirection, 0.0)).xyz;
      vec3  halfLE   = normalize(invLight + invEye);
      float diffuse  = clamp(dot(normal, invLight), 0.0, 1.0);
      float specular = pow(clamp(dot(normal, halfLE), 0.0, 1.0), 50.0);
      vec4  light    = color * vec4(vec3(diffuse), 1.0) + vec4(vec3(specular), 1.0);
      vColor         = light + ambientColor;
      gl_Position    = mvpMatrix * vec4(position, 1.0);
    }
    </script>
                
    <script id="fs" type="x-shader/x-fragment">
    precision mediump float;

    varying vec4 vColor;
    
    void main(void){
      gl_FragColor = vColor;
    }
    </script>
  </head>
  <body>
    <script src="js/main.js"></script>
  </body>
</html>

```

### Javascript

```js
window.onload = () => {
    // prepare canvas & get webgl context
    const canvas = document.body.appendChild(document.createElement('canvas'));
	const gl = canvas.getContext('webgl');
	
	const resizeCanvas = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	addEventListener('resize', resizeCanvas);
	resizeCanvas();

    // glts
    let glts = new GLTS(gl);
    
    // create program 
	let prg = glts.ProgramManager.init('vs', 'fs');

	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
    // prepare attributes
	let attInfo = [
		{ name : 'position', stride : 3 }, 
		{ name : 'normal', stride : 3 }, 
		{ name : 'color', stride : 4 }, 
		{ name : 'textureCoord', stride : 2 }
	];

    let attributes = glts.ShaderManager.addAttribute(prg, attInfo);

    // prepare geometry
	let torus = new glts.Torus();
	let tData = torus.init(16, 16, 0.5, 1.5, [1.0, 1.0, 1.0, 1.0]);
	
	let geometry = [tData];
	let buffer = glts.BufferManager.geometry(geometry);

    // prepare matrix functions
	let m = glts.matIV;
	
	let tmpMatrix = m.init();
	let mvpMatrix = m.init();
	let invMatrix = m.init();
	
	let lightDirection = [-0.5, 1.0, 0.5];
	
	let count = 0;

    // set camera 
	let camera = new glts.PerspectiveCamera([0.0, 0.0, 20.0], 45, canvas.width / canvas.height, 0.1, 100);

	render();
	
	function render() {
        count++;
		
		let rad = (count % 360) * Math.PI / 180;

        // scene clear
		glts.Scene.init([0.0, 0.0, 0.0, 1.0], canvas.width, canvas.height);

        // set attributes
		glts.ShaderManager.setAttribute(buffer[0].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[0].ibo);

        // update camera
		tmpMatrix = camera.update();

        // update geometry 
		torus.clear();
		torus.rotate(rad, [1, 1, 1]);
		let uniInfo = [
			{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix }, 
			{ name : 'invMatrix', type : 'm4fv', value : invMatrix },
			{ name : 'lightDirection', type : '3fv', value : lightDirection }
		];
        // draw geometry
		glts.Scene.draw(tmpMatrix, mvpMatrix, invMatrix, glts.ShaderManager.addUniform(prg, uniInfo), gl.POINTS, tData.i.length, torus);
		
		gl.flush();

		requestAnimationFrame(render);
	}
};

```

