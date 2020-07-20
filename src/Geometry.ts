class glGeometry {
    public Sphere(row : number, column : number, rad : number, color : number[] | string) {

        let pos : number[] = new Array(), nor : number[] = new Array(),
            col : number[] = new Array(), st : number[] = new Array(), idx : number[] = new Array();
        for (let i : number = 0; i <= row; i++) {
            let r : number = Math.PI / row * i;
            let ry : number = Math.cos(r);
            let rr : number = Math.sin(r);
            for(let ii : number = 0; ii <= column; ii++){
                let tr : number = Math.PI * 2 / column * ii;
                let tx : number = rr * rad * Math.cos(tr);
                let ty : number = ry * rad;
                let tz : number = rr * rad * Math.sin(tr);
                let rx : number = rr * Math.cos(tr);
                let rz : number = rr * Math.sin(tr);
                let tc : number[] = new Array();
                if (color == 'hsva') {
                    tc = <number[]>new Color().hsva(360 / row * i, 1, 1, 1);
                } else {
                    tc = <number[]>color;
                }
                pos.push(tx, ty, tz);
                nor.push(rx, ry, rz);
                col.push(tc[0], tc[1], tc[2], tc[3]);
                st.push(1 - 1 / column * ii, 1 / row * i);
            }
        }
        let R : number = 0;
        for (let i : number = 0; i < row; i++) {
            for (let ii : number = 0; ii < column; ii++) {
                R = (column + 1) * i + ii;
                idx.push(R, R + 1, R + column + 2);
                idx.push(R, R + column + 2, R + column + 1);
            }
        }
        return {p : pos, n : nor, c : col, t : st, i : idx};
    }
}

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

export default glGeometry;