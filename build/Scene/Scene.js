"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minMatrix_1 = require("../utils/minMatrix");
const Core_1 = require("../Core/Core");
class Scene {
    constructor(gl) {
        this.gl = gl;
    }
    init(color, width, height) {
        this.gl.clearColor(color[0], color[1], color[2], color[3]);
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.viewport(0, 0, width, height);
    }
    ;
    draw(tmpMatrix, mvpMatrix, invMatrix, uniforms, mode, count, geometry) {
        let m = new minMatrix_1.default();
        m.multiply(tmpMatrix, geometry.mat, mvpMatrix);
        m.inverse(geometry.mat, invMatrix);
        let manager = new Core_1.ShaderManager(this.gl);
        manager.setUniform(uniforms);
        this.gl.drawElements(mode, count, this.gl.UNSIGNED_SHORT, 0);
    }
}
exports.default = Scene;
//# sourceMappingURL=Scene.js.map