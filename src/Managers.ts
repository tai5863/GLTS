import doxas from './doxas';

class programManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public init(vs : string, fs : string) : WebGLProgram {

        let wgld = new doxas(this.gl);
        let v_shader = wgld.createShader(vs);
        let f_shader = wgld.createShader(fs);

        let program = wgld.createProgram(v_shader, f_shader);

        return program;
    }
}

class attributeManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public setLocation(program : WebGLProgram, locations : string[]) : GLint[] {

        let attributeLocation : GLint[] = new Array(locations.length);
        
        for (let i : number = 0; i < locations.length; i++) {
            attributeLocation[i] = this.gl.getAttribLocation(program, locations[i]);
        }
        return attributeLocation;
    }

    public setStrides(program : WebGLProgram, strides : number[]) : GLint[] {

        let attributeStride : number[] = new Array(strides.length);
        
        for (let i : number = 0; i < strides.length; i++) {
            attributeStride[i] = strides[i];
        }
        return attributeStride;
    }
}

class uniformManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public setLocation(program : WebGLProgram, locations : string[]) : WebGLUniformLocation[] {

        let uniformLocation : WebGLUniformLocation[] = new Array(locations.length);

        for (let i : number = 0; i < locations.length; i++) {
            uniformLocation[i] = this.gl.getUniformLocation(program, locations[i])!;
        }
        return uniformLocation;
    }
}

export {programManager, attributeManager, uniformManager};