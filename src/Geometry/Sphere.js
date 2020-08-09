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
var Sphere = /** @class */ (function (_super) {
    __extends(Sphere, _super);
    function Sphere() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sphere.prototype.init = function (row, column, rad, color) {
        var pos = new Array(), nor = new Array(), col = new Array(), st = new Array(), idx = new Array();
        for (var i = 0; i <= row; i++) {
            var r = Math.PI / row * i;
            var ry = Math.cos(r);
            var rr = Math.sin(r);
            for (var ii = 0; ii <= column; ii++) {
                var tr = Math.PI * 2 / column * ii;
                var tx = rr * rad * Math.cos(tr);
                var ty = ry * rad;
                var tz = rr * rad * Math.sin(tr);
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
                pos.push(tx, ty, tz);
                nor.push(rx, ry, rz);
                col.push(tc[0], tc[1], tc[2], tc[3]);
                st.push(1 - 1 / column * ii, 1 / row * i);
            }
        }
        var R = 0;
        for (var i = 0; i < row; i++) {
            for (var ii = 0; ii < column; ii++) {
                R = (column + 1) * i + ii;
                idx.push(R, R + 1, R + column + 2);
                idx.push(R, R + column + 2, R + column + 1);
            }
        }
        return { p: pos, n: nor, c: col, t: st, i: idx };
    };
    return Sphere;
}(Geometry));
export default Sphere;
//# sourceMappingURL=Sphere.js.map