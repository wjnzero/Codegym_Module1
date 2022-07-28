import { Fighter } from "./fighter";

export class Player extends Fighter{
    constructor(x,y,vanToc) {
        super("player",x,y,vanToc);

        this.image=document.querySelector('img[alt="ken"]');
    }
}


