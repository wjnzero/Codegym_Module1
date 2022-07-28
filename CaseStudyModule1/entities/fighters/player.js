import { Fighter } from "./fighter.js";

export class Player extends Fighter{
    constructor(x,y,vanToc) {
        super("player",x,y,vanToc);

        this.image=document.querySelector('img[alt="ken"]');
        this.frames=new Map([
            ['forwards-1',[204,16,48,85]],
            ['forwards-2',[249,16,50,83]],
            ['forwards-3',[295,16,55,83]],
            ['forwards-4',[344,16,53,83]],
            ['forwards-5',[394,16,52,83]],
            ['forwards-6',[451,16,43,80]],
        ]);

    }
}


