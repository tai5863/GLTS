"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Color_1 = require("../utils/Color");
const Geometry_1 = require("./Geometry");
class Grid extends Geometry_1.default {
    init(type, size, color) {
        let pos = new Array();
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
            let tc = new Array();
            if (color == 'hsva') {
                tc = new Color_1.default().hsva(360 / pos.length / 3 * i, 1, 1, 1);
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
        return { p: pos, n: nor, c: col, t: st, i: idx };
    }
}
exports.default = Grid;
//# sourceMappingURL=Grid.js.map