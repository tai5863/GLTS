import GLTS from './GLTS/init';
import matIV from './GLTS/utils/minMatrix';

window.onload = () : void => {
    const canvas : HTMLCanvasElement = document.body.appendChild(document.createElement('canvas'));
	const gl : WebGLRenderingContext = canvas.getContext('webgl')!;
	
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
	let tData = torus.init(64, 64, 0.5, 1.5, 'hsva');
	
	let grid = new glts.Grid();
	let gData = grid.init('XY', 3.0, 'texture');
	
	let geometry = [tData, gData];
	let buffer = glts.BufferManager.geometry(geometry);

	let m = new matIV();
	
	let tmpMatrix = m.init();
	let mvpMatrix = m.init();
	let invMatrix = m.init();
	
	let lightDirection = [-0.5, 1.0, 0.5];
	
	let uniInfo = [
		{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix }, 
		{ name : 'invMatrix', type : 'm4fv', value : invMatrix },
		{ name : 'lightDirection', type : '3fv', value : lightDirection }
	];

	let uniforms = glts.ShaderManager.addUniform(prg, uniInfo);
	
	let count = 0;

	let fBufferWidth = 512;
	let fBufferHeight = 512;
	let fBuffer = glts.BufferManager.createFramebuffer(fBufferWidth, fBufferHeight);

	let tCamera = new glts.PerspectiveCamera([0.0, 0.0, 20.0], 45, fBufferWidth / fBufferHeight, 0.1, 100);

	const camera = new glts.PerspectiveCamera([0.0, 0.0, 20.0], 45, canvas.width / canvas.height, 0.1, 100);

	render();
	
	function render() : void {
		count++;
		
		let rad = (count % 360) * Math.PI / 180;

		// render a torus in the framebuffer
		gl.bindFramebuffer(gl.FRAMEBUFFER, fBuffer.f);

		glts.Scene.init([0.0, 0.0, 0.0, 1.0], fBufferWidth, fBufferHeight);

		glts.ShaderManager.setAttribute(buffer[0].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[0].ibo);

		tmpMatrix = tCamera.update();

		torus.clear();
		torus.rotate(rad, [0, 1, 1]);
		glts.Scene.draw(tmpMatrix, mvpMatrix, invMatrix, uniforms, gl.TRIANGLES, tData.i.length, torus);

		// render the real world
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		glts.Scene.init([0.0, 0.7, 1.0, 1.0], canvas.width, canvas.height);

		glts.ShaderManager.setAttribute(buffer[1].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[1].ibo);

		gl.bindTexture(gl.TEXTURE_2D, fBuffer.t);

		tmpMatrix = camera.update();

		grid.clear();
		grid.rotate(rad, [0, 1, 0]);
		glts.Scene.draw(tmpMatrix, mvpMatrix, invMatrix, uniforms, gl.TRIANGLES, gData.i.length, grid);
		
		gl.bindTexture(gl.TEXTURE_2D, null);

		gl.flush();

		requestAnimationFrame(render);
	}
};