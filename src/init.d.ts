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
export default class GLTS {
    private gl;
    constructor(gl: WebGLRenderingContext | WebGL2RenderingContext);
    glDoxas: doxas;
    matIV: matIV;
    ProgramManager: ProgramManager;
    ShaderManager: ShaderManager;
    BufferManager: BufferManager;
    Scene: Scene;
    PerspectiveCamera: typeof PerspectiveCamera;
    TextureManager: TextureManager;
    Sphere: typeof Sphere;
    Torus: typeof Torus;
    Cube: typeof Cube;
    Grid: typeof Grid;
}
//# sourceMappingURL=init.d.ts.map