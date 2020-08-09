interface Attribute {
    location: GLint;
    stride: number;
}
interface FrameBufferData {
    f: WebGLFramebuffer;
    d: WebGLRenderbuffer;
    t: WebGLTexture;
}
declare class doxas {
    private gl;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    createShader(id: string): WebGLShader;
    createProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram;
    createVBO(data: number[]): WebGLBuffer;
    setAttribute(vbo: WebGLBuffer[], attributes: Attribute[]): void;
    createIBO(data: number[]): WebGLBuffer;
    createTexture(source: string): WebGLTexture;
    createCubeTexture(source: string[]): WebGLTexture;
    createFramebuffer(width: number, height: number): FrameBufferData;
}
export { doxas, Attribute, FrameBufferData };
//# sourceMappingURL=doxas.d.ts.map