import {ProgramManager, ShaderManager, BufferManager} from './Core/Core';
import Scene from './Scene/Scene';
import PerspectiveCamera from './Camera/Perspective';
import Texture from './Texture/Texture';
import Sphere from './Geometry/Sphere';
import Torus from './Geometry/Torus';
import Cube from './Geometry/Cube';
import Grid from './Geometry/Grid';
import doxas from './Core/doxas';

export default class GLTS {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    glDoxas = new doxas(this.gl);
    ProgramManager = new ProgramManager(this.gl);
    ShaderManager = new ShaderManager(this.gl);
    BufferManager = new BufferManager(this.gl);
    Scene = new Scene(this.gl);
    PerspectiveCamera = PerspectiveCamera;
    Texture = new Texture(this.gl);
    Sphere = Sphere;
    Torus = Torus;
    Cube = Cube;
    Grid = Grid;
}