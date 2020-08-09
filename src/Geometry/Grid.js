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
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.init = function (type, size, color) {
        var pos = new Array();
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
        var nor = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0
        ];
        var col = new Array();
        for (var i = 0; i < pos.length / 3; i++) {
            var tc = new Array();
            if (color == 'hsva') {
                tc = new Color().hsva(360 / pos.length / 3 * i, 1, 1, 1);
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
        var st = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0
        ];
        var idx = [
            0, 1, 2,
            3, 2, 1
        ];
        return { p: pos, n: nor, c: col, t: st, i: idx };
    };
    return Grid;
}(Geometry));
export default Grid;
//# sourceMappingURL=Grid.js.map