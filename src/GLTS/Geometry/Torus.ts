import Color from '../utils/Color';
import Geometry from './Geometry';

interface info {
    p : number[];
    n : number[];
    c : number[];
    t : number[];
    i : number[];
}

class Torus extends Geometry {
    public init(row : number, column : number, irad : number, orad : number, color : number[] | string) : info {

        let pos : number[]= new Array(), nor : number[]= new Array(),
            col : number[]= new Array(), st : number[]= new Array(), idx : number[] = new Array();

        for (let i : number = 0; i <= row; i++) {
            let r : number = Math.PI * 2 / row * i;
            let rr : number = Math.cos(r);
            let ry : number = Math.sin(r);

            for (let ii : number = 0; ii <= column; ii++) {
                let tr : number = Math.PI * 2 / column * ii;
                let tx : number = (rr * irad + orad) * Math.cos(tr);
                let ty : number = ry * irad;
                let tz : number = (rr * irad + orad) * Math.sin(tr);
                let rx : number = rr * Math.cos(tr);
                let rz : number = rr * Math.sin(tr);
                let tc : number[] = new Array();

                if (color == 'hsva') {
                    tc = <number[]>new Color().hsva(360 / row * i, 1, 1, 1);
                } else if (color == 'texture') {
                    tc = [0, 0, 0, 1];
                } else {
                    if (color.length != 4) {
                        throw new Error('Geometry Error : The size of the fourth argument must be 4');
                    }
                    tc = <number[]>color;
                }

                let rs : number = 1 / column * ii;
                let rt : number = 1 / row * i + 0.5;
                if(rt > 1.0){rt -= 1.0;}
                rt = 1.0 - rt;
                pos.push(tx, ty, tz);
                nor.push(rx, ry, rz);
                col.push(tc[0], tc[1], tc[2], tc[3]);
                st.push(rs, rt);
            }
        }

        for (let i : number = 0; i < row; i++) {
            for(let ii : number = 0; ii < column; ii++){
                let R : number = (column + 1) * i + ii;
                idx.push(R, R + column + 1, R + 1);
                idx.push(R + column + 1, R + column + 2, R + 1);
            }
        }
        return {p : pos, n : nor, c : col, t : st, i : idx};
    }
}

export default Torus;