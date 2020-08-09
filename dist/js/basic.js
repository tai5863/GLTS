import GLTS from 'GLTS.js';

window.onload = () => {
    const canvas = document.body.appendChild(document.createElement('canvas'));
	const gl = canvas.getContext('webgl');
	
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
		{ name : 'color', stride : 4 }, 
		{ name : 'textureCoord', stride : 2 }
	];

    let attributes = glts.ShaderManager.addAttribute(prg, attInfo);

	let torus = new glts.Torus();
	let tData = torus.init(16, 16, 0.5, 1.5, [1.0, 1.0, 1.0, 1.0]);
	
	let geometry = [tData];
	let buffer = glts.BufferManager.geometry(geometry);

	let m = glts.matIV;
	
	let tmpMatrix = m.init();
	let mvpMatrix = m.init();
	let invMatrix = m.init();
	
	let lightDirection = [-0.5, 1.0, 0.5];
	
	let count = 0;

	let camera = new glts.PerspectiveCamera([0.0, 0.0, 20.0], 45, canvas.width / canvas.height, 0.1, 100);

	render();
	
	function render() {
        count++;
		
		let rad = (count % 360) * Math.PI / 180;

		glts.Scene.init([0.0, 0.0, 0.0, 1.0], canvas.width, canvas.height);

		glts.ShaderManager.setAttribute(buffer[0].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[0].ibo);

		tmpMatrix = camera.update();

		torus.clear();
		torus.rotate(rad, [1, 1, 1]);
		let uniInfo = [
			{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix }, 
			{ name : 'invMatrix', type : 'm4fv', value : invMatrix },
			{ name : 'lightDirection', type : '3fv', value : lightDirection }
		];
		glts.Scene.draw(tmpMatrix, mvpMatrix, invMatrix, glts.ShaderManager.addUniform(prg, uniInfo), gl.LINE_STRIP, tData.i.length, torus);
		
		gl.flush();

		requestAnimationFrame(render);
	}
};