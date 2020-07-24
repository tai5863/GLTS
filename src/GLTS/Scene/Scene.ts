import matIV from '../utils/minMatrix';
import {ShaderManager} from '../Core/Core';
import Geometry from '../Geometry/Geometry'

interface UniformInfo {
    name : string;
    type : string;
    value : Float32Array | number[] | number; // valueは拡張する必要あり, とりあえずこんなけ
}

interface Uniform {
    location : WebGLUniformLocation;
    data : UniformInfo; // 全部のデータを設定するのはちょっと無駄
}

class Scene {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public init(color : number[], width : number, height : number) : void {
        
        this.gl.clearColor(color[0], color[1], color[2], color[3]);
		this.gl.clearDepth(1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.gl.viewport(0, 0, width, height);
    };
    
	public draw(tmpMatrix : Float32Array, mvpMatrix : Float32Array, invMatrix : Float32Array, uniforms : Uniform[], mode : GLenum, count : number, geometry : Geometry) : void {
		
		let m = new matIV();

		m.multiply(tmpMatrix, geometry.mat, mvpMatrix);
		
		m.inverse(geometry.mat, invMatrix);

		let manager = new ShaderManager(this.gl);

        manager.setUniform(uniforms);
        
        this.gl.drawElements(mode, count, this.gl.UNSIGNED_SHORT, 0);
	}
}

export default Scene;