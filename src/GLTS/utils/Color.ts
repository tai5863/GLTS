class Color {
    public hsva(h : number, s : number, v : number, a : number) : number[] | void {

        if (s > 1 || v > 1 || a > 1) {return;}
        let th : number = h % 360;
        let i : number = Math.floor(th / 60);
        let f : number = th / 60 - i;
        let m : number = v * (1 - s);
        let n : number = v * (1 - s * f);
        let k : number = v * (1 - s * (1 - f));
        let color : number[] = new Array();
        if (!<boolean>(s > 0) && !<boolean>(s < 0)) {
            color.push(v, v, v, a); 
        } else {
            let r : number[] = new Array(v, n, m, m, k, v);
            let g : number[] = new Array(k, v, v, n, m, m);
            let b : number[] = new Array(m, m, k, v, v, n);
            color.push(r[i], g[i], b[i], a);
        }
        return color;
    }
}

export default Color;