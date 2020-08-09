import { doxas } from './doxas';
var ProgramManager = /** @class */ (function () {
    function ProgramManager(gl) {
        this.gl = gl;
        this.wgld = new doxas(this.gl);
    }
    ProgramManager.prototype.init = function (vs, fs) {
        var v_shader = this.wgld.createShader(vs);
        var f_shader = this.wgld.createShader(fs);
        var program = this.wgld.createProgram(v_shader, f_shader);
        return program;
    };
    return ProgramManager;
}());
var ShaderManager = /** @class */ (function () {
    function ShaderManager(gl) {
        this.gl = gl;
        this.setAttribute = new doxas(this.gl).setAttribute;
    }
    // Attributeの配列を受け取って, Attributeの配列を返す
    ShaderManager.prototype.addAttribute = function (program, attList) {
        var attributes = new Array();
        for (var i = 0; i < attList.length; i++) {
            var attribute = {
                location: this.gl.getAttribLocation(program, attList[i].name),
                stride: attList[i].stride
            };
            attributes.push(attribute);
        }
        return attributes;
    };
    ShaderManager.prototype.addUniform = function (program, uniList) {
        var uniforms = new Array();
        for (var i = 0; i < uniList.length; i++) {
            var uniform = {
                location: this.gl.getUniformLocation(program, uniList[i].name),
                data: uniList[i]
            };
            uniforms.push(uniform);
        }
        return uniforms;
    };
    ShaderManager.prototype.setUniform = function (uniforms) {
        for (var i = 0; i < uniforms.length; i++) {
            switch (uniforms[i].data.type) {
                case '1i':
                    this.gl.uniform1i(uniforms[i].location, uniforms[i].data.value);
                    break;
                case 'm4fv':
                    this.gl.uniformMatrix4fv(uniforms[i].location, false, uniforms[i].data.value);
                    break;
                case '3fv':
                    this.gl.uniform3fv(uniforms[i].location, uniforms[i].data.value);
                    break;
                case '4fv':
                    this.gl.uniform4fv(uniforms[i].location, uniforms[i].data.value);
                    break;
                default:
                    throw new Error("Uniform Error : This uniform type doesn't exist");
                    break;
            }
        }
    };
    return ShaderManager;
}());
var BufferManager = /** @class */ (function () {
    function BufferManager(gl) {
        this.gl = gl;
        this.wgld = new doxas(this.gl);
        this.createIBO = this.wgld.createIBO;
        this.createFramebuffer = this.wgld.createFramebuffer;
    }
    BufferManager.prototype.createVBO = function (data) {
        var bufferList = new Array();
        for (var i = 0; i < data.length; i++) {
            bufferList.push(this.wgld.createVBO(data[i]));
        }
        return bufferList;
    };
    BufferManager.prototype.geometry = function (data) {
        var buffer = new Array();
        for (var i = 0; i < data.length; i++) {
            buffer.push({ vbo: new Array(), ibo: new Array() });
            var list = [data[i].p, data[i].n, data[i].c];
            var index = data[i].i;
            var VBOs = this.createVBO(list);
            buffer[i].vbo = VBOs;
            var IBO = this.createIBO(index);
            buffer[i].ibo = IBO;
        }
        return buffer;
    };
    return BufferManager;
}());
export { ProgramManager, ShaderManager, BufferManager };
//# sourceMappingURL=Core.js.map