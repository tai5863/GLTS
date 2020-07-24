import doxas from '../Core/doxas';

class Texture {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public init(texture : GLenum, source : string) : WebGLTexture {
        
        this.gl.activeTexture(texture);

        let wgld = new doxas(this.gl);

        let tex : WebGLTexture =  wgld.createTexture(source);

        return tex;
    }
}

export default Texture;