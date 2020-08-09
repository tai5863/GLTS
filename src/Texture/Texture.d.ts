declare class TextureManager {
    private gl;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    private wgld;
    createTexture(texture: GLenum, source: string): WebGLTexture;
    createCubeTexture: (source: string[]) => WebGLTexture;
}
export default TextureManager;
//# sourceMappingURL=Texture.d.ts.map