window.onload = () => {
    const canvas = document.body.appendChild(document.createElement('canvas'));
	const gl= canvas.getContext('webgl');
	
	const resizeCanvas = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	addEventListener('resize', resizeCanvas);
	resizeCanvas();

    let glts = new GLTS(gl);
	let prg = glts.ProgramManager.init('vs', 'fs');

	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	
	let attInfo = [
		{ name : 'position', stride : 3 }, 
		{ name : 'normal', stride : 3 }, 
		{ name : 'color', stride : 4 }
	];

	let attributes = glts.ShaderManager.addAttribute(prg, attInfo);
	
	let cube = new glts.Cube();
	let cData = cube.init(2.0, [1.0, 1.0, 1.0, 1.0]);
	
	let geometry = [cData, cData];
	let buffer = glts.BufferManager.geometry(geometry);

	let m = glts.matIV;
	
	let invMatrix = m.init();
	let tmpMatrix = m.init();
	let mvpMatrix = m.init();

	let eyePosition = [0.0, 0.0, 20.0];
	
	let count = 0;

	const camera = new glts.PerspectiveCamera([0.0, 0.0, 20.0], 45, canvas.width / canvas.height, 0.1, 200);

	let cubeSourse = ['./images/cube_PX.png', './images/cube_PY.png', './images/cube_PZ.png', './images/cube_NX.png', './images/cube_NY.png', './images/cube_NZ.png'];

	let cubeTexture = glts.TextureManager.createCubeTexture(cubeSourse);

	render();
	
	function render() {
		count++;
		
		let rad = (count % 360) * Math.PI / 180;

		glts.Scene.init([0.0, 1.0, 0.0, 1.0], canvas.width, canvas.height);

		tmpMatrix = camera.update();

		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, cubeTexture);
		glts.ShaderManager.setAttribute(buffer[0].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[0].ibo);
		cube.clear();
		cube.scale([100, 100, 100]);	
		m.multiply(tmpMatrix, cube.mat, mvpMatrix);
		let uniInfo0 = [
			{ name : 'mMatrix', type : 'm4fv', value : cube.mat },
			{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix }, 
			{ name : 'eyePosition', type : '3fv', value : eyePosition },
			{ name : 'cubeTexture', type : '1i', value : 0 },
			{ name : 'reflection', type : '1i', value : 0 }
		];
		glts.Scene.draw(tmpMatrix, mvpMatrix, invMatrix, glts.ShaderManager.addUniform(prg, uniInfo0), gl.TRIANGLES, cData.i.length, cube);

		glts.ShaderManager.setAttribute(buffer[1].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[1].ibo);
		cube.clear();
		cube.rotate(rad, [0, 1, 1]);
		m.multiply(tmpMatrix, cube.mat, mvpMatrix);
		let uniInfo1 = [
			{ name : 'mMatrix', type : 'm4fv', value : cube.mat },
			{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix },
			{ name : 'reflection', type : '1i', value : 1 }
		];
		glts.Scene.draw(tmpMatrix, mvpMatrix, invMatrix, glts.ShaderManager.addUniform(prg, uniInfo1), gl.TRIANGLES, cData.i.length, cube);
		
		gl.flush();

		requestAnimationFrame(render);
	}
};