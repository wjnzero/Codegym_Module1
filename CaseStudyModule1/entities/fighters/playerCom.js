import { Fighter } from "./fighter.js";

export class PlayerCom extends Fighter{
    constructor(x,y,vanToc) {
        super("playerCom",x,y,vanToc);
        this.image=document.querySelector('img[alt="rock"]');
        this.frames=new Map([
            ['forwards-1',[74,23,70,50]],
            ['forwards-2',[4,23,70,70]],
            ['forwards-3',[230,25,69,50]],
            ['forwards-4',[298,20,50,50]],
            ['forwards-5',[348,20,60,50]],
            ['forwards-6',[612,113,11,50]],
        ]);
    }
}