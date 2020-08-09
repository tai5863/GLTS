"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    hsva(h, s, v, a) {
        if (s > 1 || v > 1 || a > 1) {
            return;
        }
        let th = h % 360;
        let i = Math.floor(th / 60);
        let f = th / 60 - i;
        let m = v * (1 - s);
        let n = v * (1 - s * f);
        let k = v * (1 - s * (1 - f));
        let color = new Array();
        if (!(s > 0) && !(s < 0)) {
            color.push(v, v, v, a);
        }
        else {
            let r = new Array(v, n, m, m, k, v);
            let g = new Array(k, v, v, n, m, m);
            let b = new Array(m, m, k, v, v, n);
            color.push(r[i], g[i], b[i], a);
        }
        return color;
    }
}
exports.default = Color;
//# sourceMappingURL=Color.js.map