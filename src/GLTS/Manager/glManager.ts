import doxas from './doxas';

interface AttribInfo {
    name : string;
    stride : number;
}

interface AttribData {
    location : GLint;
    stride : number;
}

interface UniformInfo {
    name : string;
    type : string;
    value : Float32Array | number[] | number; // valueは拡張する必要あり, とりあえずこんなけ
}

interface UniformData {
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

class prgManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public init(vs : string, fs : string) : WebGLProgram {

        let wgld = new doxas(this.gl);
        let v_shader = wgld.createShader(vs);
        let f_shader = wgld.createShader(fs);

        let program = wgld.createProgram(v_shader, f_shader);

        return program;
    }
}

class attribManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}
    // AttribDataの配列を受け取って, Attributeの配列を返す
    public add(program : WebGLProgram, attList : AttribInfo[]) : AttribData[] {

        let attributes : AttribData[] = new Array();
        
        for (let i : number = 0; i < attList.length; i++) {
            let attribute : AttribData = {
                location : this.gl.getAttribLocation(program, attList[i].name),
                stride : attList[i].stride
            };
            attributes.push(attribute);
        }
        return attributes;
    }

    public set = new doxas(this.gl).setAttribute;
}

class uniformManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public add(program : WebGLProgram, uniList : UniformInfo[]) : UniformData[] {

        let uniforms : UniformData[] = new Array();

        for (let i : number = 0; i < uniList.length; i++) {
            let uniform : UniformData = {
                location : this.gl.getUniformLocation(program, uniList[i].name)!,
                data : uniList[i]
            };
            uniforms.push(uniform);
        }
        return uniforms;
    }
    // これももっと拡張する必要あり
    public set(uniforms : UniformData[]) : void {
        
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
                    throw new Error("Uniform Error : This uniform type doesn't exist");
                    break;
            }
        }
    }
}

class bufferManager {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    public wgld = new doxas(this.gl);

    public create = this.wgld.createVBO;

    public createIBO = this.wgld.createIBO;

    public createVBO(data : (number[])[]) : WebGLBuffer[] {

        let bufferList : WebGLBuffer[] = new Array();
        
        for (let i : number = 0; i < data.length; i++) {
            bufferList.push(this.create(data[i]));
        }
        return bufferList;
    }

    public add(data : GeometryData[]) : BufferData[] {

        let buffer : BufferData[] = new Array();
        
        for (let i : number = 0; i < data.length; i++) {
            buffer.push({ vbo : new Array(), ibo : new Array() });

            let list : number[][] = [data[i].p, data[i].n, data[i].c];
            let index : number[] = data[i].i;
        
            let VBOs = this.createVBO(list);
            buffer[i].vbo = VBOs;
            
            let IBO = this.createIBO(index);
            buffer[i].ibo = IBO;
        }
        return buffer;
    }
}

export {prgManager, attribManager, uniformManager, bufferManager};