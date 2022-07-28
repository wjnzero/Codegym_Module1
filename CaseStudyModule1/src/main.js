import {drawBackground} from "./stage.js";
import {drawPlayer, updatePlayer} from "./player.js";
import {drawPlayerCom,updatePlayerCom} from "./playerCom.js";
//object screen
const gameView = {
  WIDTH: 384, HEIGHT:224,
};
//khai báo att load page
window.onload = function (){
    //lấy element canvas access environment vẽ 2d
    const canvasGame=document.querySelector("canvas");
    const context=canvasGame.getContext('2d');

    canvasGame.width=384;
    canvasGame.height=224;

    //hàm
    function frame() {
        updatePlayer(context);
        updatePlayerCom(context)
        drawBackground(context);
        drawPlayer(context);
        drawPlayerCom(context);
        // context.clearRect(0,0,gameView.WIDTH,gameView.HEIGHT);
        // context.strokeStyle="white";
        // context.moveTo(0,0);
        // context.lineTo(gameView.WIDTH, gameView.HEIGHT);
        // context.moveTo(gameView.WIDTH,0);
        // context.lineTo(0,gameView.HEIGHT);
        // context.stroke();
        window.requestAnimationFrame(frame);
    }
    //hàm frame gọi lại
    window.requestAnimationFrame(frame)


    console.log("ready for serv!!");
}