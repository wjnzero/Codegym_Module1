
export class Fighter {
    constructor(name,x,y,vanToc) {
        this.name=name;
        this.image=new Image();
        this.position={x,y};
        this.vanToc=vanToc;
    }
    update(context){
        this.position.x+=this.vanToc;
//logic move
        if (this.position.x>context.canvas.width-this.image.width||this.position.x<0){
            this.vanToc=-this.vanToc;
        }
    }
    draw(context){
            context.drawImage(this.image,this.position.x,this.position.y);
        }
    // move(){
    //
    // }
    // specialMove(){
    //
    // }
}
