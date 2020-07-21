import GLTS from './GLTS/init';
import matIV from './GLTS/utils/minMatrix';

window.onload = () : void => {
    const canvas : HTMLCanvasElement = document.body.appendChild(document.createElement('canvas'));
    const gl : WebGLRenderingContext = canvas.getContext('webgl')!;

    let glts = new GLTS(gl);
	let prg = glts.init('vs', 'fs');
	
	let attInfo = [
		{ name : 'position', stride : 3 }, 
		{ name : 'normal', stride : 3 }, 
		{ name : 'color', stride : 4 }, 
	];

    let attributes = glts.Attribute.add(prg, attInfo);

	let sphere = glts.Sphere;
	let sData = sphere.init(64, 64, 1.5, [1, 1, 1, 1]);
	
	let torus = glts.Torus;
	let tData = torus.init(64, 64, 0.5, 1.5, [1, 1, 1, 1]);
	
	let cube = glts.Cube;
	let cData = cube.init(2.0, [1, 1, 1, 1]);
	
	let geometry = [sData, tData, cData];
	let buffer = glts.Buffer.add(geometry);

	let m = new matIV();
	
	let vMatrix = m.init();
	let pMatrix  = m.init();
	let tmpMatrix = m.init();
	let mvpMatrix = m.init();
	let invMatrix = m.init();
	
	let lightDirection = [-0.5, 1.0, 0.5];
	
	let ambientColor = [0.1, 0.1, 0.1, 1.0];

	let eyeDirection = [0.0, 0.0, 20.0];
	
	m.lookAt(eyeDirection, [0, 0, 0], [0, 1, 0], vMatrix);
	const resizeCanvas = () => {
        canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		m.perspective(45, canvas.width / canvas.height, 0.1, 100, pMatrix);
		m.multiply(pMatrix, vMatrix, tmpMatrix);
    }
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();

	let uniInfo = [
		{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix }, 
		{ name : 'invMatrix', type : 'm4fv', value : invMatrix },
		{ name : 'lightDirection', type : '3fv', value : lightDirection },
		{ name : 'eyeDirection', type : '3fv', value : eyeDirection },
		{ name : 'ambientColor', type : '4fv', value : ambientColor }
	];
    
    let uniforms = glts.Uniform.add(prg, uniInfo);
	
	let count = 0;
	
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.enable(gl.CULL_FACE);

	render();
	
	function render() : void {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.viewport(0, 0, canvas.width, canvas.height);
		
		count++;
		
		let rad = (count % 360) * Math.PI / 180;
		
		glts.Attribute.set(buffer[0].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[0].ibo);
		sphere.clear();
		sphere.translate([-5.0, 0.0, 0.0]);
		sphere.rotate(rad, [0, 1, 1]);

		m.multiply(tmpMatrix, sphere.mat, mvpMatrix);
		
		m.inverse(sphere.mat, invMatrix);
		
		glts.Uniform.set(uniforms);
		
		gl.drawElements(gl.LINES, sData.i.length, gl.UNSIGNED_SHORT, 0);

		glts.Attribute.set(buffer[1].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[1].ibo);
		torus.clear();
		torus.translate([0.0, 0.0, 0.0]);
		torus.rotate(rad, [1, 1, 0]);

		m.multiply(tmpMatrix, torus.mat, mvpMatrix);
		
		m.inverse(torus.mat, invMatrix);
		
		glts.Uniform.set(uniforms);
		
		gl.drawElements(gl.LINES, tData.i.length, gl.UNSIGNED_SHORT, 0);

		glts.Attribute.set(buffer[2].vbo, attributes);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer[2].ibo);
		cube.clear();
		cube.translate([5.0, 0.0, 0.0]);
		cube.rotate(rad, [1, 0, 1]);

		m.multiply(tmpMatrix, cube.mat, mvpMatrix);
		
		m.inverse(cube.mat, invMatrix);
		
		glts.Uniform.set(uniforms);
		
		gl.drawElements(gl.LINE_STRIP, cData.i.length, gl.UNSIGNED_SHORT, 0);
		
		gl.flush();
		
		requestAnimationFrame(render);
	}
};