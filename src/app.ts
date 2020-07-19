import GLTS from './init';
import matIV from './minMatrix';

window.onload = () : void => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const gl : WebGLRenderingContext = canvas.getContext('webgl')!;
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, false);

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

    let attributes = glts.getAttributes(prg, attPudding);

	let torusData = glts.Sphere(64, 64, 1.5, 'hsva');
	let position = torusData.p;
	let normal = torusData.n;
	let color = torusData.c;
	let index = torusData.i;
	
	let pos_vbo : WebGLBuffer = glts.doxas.createVBO(position);
	let nor_vbo : WebGLBuffer = glts.doxas.createVBO(normal);
	let col_vbo : WebGLBuffer = glts.doxas.createVBO(color);
	
	glts.doxas.setAttribute([pos_vbo, nor_vbo, col_vbo], attributes);
	
	let ibo : WebGLBuffer = glts.doxas.createIBO(index);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

	let m = new matIV();
	
	let mMatrix : Float32Array = m.identity(m.create());
	let vMatrix : Float32Array = m.identity(m.create());
	let pMatrix : Float32Array = m.identity(m.create());
	let tmpMatrix : Float32Array = m.identity(m.create());
	let mvpMatrix : Float32Array = m.identity(m.create());
	let invMatrix : Float32Array = m.identity(m.create());
	
	let lightDirection : number[] = [-0.5, 1.0, 0.5];
	
	let ambientColor : number[] = [0.1, 0.1, 0.1, 1.0];

	let eyeDirection : number[] = [0.0, 0.0, 20.0];
	
	m.lookAt(eyeDirection, [0, 0, 0], [0, 1, 0], vMatrix);
	m.perspective(45, canvas.width / canvas.height, 0.1, 100, pMatrix);
	m.multiply(pMatrix, vMatrix, tmpMatrix);

	let uniPudding = [
		{ name : 'mvpMatrix', type : 'm4fv', value : mvpMatrix }, 
		{ name : 'invMatrix', type : 'm4fv', value : invMatrix },
		{ name : 'lightDirection', type : '3fv', value : lightDirection },
		{ name : 'eyeDirection', type : '3fv', value : eyeDirection },
		{ name : 'ambientColor', type : '4fv', value : ambientColor }
	];
    
    let uniforms = glts.getUniforms(prg, uniPudding);
	
	let count : number = 0;
	
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.enable(gl.CULL_FACE);

	console.log('initialization finished successfully!');

	// render();
	
	function render() : void {
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		count++;
		
		let rad : number = (count % 360) * Math.PI / 180;
		
		m.identity(mMatrix);
		m.rotate(mMatrix, rad, [0, 1, 1], mMatrix);
		m.multiply(tmpMatrix, mMatrix, mvpMatrix);
		
		m.inverse(mMatrix, invMatrix);
		
		glts.setUniforms(uniforms);
		
		gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
		
		gl.flush();
		
		requestAnimationFrame(render);
	}
};