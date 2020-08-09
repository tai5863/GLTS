import Geometry from '../Geometry/Geometry';
interface UniformInfo {
    name: string;
    type: string;
    value: Float32Array | number[] | number;
}
interface Uniform {
    location: WebGLUniformLocation;
    data: UniformInfo;
}
declare class Scene {
    private gl;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    init(color: number[], width: number, height: number): void;
    draw(tmpMatrix: Float32Array, mvpMatrix: Float32Array, invMatrix: Float32Array, uniforms: Uniform[], mode: GLenum, count: number, geometry: Geometry): void;
}
export default Scene;
//# sourceMappingURL=Scene.d.ts.map