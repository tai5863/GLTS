var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Color from '../utils/Color';
import Geometry from './Geometry';
var Torus = /** @class */ (function (_super) {
    __extends(Torus, _super);
    function Torus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Torus.prototype.init = function (row, column, irad, orad, color) {
        var pos = new Array(), nor = new Array(), col = new Array(), st = new Array(), idx = new Array();
        for (var i = 0; i <= row; i++) {
            var r = Math.PI * 2 / row * i;
            var rr = Math.cos(r);
            var ry = Math.sin(r);
            for (var ii = 0; ii <= column; ii++) {
                var tr = Math.PI * 2 / column * ii;
                var tx = (rr * irad + orad) * Math.cos(tr);
                var ty = ry * irad;
                var tz = (rr * irad + orad) * Math.sin(tr);
                var rx = rr * Math.cos(tr);
                var rz = rr * Math.sin(tr);
                var tc = new Array();
                if (color == 'hsva') {
                    tc = new Color().hsva(360 / row * i, 1, 1, 1);
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
                var rs = 1 / column * ii;
                var rt = 1 / row * i + 0.5;
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
        for (var i = 0; i < row; i++) {
            for (var ii = 0; ii < column; ii++) {
                var R = (column + 1) * i + ii;
                idx.push(R, R + column + 1, R + 1);
                idx.push(R + column + 1, R + column + 2, R + 1);
            }
        }
        return { p: pos, n: nor, c: col, t: st, i: idx };
    };
    return Torus;
}(Geometry));
export default Torus;
//# sourceMappingURL=Torus.js.map