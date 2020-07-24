interface Attribute {
    location : GLint;
    stride : number;
}

interface FrameBufferData {
    f : WebGLFramebuffer;
    d : WebGLRenderbuffer;
    t : WebGLTexture;
}

class doxas {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    // create vs & fs shader
    public createShader(id : string) : WebGLShader {

        let shader : WebGLShader | null;

        let element : HTMLInputElement | null = <HTMLInputElement>document.getElementById(id);

        if (!element) {throw new Error('Shader Error : There is no such element');}

        switch (element.type) {
            case 'x-shader/x-vertex':
                shader = this.gl.createShader(this.gl.VERTEX_SHADER)!;
                break;
            
            case 'x-shader/x-fragment':
                shader = this.gl.createShader(this.gl.FRAGMENT_SHADER)!;
                break;

            default:
                throw new Error('Shader Error : There is no vertex or fragment shader');
        }

        this.gl.shaderSource(shader, element.textContent!);
        this.gl.compileShader(shader);

        // check whether the shader has compiled successfully
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw new Error("Shader Error : Cannot complie the shader successfully");
        }
        return shader;
    }

    // create program
    public createProgram(vs : WebGLShader, fs : WebGLShader) : WebGLProgram {

        let program : WebGLProgram = this.gl.createProgram()!;

        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);

        this.gl.linkProgram(program);

        // check whether the program has linked successfully
        if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {

            this.gl.useProgram(program);

            return program;
        } else {
            throw new Error('program error');
        }
    }

    // create vbo
    public createVBO(data : number[]) : WebGLBuffer {

        let vbo : WebGLBuffer = this.gl.createBuffer()!;

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        return vbo;
    }

    // set attribute
    public setAttribute(vbo : WebGLBuffer[], attributes : Attribute[]) : void {
        
        for (let i : number = 0; i < vbo.length; i++) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo[i]);

            this.gl.enableVertexAttribArray(attributes[i].location);

            this.gl.vertexAttribPointer(attributes[i].location, attributes[i].stride, this.gl.FLOAT, false, 0, 0);
        }
    }

    // create ibo
    public createIBO(data : number[]) : WebGLBuffer {

        let ibo : WebGLBuffer = this.gl.createBuffer()!;

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo);

        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), this.gl.STATIC_DRAW);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

        return ibo;
    }

    // create texture
    public createTexture(source : string) : WebGLTexture {

        let img = new Image();
        let tex : WebGLTexture = this.gl.createTexture()!;

        img.onload = () => {

            this.gl.bindTexture(this.gl.TEXTURE_2D, tex);

            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);

            this.gl.generateMipmap(this.gl.TEXTURE_2D);

            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
			
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        };
        img.src = source;

        return tex;
    }

    // create framebuffer
    public createFramebuffer(width : number, height : number) : FrameBufferData {
		
		let frameBuffer : WebGLFramebuffer = this.gl.createFramebuffer()!;
		
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer);
		
		let depthRenderBuffer : WebGLRenderbuffer = this.gl.createRenderbuffer()!;
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthRenderBuffer);
		
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
		
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthRenderBuffer);
		
		let fTexture : WebGLTexture = this.gl.createTexture()!;
		
		this.gl.bindTexture(this.gl.TEXTURE_2D, fTexture);
		
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
		
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, fTexture, 0);
		
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		
		return {f : frameBuffer, d : depthRenderBuffer, t : fTexture};
	}
}

export default doxas;