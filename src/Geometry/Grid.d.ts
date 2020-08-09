import Geometry from './Geometry';
interface info {
    p: number[];
    n: number[];
    c: number[];
    t: number[];
    i: number[];
}
declare class Grid extends Geometry {
    init(type: string, size: number, color: number[] | string): info;
}
export default Grid;
//# sourceMappingURL=Grid.d.ts.map