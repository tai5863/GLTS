import doxas from './doxas';

interface AttribData {
    name : string;
    stride : number;
}

interface Attribute {
    location : GLint;
    stride : number;
}

interface UniformData {
    name : string;
    type : string;
    value : Float32Array | number[] | number; // valueは拡張する必要あり, とりあえずこんなけ
}

interface Uniform {
    location : WebGLUniformLocation;
    data : UniformData; // 全部のデータを設定するのはちょっと無駄
}

class glManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public init(vs : string, fs : string) : WebGLProgram {

        let wgld = new doxas(this.gl);
        let v_shader = wgld.createShader(vs);
        let f_shader = wgld.createShader(fs);

        let program = wgld.createProgram(v_shader, f_shader);

        return program;
    }
}

class glAttribute {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}
    // AttribDataの配列を受け取って, Attributeの配列を返す
    public assign(program : WebGLProgram, attList : AttribData[]) : Attribute[] {

        let attributes : Attribute[] = new Array();
        
        for (let i : number = 0; i < attList.length; i++) {
            let attribute : Attribute = {
                location : this.gl.getAttribLocation(program, attList[i].name),
                stride : attList[i].stride
            };
            attributes.push(attribute);
        }
        return attributes;
    }

    public set = new doxas(this.gl).setAttribute;
}

class glUniform {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public assign(program : WebGLProgram, uniList : UniformData[]) : Uniform[] {

        let uniforms : Uniform[] = new Array();

        for (let i : number = 0; i < uniList.length; i++) {
            let uniform : Uniform = {
                location : this.gl.getUniformLocation(program, uniList[i].name)!,
                data : uniList[i]
            };
            uniforms.push(uniform);
        }
        return uniforms;
    }
    // これももっと拡張する必要あり
    public set(uniforms : Uniform[]) : void {
        
        for (let i : number = 0; i < uniforms.length; i++) {
            switch (uniforms[i].data.type) {
                case 'm4fv':
                    this.gl.uniformMatrix4fv(uniforms[i].location, false, <Float32Array>uniforms[i].data.value);
                    break;

                case '3fv':
                    this.gl.uniform3fv(uniforms[i].location, <number[]>uniforms[i].data.value);
                    break;

                case '4fv':
                    this.gl.uniform4fv(uniforms[i].location, <number[]>uniforms[i].data.value);
                    break;
            
                default:
                    throw new Error("uniform error : this uniform type don't exist");
                    break;
            }
        }
    }
}

class glBuffer {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public wgld = new doxas(this.gl);

    public createVBO = this.wgld.createVBO;

    public createIBO = this.wgld.createIBO;

    public createVBOs(data : (number[])[]) : WebGLBuffer[] {

        let bufferList : WebGLBuffer[] = new Array();
        
        for (let i : number = 0; i < data.length; i++) {
            bufferList.push(this.createVBO(data[i]));
        }
        return bufferList;
    }
}

export {glManager, glAttribute, glUniform, glBuffer};