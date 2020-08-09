import matIV from '../utils/minMatrix';
import { ShaderManager } from '../Core/Core';
var Scene = /** @class */ (function () {
    function Scene(gl) {
        this.gl = gl;
    }
    Scene.prototype.init = function (color, width, height) {
        this.gl.clearColor(color[0], color[1], color[2], color[3]);
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.viewport(0, 0, width, height);
    };
    ;
    Scene.prototype.draw = function (tmpMatrix, mvpMatrix, invMatrix, uniforms, mode, count, geometry) {
        var m = new matIV();
        m.multiply(tmpMatrix, geometry.mat, mvpMatrix);
        m.inverse(geometry.mat, invMatrix);
        var manager = new ShaderManager(this.gl);
        manager.setUniform(uniforms);
        this.gl.drawElements(mode, count, this.gl.UNSIGNED_SHORT, 0);
    };
    return Scene;
}());
export default Scene;
//# sourceMappingURL=Scene.js.map