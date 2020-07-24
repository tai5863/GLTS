import doxas from './doxas';

interface AttribInfo {
    name : string;
    stride : number;
}

interface Attribute {
    location : GLint;
    stride : number;
}

interface UniformInfo {
    name : string;
    type : string;
    value : Float32Array | number[] | number; // valueは拡張する必要あり, とりあえずこんなけ
}

interface Uniform {
    location : WebGLUniformLocation;
    data : UniformInfo; // 全部のデータを設定するのはちょっと無駄
}

interface GeometryData {
    p : number[];
    n : number[];
    c : number[];
    t : number[];
    i : number[];
}

interface BufferData {
    vbo : WebGLBuffer[];
    ibo : WebGLBuffer;
}

class ProgramManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public wgld = new doxas(this.gl);

    public init(vs : string, fs : string) : WebGLProgram {

        let v_shader = this.wgld.createShader(vs);
        let f_shader = this.wgld.createShader(fs);

        let program = this.wgld.createProgram(v_shader, f_shader);

        return program;
    }
}

class ShaderManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}
    // Attributeの配列を受け取って, Attributeの配列を返す
    public addAttribute(program : WebGLProgram, attList : AttribInfo[]) : Attribute[] {

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

    public setAttribute = new doxas(this.gl).setAttribute;

    public addUniform(program : WebGLProgram, uniList : UniformInfo[]) : Uniform[] {

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
    public setUniform(uniforms : Uniform[]) : void {
        
        for (let i : number = 0; i < uniforms.length; i++) {
            switch (uniforms[i].data.type) {
                case '1i':
                    this.gl.uniform1i(uniforms[i].location, <number>uniforms[i].data.value);
                    break;
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
                    throw new Error("Uniform Error : This uniform type doesn't exist");
                    break;
            }
        }
    }
}

class BufferManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public wgld = new doxas(this.gl);

    public createIBO = this.wgld.createIBO;

    public createFramebuffer = this.wgld.createFramebuffer;

    public createVBO(data : (number[])[]) : WebGLBuffer[] {

        let bufferList : WebGLBuffer[] = new Array();
        
        for (let i : number = 0; i < data.length; i++) {
            bufferList.push(this.wgld.createVBO(data[i]));
        }
        return bufferList;
    }

    public geometry(data : GeometryData[]) : BufferData[] {

        let buffer : BufferData[] = new Array();
        
        for (let i : number = 0; i < data.length; i++) {
            buffer.push({ vbo : new Array(), ibo : new Array() });

            let list : number[][] = [data[i].p, data[i].n, data[i].c, data[i].t];
            let index : number[] = data[i].i;
        
            let VBOs = this.createVBO(list);
            buffer[i].vbo = VBOs;
            
            let IBO = this.createIBO(index);
            buffer[i].ibo = IBO;
        }
        return buffer;
    }
}

export {ProgramManager, ShaderManager, BufferManager};