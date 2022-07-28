import {Stage} from "../entities/stage.js";
import {Player} from "../entities/fighters/player.js";
import {PlayerCom} from "../entities/fighters/playerCom.js";
//object screen
const gameView = {
  WIDTH: 384, HEIGHT:224,
};
//khai báo att load page
window.onload = function (){
    const canvasGame=document.querySelector("canvas");
    const context=canvasGame.getContext('2d');

    canvasGame.width=gameView.WIDTH;
    canvasGame.height=gameView.HEIGHT;

    const player=new Player(80,110,1);
    const playerCom=new PlayerCom(80,110,-1);
    const stage=new Stage();

    //hàm
    function frame() {
        player.update(context);
        playerCom.update(context)

        stage.draw(context);
        player.draw(context);
        playerCom.draw(context);

        window.requestAnimationFrame(frame);
    }
    //hàm frame gọi lại
    window.requestAnimationFrame(frame)

    console.log("ready for serv!!");
}