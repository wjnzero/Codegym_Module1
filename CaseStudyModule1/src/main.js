
import {Stage} from "../entities/stage.js";
import {Player} from "../entities/fighters/player.js";
import {PlayerCom} from "../entities/fighters/playerCom.js";
//object screen
const gameView = {
  WIDTH: 384, HEIGHT:224,
};
//khai báo att load page
window.addEventListener("load",function (){
    const canvasGame=document.querySelector("canvas");
    const context=canvasGame.getContext('2d');

    canvasGame.width=gameView.WIDTH;
    canvasGame.height=gameView.HEIGHT;

    const player=new Player(80,110,1);
    const playerCom=new PlayerCom(200,145,-1);
    const stage=new Stage();

    let frameTime={
        previous:0,
        secondsPassed:0,
    };


    //hàm
    function frame(time) {
        window.requestAnimationFrame(frame);

        frameTime={
            secondsPassed: (time-frameTime.previous)/50,
            previous: time,
        };
        player.update(frameTime,context);
        playerCom.update(frameTime,context);

        stage.draw(context);
        player.draw(context);
        playerCom.draw(context);


    }
    //hàm frame gọi lại
    window.requestAnimationFrame(frame)

    console.log("ready for serv!!");
})