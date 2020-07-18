import {programManager, attributeManager, uniformManager} from './Managers';

export default class GLTS {
    constructor(private gl : WebGLRenderingContext | WebGL2RenderingContext){}

    program = new programManager(this.gl);
    attribute = new attributeManager(this.gl);
    uniform = new uniformManager(this.gl);
}