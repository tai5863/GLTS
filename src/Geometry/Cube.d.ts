import Geometry from './Geometry';
interface info {
    p: number[];
    n: number[];
    c: number[];
    t: number[];
    i: number[];
}
declare class Cube extends Geometry {
    init(side: number, color: number[] | string): info;
}
export default Cube;
//# sourceMappingURL=Cube.d.ts.map