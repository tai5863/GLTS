declare class matIV {
    create(): Float32Array;
    mat: Float32Array;
    identity(dest: Float32Array): Float32Array;
    init(): Float32Array;
    multiply(mat1: Float32Array, mat2: Float32Array, dest: Float32Array): Float32Array;
    scale(mat: Float32Array, vec: Float32Array, dest: Float32Array): Float32Array;
    translate(mat: Float32Array, vec: Float32Array, dest: Float32Array): Float32Array;
    rotate(mat: Float32Array, angle: number, axis: number[], dest: Float32Array): Float32Array | null;
    lookAt(eye: number[], center: number[], up: number[], dest: Float32Array): Float32Array;
    perspective(fov: number, aspect: number, near: number, far: number, dest: Float32Array): Float32Array;
    transpose(mat: Float32Array, dest: Float32Array): Float32Array;
    inverse(mat: Float32Array, dest: Float32Array): Float32Array;
}
export default matIV;
//# sourceMappingURL=minMatrix.d.ts.map