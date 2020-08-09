import { ProgramManager, ShaderManager, BufferManager } from './Core/Core';
import Scene from './Scene/Scene';
import PerspectiveCamera from './Camera/Perspective';
import TextureManager from './Texture/Texture';
import Sphere from './Geometry/Sphere';
import Torus from './Geometry/Torus';
import Cube from './Geometry/Cube';
import Grid from './Geometry/Grid';
import matIV from './utils/minMatrix';
import { doxas } from './Core/doxas';
var GLTS = /** @class */ (function () {
    function GLTS(gl) {
        this.gl = gl;
        this.glDoxas = new doxas(this.gl);
        this.matIV = new matIV();
        this.ProgramManager = new ProgramManager(this.gl);
        this.ShaderManager = new ShaderManager(this.gl);
        this.BufferManager = new BufferManager(this.gl);
        this.Scene = new Scene(this.gl);
        this.PerspectiveCamera = PerspectiveCamera;
        this.TextureManager = new TextureManager(this.gl);
        this.Sphere = Sphere;
        this.Torus = Torus;
        this.Cube = Cube;
        this.Grid = Grid;
    }
    return GLTS;
}());
export default GLTS;
//# sourceMappingURL=init.js.map