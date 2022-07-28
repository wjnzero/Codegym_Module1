//img reference
const ken=document.querySelector('img[alt="ken"]');
//vị trí hero
const position = {
    x: 80,
    y:110,
};
let vanToc=1;
export function updatePlayer(context) {
    position.x+=vanToc;
//logic di chuyen
    if (position.x>context.canvas.width-ken.width||position.x<0){
        vanToc=-vanToc;
    }
}
//draw
export function drawPlayer(context) {
    context.drawImage(ken,position.x,position.y);
}
