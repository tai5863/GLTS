import Geometry from './Geometry';
interface info {
    p: number[];
    n: number[];
    c: number[];
    t: number[];
    i: number[];
}
declare class Torus extends Geometry {
    init(row: number, column: number, irad: number, orad: number, color: number[] | string): info;
}
export default Torus;
//# sourceMappingURL=Torus.d.ts.map