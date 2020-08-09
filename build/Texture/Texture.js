"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doxas_1 = require("../Core/doxas");
class TextureManager {
    constructor(gl) {
        this.gl = gl;
        this.wgld = new doxas_1.doxas(this.gl);
        this.createCubeTexture = this.wgld.createCubeTexture;
    }
    createTexture(texture, source) {
        this.gl.activeTexture(texture);
        let tex = this.wgld.createTexture(source);
        return tex;
    }
}
exports.default = TextureManager;
//# sourceMappingURL=Texture.js.map