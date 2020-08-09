"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../utils/Color");
const Geometry_1 = require("./Geometry");
class Sphere extends Geometry_1.default {
    init(row, column, rad, color) {
        let pos = new Array(), nor = new Array(), col = new Array(), st = new Array(), idx = new Array();
        for (let i = 0; i <= row; i++) {
            let r = Math.PI / row * i;
            let ry = Math.cos(r);
            let rr = Math.sin(r);
            for (let ii = 0; ii <= column; ii++) {
                let tr = Math.PI * 2 / column * ii;
                let tx = rr * rad * Math.cos(tr);
                let ty = ry * rad;
                let tz = rr * rad * Math.sin(tr);
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
                pos.push(tx, ty, tz);
                nor.push(rx, ry, rz);
                col.push(tc[0], tc[1], tc[2], tc[3]);
                st.push(1 - 1 / column * ii, 1 / row * i);
            }
        }
        let R = 0;
        for (let i = 0; i < row; i++) {
            for (let ii = 0; ii < column; ii++) {
                R = (column + 1) * i + ii;
                idx.push(R, R + 1, R + column + 2);
                idx.push(R, R + column + 2, R + column + 1);
            }
        }
        return { p: pos, n: nor, c: col, t: st, i: idx };
    }
}
exports.default = Sphere;
//# sourceMappingURL=Sphere.js.map