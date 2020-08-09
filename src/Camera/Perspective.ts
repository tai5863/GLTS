import matIV from '../utils/minMatrix';

class PerspectiveCamera {
    constructor(private position : number[], private angle : number, private aspect : number, private near : number, private far : number){}
    
    public update() : Float32Array {

        let m = new matIV();
        
        let vMatrix = m.init();
        let pMatrix  = m.init();
        let tmpMatrix = m.init();
        
        m.lookAt(this.position, [0, 0, 0], [0, 1, 0], vMatrix);
        m.perspective(this.angle, this.aspect, this.near, this.far, pMatrix);
        m.multiply(pMatrix, vMatrix, tmpMatrix);
        
        return tmpMatrix;
    }
}

export default PerspectiveCamera;