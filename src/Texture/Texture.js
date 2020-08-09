import { doxas } from '../Core/doxas';
var TextureManager = /** @class */ (function () {
    function TextureManager(gl) {
        this.gl = gl;
        this.wgld = new doxas(this.gl);
        this.createCubeTexture = this.wgld.createCubeTexture;
    }
    TextureManager.prototype.createTexture = function (texture, source) {
        this.gl.activeTexture(texture);
        var tex = this.wgld.createTexture(source);
        return tex;
    };
    return TextureManager;
}());
export default TextureManager;
//# sourceMappingURL=Texture.js.map