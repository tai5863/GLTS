import {glManager, glAttribute, glUniform, glBuffer} from './Manager';
import glGeometry from './Geometry';
import doxas from './doxas';

export default class GLTS {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    glDoxas = new doxas(this.gl);
    init = new glManager(this.gl).init;
    glAttribute = new glAttribute(this.gl);
    glUniform = new glUniform(this.gl);
    glBuffer = new glBuffer(this.gl);
    Sphere = new glGeometry().Sphere;
}