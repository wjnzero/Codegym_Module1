//img reference
const rock=document.querySelector('img[alt="rock"]');
//vị trí hero
const position = {
    x: 80,
    y:110,
};
let vanToc=-1;
export function updatePlayerCom(context) {
    position.x+=vanToc;
//logic move
    if (position.x>context.canvas.width-rock.width||position.x<0){
        vanToc=-vanToc;
    }
}
//draw
export function drawPlayerCom(context) {
    context.drawImage(rock,position.x,position.y);
}
