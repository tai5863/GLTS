"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minMatrix_1 = require("../utils/minMatrix");
class PerspectiveCamera {
    constructor(position, angle, aspect, near, far) {
        this.position = position;
        this.angle = angle;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    update() {
        let m = new minMatrix_1.default();
        let vMatrix = m.init();
        let pMatrix = m.init();
        let tmpMatrix = m.init();
        m.lookAt(this.position, [0, 0, 0], [0, 1, 0], vMatrix);
        m.perspective(this.angle, this.aspect, this.near, this.far, pMatrix);
        m.multiply(pMatrix, vMatrix, tmpMatrix);
        return tmpMatrix;
    }
}
exports.default = PerspectiveCamera;
//# sourceMappingURL=Perspective.js.map