var doxas = /** @class */ (function () {
    function doxas(gl) {
        this.gl = gl;
    }
    // create vs & fs shader
    doxas.prototype.createShader = function (id) {
        var shader;
        var element = document.getElementById(id);
        if (!element) {
            throw new Error('Shader Error : There is no such element');
        }
        switch (element.type) {
            case 'x-shader/x-vertex':
                shader = this.gl.createShader(this.gl.VERTEX_SHADER);
                break;
            case 'x-shader/x-fragment':
                shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
                break;
            default:
                throw new Error('Shader Error : There is no vertex or fragment shader');
        }
        this.gl.shaderSource(shader, element.textContent);
        this.gl.compileShader(shader);
        // check whether the shader has compiled successfully
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw new Error("Shader Error : Cannot complie the shader successfully");
        }
        return shader;
    };
    // create program
    doxas.prototype.createProgram = function (vs, fs) {
        var program = this.gl.createProgram();
        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);
        this.gl.linkProgram(program);
        // check whether the program has linked successfully
        if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            this.gl.useProgram(program);
            return program;
        }
        else {
            throw new Error('program error');
        }
    };
    // create vbo
    doxas.prototype.createVBO = function (data) {
        var vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        return vbo;
    };
    // set attribute
    doxas.prototype.setAttribute = function (vbo, attributes) {
        for (var i = 0; i < vbo.length; i++) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo[i]);
            this.gl.enableVertexAttribArray(attributes[i].location);
            this.gl.vertexAttribPointer(attributes[i].location, attributes[i].stride, this.gl.FLOAT, false, 0, 0);
        }
    };
    // create ibo
    doxas.prototype.createIBO = function (data) {
        var ibo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        return ibo;
    };
    // create texture
    doxas.prototype.createTexture = function (source) {
        var _this = this;
        var img = new Image();
        var tex = this.gl.createTexture();
        img.onload = function () {
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, tex);
            _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, img);
            _this.gl.generateMipmap(_this.gl.TEXTURE_2D);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, _this.gl.LINEAR);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, _this.gl.LINEAR);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_S, _this.gl.REPEAT);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_T, _this.gl.REPEAT);
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, null);
        };
        img.src = source;
        return tex;
    };
    // create cube texture
    doxas.prototype.createCubeTexture = function (source) {
        var _this = this;
        var cImg = new Array();
        var tex = this.gl.createTexture();
        var _loop_1 = function (i) {
            var data = new Image();
            data.onload = function () {
                cImg.push(data);
                if (i == 5) {
                    _this.gl.bindTexture(_this.gl.TEXTURE_CUBE_MAP, tex);
                    _this.gl.texImage2D(_this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, cImg[0]);
                    _this.gl.texImage2D(_this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, cImg[1]);
                    _this.gl.texImage2D(_this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, cImg[2]);
                    _this.gl.texImage2D(_this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, cImg[3]);
                    _this.gl.texImage2D(_this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, cImg[4]);
                    _this.gl.texImage2D(_this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, cImg[5]);
                    _this.gl.generateMipmap(_this.gl.TEXTURE_CUBE_MAP);
                    _this.gl.texParameteri(_this.gl.TEXTURE_CUBE_MAP, _this.gl.TEXTURE_MIN_FILTER, _this.gl.LINEAR);
                    _this.gl.texParameteri(_this.gl.TEXTURE_CUBE_MAP, _this.gl.TEXTURE_MAG_FILTER, _this.gl.LINEAR);
                    _this.gl.texParameteri(_this.gl.TEXTURE_CUBE_MAP, _this.gl.TEXTURE_WRAP_S, _this.gl.CLAMP_TO_EDGE);
                    _this.gl.texParameteri(_this.gl.TEXTURE_CUBE_MAP, _this.gl.TEXTURE_WRAP_T, _this.gl.CLAMP_TO_EDGE);
                    _this.gl.bindTexture(_this.gl.TEXTURE_CUBE_MAP, null);
                }
            };
            data.src = source[i];
        };
        for (var i = 0; i < source.length; i++) {
            _loop_1(i);
        }
        return tex;
    };
    // create framebuffer
    doxas.prototype.createFramebuffer = function (width, height) {
        var frameBuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer);
        var depthRenderBuffer = this.gl.createRenderbuffer();
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthRenderBuffer);
        this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
        this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthRenderBuffer);
        var fTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, fTexture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, fTexture, 0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        return { f: frameBuffer, d: depthRenderBuffer, t: fTexture };
    };
    return doxas;
}());
export { doxas };
//# sourceMappingURL=doxas.js.map