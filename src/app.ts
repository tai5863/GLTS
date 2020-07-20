import GLTS from './init';
import matIV from './minMatrix';

window.onload = () : void => {
    const canvas : HTMLCanvasElement = document.body.appendChild(document.createElement('canvas'));
    const gl : WebGLRenderingContext = canvas.getContext('webgl')!;

    if (gl == null) {
        console.log('webgl not available');
        return;
    }

    let glts = new GLTS(gl);
	let prg = glts.init('vs', 'fs');
	
	let attPudding = [
		{ name : 'position', stride : 3 }, 
		{ name : 'normal', stride : 3 }, 
		{ name : 'color', stride : 4 }, 
	];

    let attributes = glts.glAttribute.assign(prg, attPudding);

	let torusData = glts.Sphere(64, 64, 1.5, 'hsva');
	let data = [torusData.p, torusData.n, torusData.c];
	let index = torusData.i;
	
	let VBOs = glts.glBuffer.createVBOs(data);
	
	glts.glAttribute.set(VBOs, attributes);
	
	let ibo = glts.glBuffer.createIBO(index);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

	let m = new matIV();
	
	let mMatrix = m.identity(m.create());
	let vMatrix = m.identity(m.create());
	let pMatrix  = m.identity(m.create());
	let tmpMatrix = m.identity(m.create());
	let mvpMatrix = m.identity(m.create());
	let invMatrix = m.identity(m.create());
	
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
	m.multiply(pMatrix, vMatrix, tmpMatrix);

	let uniPudding = [
		{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix }, 
		{ name : 'invMatrix', type : 'm4fv', value : invMatrix },
		{ name : 'lightDirection', type : '3fv', value : lightDirection },
		{ name : 'eyeDirection', type : '3fv', value : eyeDirection },
		{ name : 'ambientColor', type : '4fv', value : ambientColor }
	];
    
    let uniforms = glts.glUniform.assign(prg, uniPudding);
	
	let count = 0;
	
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.enable(gl.CULL_FACE);

	console.log('initialization finished successfully!');

	render();
	
	function render() : void {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.viewport(0, 0, canvas.width, canvas.height);
		
		count++;
		
		let rad = (count % 360) * Math.PI / 180;
		
		m.identity(mMatrix);
		m.rotate(mMatrix, rad, [0, 1, 1], mMatrix);
		m.multiply(tmpMatrix, mMatrix, mvpMatrix);
		
		m.inverse(mMatrix, invMatrix);
		
		glts.glUniform.set(uniforms);
		
		gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
		
		gl.flush();
		
		requestAnimationFrame(render);
	}
};