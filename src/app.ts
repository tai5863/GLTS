import GLTS from './init';

window.onload = () => {
    const canvas : HTMLCanvasElement = document.createElement('canvas');
    const gl : WebGLRenderingContext | null = canvas.getContext('webgl');
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, false);

    if (gl == null) {
        console.log('webgl not available');
        return;
    }

    let glts = new GLTS(gl);
    let prg = glts.program.init('vs', 'fs');

    let attLocation = glts.attribute.setLocation(prg, ['position', 'normal', 'color']);
    let attStride = glts.attribute.setStrides(prg, [3, 3, 4]);

    console.log('success!');
};