import Geometry from './Geometry';
interface info {
    p: number[];
    n: number[];
    c: number[];
    t: number[];
    i: number[];
}
declare class Sphere extends Geometry {
    init(row: number, column: number, rad: number, color: number[] | string): info;
}
export default Sphere;
//# sourceMappingURL=Sphere.d.ts.map