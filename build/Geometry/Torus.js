"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../utils/Color");
const Geometry_1 = require("./Geometry");
class Torus extends Geometry_1.default {
    init(row, column, irad, orad, color) {
        let pos = new Array(), nor = new Array(), col = new Array(), st = new Array(), idx = new Array();
        for (let i = 0; i <= row; i++) {
            let r = Math.PI * 2 / row * i;
            let rr = Math.cos(r);
            let ry = Math.sin(r);
            for (let ii = 0; ii <= column; ii++) {
                let tr = Math.PI * 2 / column * ii;
                let tx = (rr * irad + orad) * Math.cos(tr);
                let ty = ry * irad;
                let tz = (rr * irad + orad) * Math.sin(tr);
                let rx = rr * Math.cos(tr);
                let rz = rr * Math.sin(tr);
                let tc = new Array();
                if (color == 'hsva') {
                    tc = new Color_1.default().hsva(360 / row * i, 1, 1, 1);
                }
                else if (color == 'texture') {
                    tc = [0, 0, 0, 1];
                }
                else {
                    if (color.length != 4) {
                        throw new Error('Geometry Error : The size of the fourth argument must be 4');
                    }
                    tc = color;
                }
                let rs = 1 / column * ii;
                let rt = 1 / row * i + 0.5;
                if (rt > 1.0) {
                    rt -= 1.0;
                }
                rt = 1.0 - rt;
                pos.push(tx, ty, tz);
                nor.push(rx, ry, rz);
                col.push(tc[0], tc[1], tc[2], tc[3]);
                st.push(rs, rt);
            }
        }
        for (let i = 0; i < row; i++) {
            for (let ii = 0; ii < column; ii++) {
                let R = (column + 1) * i + ii;
                idx.push(R, R + column + 1, R + 1);
                idx.push(R + column + 1, R + column + 2, R + 1);
            }
        }
        return { p: pos, n: nor, c: col, t: st, i: idx };
    }
}
exports.default = Torus;
//# sourceMappingURL=Torus.js.map