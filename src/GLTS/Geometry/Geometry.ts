class Geometry {
    
	public mat : Float32Array = new Float32Array(16);

    public clear() : Float32Array {
        this.mat[0] = 1; this.mat[1] = 0; this.mat[2] = 0; this.mat[3] = 0;
		this.mat[4] = 0; this.mat[5] = 1; this.mat[6] = 0; this.mat[7] = 0;
		this.mat[8] = 0; this.mat[9] = 0; this.mat[10] = 1; this.mat[11] = 0;
        this.mat[12] = 0; this.mat[13] = 0; this.mat[14] = 0; this.mat[15] = 1;
        return this.mat;
    }

    public scale(vec : number[]) : Float32Array {
        this.mat[0]  = this.mat[0]  * vec[0];
		this.mat[1]  = this.mat[1]  * vec[0];
		this.mat[2]  = this.mat[2]  * vec[0];
		this.mat[3]  = this.mat[3]  * vec[0];
		this.mat[4]  = this.mat[4]  * vec[1];
		this.mat[5]  = this.mat[5]  * vec[1];
		this.mat[6]  = this.mat[6]  * vec[1];
		this.mat[7]  = this.mat[7]  * vec[1];
		this.mat[8]  = this.mat[8]  * vec[2];
		this.mat[9]  = this.mat[9]  * vec[2];
		this.mat[10] = this.mat[10] * vec[2];
		this.mat[11] = this.mat[11] * vec[2];
		this.mat[12] = this.mat[12];
		this.mat[13] = this.mat[13];
		this.mat[14] = this.mat[14];
        this.mat[15] = this.mat[15];
        return this.mat;
    }

    public translate(vec : number[]) : Float32Array {
        this.mat[0] = this.mat[0]; this.mat[1] = this.mat[1]; this.mat[2]  = this.mat[2];  this.mat[3]  = this.mat[3];
		this.mat[4] = this.mat[4]; this.mat[5] = this.mat[5]; this.mat[6]  = this.mat[6];  this.mat[7]  = this.mat[7];
		this.mat[8] = this.mat[8]; this.mat[9] = this.mat[9]; this.mat[10] = this.mat[10]; this.mat[11] = this.mat[11];
		this.mat[12] = this.mat[0] * vec[0] + this.mat[4] * vec[1] + this.mat[8]  * vec[2] + this.mat[12];
		this.mat[13] = this.mat[1] * vec[0] + this.mat[5] * vec[1] + this.mat[9]  * vec[2] + this.mat[13];
		this.mat[14] = this.mat[2] * vec[0] + this.mat[6] * vec[1] + this.mat[10] * vec[2] + this.mat[14];
        this.mat[15] = this.mat[3] * vec[0] + this.mat[7] * vec[1] + this.mat[11] * vec[2] + this.mat[15];
        return this.mat;
    }

    public rotate(angle : number, axis : number[]) : Float32Array | null {
        let sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
		if(!sq){return null;}
		let a = axis[0], b = axis[1], c = axis[2];
		if(sq != 1){sq = 1 / sq; a *= sq; b *= sq; c *= sq;}
		let d = Math.sin(angle), e = Math.cos(angle), f = 1 - e,
			g = this.mat[0],  h = this.mat[1], i = this.mat[2],  j = this.mat[3],
			k = this.mat[4],  l = this.mat[5], m = this.mat[6],  n = this.mat[7],
			o = this.mat[8],  p = this.mat[9], q = this.mat[10], r = this.mat[11],
			s = a * a * f + e,
			t = b * a * f + c * d,
			u = c * a * f - b * d,
			v = a * b * f - c * d,
			w = b * b * f + e,
			x = c * b * f + a * d,
			y = a * c * f + b * d,
			z = b * c * f - a * d,
			A = c * c * f + e;
		this.mat[0] = g * s + k * t + o * u;
		this.mat[1] = h * s + l * t + p * u;
		this.mat[2] = i * s + m * t + q * u;
		this.mat[3] = j * s + n * t + r * u;
		this.mat[4] = g * v + k * w + o * x;
		this.mat[5] = h * v + l * w + p * x;
		this.mat[6] = i * v + m * w + q * x;
		this.mat[7] = j * v + n * w + r * x;
		this.mat[8] = g * y + k * z + o * A;
		this.mat[9] = h * y + l * z + p * A;
		this.mat[10] = i * y + m * z + q * A;
        this.mat[11] = j * y + n * z + r * A;
        return this.mat;
    }

    public transpose() : Float32Array {
        this.mat[0]  = this.mat[0];  this.mat[1]  = this.mat[4];
		this.mat[2]  = this.mat[8];  this.mat[3]  = this.mat[12];
		this.mat[4]  = this.mat[1];  this.mat[5]  = this.mat[5];
		this.mat[6]  = this.mat[9];  this.mat[7]  = this.mat[13];
		this.mat[8]  = this.mat[2];  this.mat[9]  = this.mat[6];
		this.mat[10] = this.mat[10]; this.mat[11] = this.mat[14];
		this.mat[12] = this.mat[3];  this.mat[13] = this.mat[7];
        this.mat[14] = this.mat[11]; this.mat[15] = this.mat[15];
        return this.mat;
    }

    public inverse() : Float32Array {
        let a : number = this.mat[0],  b : number = this.mat[1],  c : number = this.mat[2],  d : number = this.mat[3],
			e : number = this.mat[4],  f : number = this.mat[5],  g : number = this.mat[6],  h : number = this.mat[7],
			i : number = this.mat[8],  j : number = this.mat[9],  k : number = this.mat[10], l : number = this.mat[11],
			m : number= this.mat[12], n : number = this.mat[13], o : number = this.mat[14], p : number = this.mat[15],
			q : number = a * f - b * e, r = a * g - c * e,
			s : number = a * h - d * e, t = b * g - c * f,
			u : number = b * h - d * f, v = c * h - d * g,
			w : number = i * n - j * m, x = i * o - k * m,
			y : number = i * p - l * m, z = j * o - k * n,
			A : number = j * p - l * n, B = k * p - l * o,
			ivd : number = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
		this.mat[0]  = ( f * B - g * A + h * z) * ivd;
		this.mat[1]  = (-b * B + c * A - d * z) * ivd;
		this.mat[2]  = ( n * v - o * u + p * t) * ivd;
		this.mat[3]  = (-j * v + k * u - l * t) * ivd;
		this.mat[4]  = (-e * B + g * y - h * x) * ivd;
		this.mat[5]  = ( a * B - c * y + d * x) * ivd;
		this.mat[6]  = (-m * v + o * s - p * r) * ivd;
		this.mat[7]  = ( i * v - k * s + l * r) * ivd;
		this.mat[8]  = ( e * A - f * y + h * w) * ivd;
		this.mat[9]  = (-a * A + b * y - d * w) * ivd;
		this.mat[10] = ( m * u - n * s + p * q) * ivd;
		this.mat[11] = (-i * u + j * s - l * q) * ivd;
		this.mat[12] = (-e * z + f * x - g * w) * ivd;
		this.mat[13] = ( a * z - b * x + c * w) * ivd;
		this.mat[14] = (-m * t + n * r - o * q) * ivd;
		this.mat[15] = ( i * t - j * r + k * q) * ivd;
		return this.mat;
    }
}

export default Geometry;