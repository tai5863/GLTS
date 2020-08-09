declare class PerspectiveCamera {
    private position;
    private angle;
    private aspect;
    private near;
    private far;
    constructor(position: number[], angle: number, aspect: number, near: number, far: number);
    update(): Float32Array;
}
export default PerspectiveCamera;
//# sourceMappingURL=Perspective.d.ts.map