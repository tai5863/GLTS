import {prgManager, attribManager, uniformManager, bufferManager} from './Manager/glManager';
import Sphere from './Geometry/Sphere';
import Torus from './Geometry/Torus';
import Cube from './Geometry/Cube';
import doxas from './Manager/doxas';

export default class GLTS {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    glDoxas = new doxas(this.gl);
    init = new prgManager(this.gl).init;
    Attribute = new attribManager(this.gl);
    Uniform = new uniformManager(this.gl);
    Buffer = new bufferManager(this.gl);
    Sphere = new Sphere();
    Torus = new Torus();
    Cube = new Cube();
}