import glManager from './Manager';
import glGeometry from './Geometry';
import doxas from './doxas';

export default class GLTS {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    init = new glManager(this.gl).init;
    getAttributes = new glManager(this.gl).getAttributes;
    getUniforms = new glManager(this.gl).getUniforms;
    setUniforms = new glManager(this.gl).setUniforms;
    Sphere = new glGeometry().Sphere;
    doxas = new doxas(this.gl);
}