class doxas {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    // create vs & fs shader
    public createShader(id : string) : WebGLShader {

        let shader : WebGLShader | null;

        let element : HTMLInputElement | null = <HTMLInputElement>document.getElementById(id);

        if (!element) {throw new Error('shader error : there is no such element');}

        switch (element.type) {
            case 'x-shader/x-vertex':
                shader = this.gl.createShader(this.gl.VERTEX_SHADER)!;
                break;
            
            case 'x-shader/x-fragment':
                shader = this.gl.createShader(this.gl.FRAGMENT_SHADER)!;
                break;

            default:
                throw new Error('shader error : there is no vertex or fragment shader');
        }

        this.gl.shaderSource(shader, element.textContent!);
        this.gl.compileShader(shader);

        // check whether the shader has compiled successfully
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw new Error("shader error : cannot complie the shader successfully");
        }
        return shader;
    }

    public createProgram(vs : WebGLShader, fs : WebGLShader) : WebGLProgram {

        let program : WebGLProgram = this.gl.createProgram()!;

        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);

        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            throw new Error('program error');
        }
        return program;
    }
}

export default doxas;