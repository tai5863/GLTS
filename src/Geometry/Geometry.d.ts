declare class Geometry {
    mat: Float32Array;
    clear(): Float32Array;
    scale(vec: number[]): Float32Array;
    translate(vec: number[]): Float32Array;
    rotate(angle: number, axis: number[]): Float32Array | null;
    transpose(): Float32Array;
    inverse(): Float32Array;
}
export default Geometry;
//# sourceMappingURL=Geometry.d.ts.map