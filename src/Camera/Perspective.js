import matIV from '../utils/minMatrix';
var PerspectiveCamera = /** @class */ (function () {
    function PerspectiveCamera(position, angle, aspect, near, far) {
        this.position = position;
        this.angle = angle;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    PerspectiveCamera.prototype.update = function () {
        var m = new matIV();
        var vMatrix = m.init();
        var pMatrix = m.init();
        var tmpMatrix = m.init();
        m.lookAt(this.position, [0, 0, 0], [0, 1, 0], vMatrix);
        m.perspective(this.angle, this.aspect, this.near, this.far, pMatrix);
        m.multiply(pMatrix, vMatrix, tmpMatrix);
        return tmpMatrix;
    };
    return PerspectiveCamera;
}());
export default PerspectiveCamera;
//# sourceMappingURL=Perspective.js.map