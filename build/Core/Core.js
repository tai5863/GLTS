"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferManager = exports.ShaderManager = exports.ProgramManager = void 0;
const doxas_1 = require("./doxas");
class ProgramManager {
    constructor(gl) {
        this.gl = gl;
        this.wgld = new doxas_1.doxas(this.gl);
    }
    init(vs, fs) {
        let v_shader = this.wgld.createShader(vs);
        let f_shader = this.wgld.createShader(fs);
        let program = this.wgld.createProgram(v_shader, f_shader);
        return program;
    }
}
exports.ProgramManager = ProgramManager;
class ShaderManager {
    constructor(gl) {
        this.gl = gl;
        this.setAttribute = new doxas_1.doxas(this.gl).setAttribute;
    }
    // Attributeの配列を受け取って, Attributeの配列を返す
    addAttribute(program, attList) {
        let attributes = new Array();
        for (let i = 0; i < attList.length; i++) {
            let attribute = {
                location: this.gl.getAttribLocation(program, attList[i].name),
                stride: attList[i].stride
            };
            attributes.push(attribute);
        }
        return attributes;
    }
    addUniform(program, uniList) {
        let uniforms = new Array();
        for (let i = 0; i < uniList.length; i++) {
            let uniform = {
                location: this.gl.getUniformLocation(program, uniList[i].name),
                data: uniList[i]
            };
            uniforms.push(uniform);
        }
        return uniforms;
    }
    setUniform(uniforms) {
        for (let i = 0; i < uniforms.length; i++) {
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
    }
}
exports.ShaderManager = ShaderManager;
class BufferManager {
    constructor(gl) {
        this.gl = gl;
        this.wgld = new doxas_1.doxas(this.gl);
        this.createIBO = this.wgld.createIBO;
        this.createFramebuffer = this.wgld.createFramebuffer;
    }
    createVBO(data) {
        let bufferList = new Array();
        for (let i = 0; i < data.length; i++) {
            bufferList.push(this.wgld.createVBO(data[i]));
        }
        return bufferList;
    }
    geometry(data) {
        let buffer = new Array();
        for (let i = 0; i < data.length; i++) {
            buffer.push({ vbo: new Array(), ibo: new Array() });
            let list = [data[i].p, data[i].n, data[i].c];
            let index = data[i].i;
            let VBOs = this.createVBO(list);
            buffer[i].vbo = VBOs;
            let IBO = this.createIBO(index);
            buffer[i].ibo = IBO;
        }
        return buffer;
    }
}
exports.BufferManager = BufferManager;
//# sourceMappingURL=Core.js.map