import doxas from '../Core/doxas';

class TextureManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    private wgld = new doxas(this.gl);

    public createTexture(texture : GLenum, source : string) : WebGLTexture {
        
        this.gl.activeTexture(texture);

        let tex : WebGLTexture =  this.wgld.createTexture(source);

        return tex;
    }

    public createCubeTexture = this.wgld.createCubeTexture;
}

export default TextureManager;