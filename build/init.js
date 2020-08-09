"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = require("./Core/Core");
const Scene_1 = require("./Scene/Scene");
const Perspective_1 = require("./Camera/Perspective");
const Texture_1 = require("./Texture/Texture");
const Sphere_1 = require("./Geometry/Sphere");
const Torus_1 = require("./Geometry/Torus");
const Cube_1 = require("./Geometry/Cube");
const Grid_1 = require("./Geometry/Grid");
const minMatrix_1 = require("./utils/minMatrix");
const doxas_1 = require("./Core/doxas");
class GLTS {
    constructor(gl) {
        this.gl = gl;
        this.glDoxas = new doxas_1.doxas(this.gl);
        this.matIV = new minMatrix_1.default();
        this.ProgramManager = new Core_1.ProgramManager(this.gl);
        this.ShaderManager = new Core_1.ShaderManager(this.gl);
        this.BufferManager = new Core_1.BufferManager(this.gl);
        this.Scene = new Scene_1.default(this.gl);
        this.PerspectiveCamera = Perspective_1.default;
        this.TextureManager = new Texture_1.default(this.gl);
        this.Sphere = Sphere_1.default;
        this.Torus = Torus_1.default;
        this.Cube = Cube_1.default;
        this.Grid = Grid_1.default;
    }
}
exports.default = GLTS;
//# sourceMappingURL=init.js.map