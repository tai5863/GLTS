import Color from '../utils/Color';
import Geometry from './Geometry';

interface info {
    p : number[];
    n : number[];
    c : number[];
    t : number[];
    i : number[];
}

class Grid extends Geometry {
    public init(type : string, size : number,color : number[] | string) : info {

        let pos : number[] = new Array();

        switch (type) {
            case 'XY':
                pos = [
                    -size, size, 0.0,
                    size, size, 0.0,
                    -size, -size, 0.0,
                    size, -size, 0.0
                ];
                break;
            case 'YZ':
                pos = [
                    0.0, -size, size,
                    0.0, size, size,
                    0.0, -size, -size,
                    0.0, size, -size
                ];
                break;
            case 'ZX':
                pos = [
                    -size, 0.0, size,
                    size, 0.0, size,
                    -size, 0.0, -size,
                    size, 0.0, -size
                ];
                break;
            default:
                break;
        }
        
        let nor = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ];
        let col = new Array();

        for (let i = 0; i < pos.length / 3; i++) {
            let tc : number[] = new Array();

            if (color == 'hsva') {
                tc = <number[]>new Color().hsva(360 / pos.length / 3 * i, 1, 1, 1);
            } else if (color == 'texture') {
                tc = [0, 0, 0, 1];
            } else {
                if (color.length != 4) {
                    throw new Error('Geometry Error : The size of the fourth argument must be 4');
                }
                tc = <number[]>color;
            }

            col.push(tc[0], tc[1], tc[2], tc[3]);
        }
        let st = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ];
        let idx = [
             0, 1, 2,
             3, 2, 1
        ];
        return {p : pos, n : nor, c : col, t : st, i : idx};
    }
}

export default Grid;