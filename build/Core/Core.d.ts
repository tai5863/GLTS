import { doxas } from './doxas';
interface AttribInfo {
    name: string;
    stride: number;
}
interface Attribute {
    location: GLint;
    stride: number;
}
interface UniformInfo {
    name: string;
    type: string;
    value: Float32Array | number[] | number;
}
interface Uniform {
    location: WebGLUniformLocation;
    data: UniformInfo;
}
interface GeometryData {
    p: number[];
    n: number[];
    c: number[];
    t: number[];
    i: number[];
}
interface BufferData {
    vbo: WebGLBuffer[];
    ibo: WebGLBuffer;
}
declare class ProgramManager {
    private gl;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    wgld: doxas;
    init(vs: string, fs: string): WebGLProgram;
}
declare class ShaderManager {
    private gl;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    addAttribute(program: WebGLProgram, attList: AttribInfo[]): Attribute[];
    setAttribute: (vbo: WebGLBuffer[], attributes: import("./doxas").Attribute[]) => void;
    addUniform(program: WebGLProgram, uniList: UniformInfo[]): Uniform[];
    setUniform(uniforms: Uniform[]): void;
}
declare class BufferManager {
    private gl;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    wgld: doxas;
    createIBO: (data: number[]) => WebGLBuffer;
    createFramebuffer: (width: number, height: number) => import("./doxas").FrameBufferData;
    createVBO(data: (number[])[]): WebGLBuffer[];
    geometry(data: GeometryData[]): BufferData[];
}
export { ProgramManager, ShaderManager, BufferManager };
//# sourceMappingURL=Core.d.ts.map