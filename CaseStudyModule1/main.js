const canvas = document.querySelector(`canvas`);
const c = canvas.getContext(`2d`);

// canvas.width=1024;
// canvas.height=576;
canvas.width=1364;
canvas.height=644;

c.fillRect(0,0, canvas.width, canvas.height);

const gravity = 1;
const hang=document.querySelector('img[alt="hang"]');
const thuong=document.querySelector('img[alt="thuong"]');
const hangDown=document.querySelector('img[alt="hangDown"]');
const thuongDown=document.querySelector('img[alt="thuongDown"]');
const punch=document.querySelector('img[alt="punch"]');
const kick=document.querySelector('img[alt="kick"]');

class Stage{
    image;
    constructor() {
        this.image=document.querySelector('img[alt="background"]');
    }
    draw(context){
        context.drawImage(this.image,0,0);
    }
}

class CreatNew {
    position;
    speed;
    height;
    width;
    lastKey;
    atkBox;
    color;
    attacking;
    health;
    image;
    atkImg;
    constructor({position,speed, color=`red`,offset,image,atkImg}) {
        this.image=image;
        this.atkImg=atkImg;
        this.position = position;
        this.speed = speed;
        this.width=100;
        this.height=350;
        this.lastKey="";
        this.atkBox={
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        };
        this.color=color;
        this.attacking="";
        this.health=100;//a
    }

    draw(){
        c.drawImage(this.image,this.position.x, this.position.y, this.width, this.height);
        //atkBox
        if (this.attacking){
               c.drawImage(this.atkImg,this.atkBox.position.x, this.atkBox.position.y+150, this.atkBox.width, this.atkBox.height);
        }
    }

    update(){
        this.draw();

        this.atkBox.position.x = this.position.x + this.atkBox.offset.x;
        this.atkBox.position.y = this.position.y;

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.y + this.height + this.speed.y >= canvas.height){
            this.speed.y = 0;
        }
        else this.speed.y+=gravity;
    }

    attack(){
        this.attacking = true;
        setTimeout(() => {
            this.attacking = false;
        },100)
    }
}

const player = new CreatNew({
    position: {
        x: 0,
        y: 0
    },
    speed: {
        x: 0,
        y: 0
    },
    color: `white`,
    offset: {
        x: 0,
        y: 0
    },
    image: hang,
    atkImg: punch
});

const enemy= new CreatNew({
    position: {
        x: 1200,
        y: 0
    },
    speed: {
        x: 0,
        y: 0
    },
    color:`brown`,
    offset: {
        x: -50,
        y: 0
    },
    image: thuong,
    atkImg: kick
});

// console.log(player);

const keys = {
    a: {
        pressed : false
    },
    d: {
        pressed : false
    },
    ArrowLeft:{
        pressed : false
    },
    ArrowRight:{
        pressed : false
    },
}


function rectangularCollusion({rectangle1, rectangle2}) {
    return (
        rectangle1.atkBox.position.x + rectangle1.atkBox.width >= rectangle2.position.x
        && rectangle1.atkBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.atkBox.position.y + rectangle1.atkBox.height >= rectangle2.position.y
        && rectangle1.atkBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function winner({player, enemy, timerId}) {
    clearTimeout(timerId);
    document.querySelector(`#draw`).style.display = `flex`;
    if (player.health===enemy.health){
        document.querySelector(`#draw`).innerHTML = `DRAW`;
    }
    else if (player.health > enemy.health){
        document.querySelector(`#draw`).innerHTML = `Player 1 Win`;
        enemy.image = thuongDown;
    }
    else if (player.health < enemy.health){
        document.querySelector(`#draw`).innerHTML = `Player 2 Win`;
        player.image = hangDown;
    }
}

let timer =60;
let timerId;
function decreaseTimer() {
    if (timer > 0){
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector(`#timer`).innerHTML = timer.toString();
    }

    if (timer===0){
        winner({player, enemy, timerId});
    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    // console.log(enemy.position.x);
    const stage = new Stage();
    c.fillStyle = `black`;
    c.fillRect(0,0, canvas.width, canvas.height);
    stage.draw(c);
    player.update();
    enemy.update();

    player.speed.x = 0;
    enemy.speed.x = 0;

    // playerMove
    if (keys.a.pressed && player.lastKey === `a`){
        player.speed.x = -10;
        if (player.position.x<0){
            player.speed.x = 0;
        }

    } else if (keys.d.pressed && player.lastKey === `d`){
        player.speed.x = 10;
        if (player.position.x>canvas.width-80){
            player.speed.x = 0;
        }
    }
    // enemyMove
    if (keys.ArrowLeft.pressed && enemy.lastKey === `ArrowLeft`){
        enemy.speed.x = -4;
        if (enemy.position.x+20<0){
            enemy.speed.x = 0;
        }

    } else if (keys.ArrowRight.pressed && enemy.lastKey === `ArrowRight`){
        enemy.speed.x = 4;
        if (enemy.position.x>canvas.width-100){
            enemy.speed.x = 0;
        }
    }
    // hit box
        //player
    if (
        rectangularCollusion({
            rectangle1: player,
            rectangle2: enemy
        }) && player.attacking){
        player.attacking = false;
        enemy.health -= 1;
        document.querySelector(`#enemyHealth`).style.width = enemy.health + "%";
    }
        //enemy
    if (
        rectangularCollusion({
            rectangle1: enemy,
            rectangle2: player
        }) && enemy.attacking){
        enemy.attacking = false;
        player.health -= 50;
        player.position.x = 0;
        player.position.y = 0;
        document.querySelector(`#playerHealth`).style.width = player.health + "%";
    }
    //break
    if (enemy.health<=0 || player.health <= 0){
        winner({player, enemy,timerId});
    }
    // window.requestAnimationFrame(animate);
}

animate();

window.addEventListener(`keydown`,(event) =>{
     // console.log(event.key);
    switch (event.key) {
        // playerKey
        case `d`:
            keys.d.pressed = true;
            player.lastKey = `d`;
            break;
        case `a`:
            keys.a.pressed = true;
            player.lastKey = `a`;
            break;
        case `w`:
            if (player.position.y+50 < 0){
                player.speed.y = 0
            }
            else player.speed.y = -20;
            break;
        case ` `:
            player.attack();
            player.atkBox.width+=10;
            break;

        // enemyKey

        case `ArrowRight`:
            keys.ArrowRight.pressed = true;
            enemy.lastKey = `ArrowRight`;
            break;
        case `ArrowLeft`:
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = `ArrowLeft`;
            break;
        case `ArrowUp`:
            if (enemy.position.y+50 < 0){
                enemy.speed.y = 0
            }
            else enemy.speed.y = -10;

            break;
        case `Control`:
            enemy.attack();
            //
            // enemy.speed.x=-50;

            break;
    }
});

window.addEventListener(`keyup`,(event) =>{
    switch (event.key) {
        // playerKey
        case `d`:
            keys.d.pressed = false;
            break;
        case `a`:
            keys.a.pressed = false;
            break;
    }

    // enemyKey

    switch (event.key) {
        // playerKey
        case `ArrowRight`:
            keys.ArrowRight.pressed = false;
            enemy.lastKey = `ArrowRight`;
            break;
        case `ArrowLeft`:
            keys.ArrowLeft.pressed = false;
            enemy.lastKey = `ArrowLeft`;
            break;
        case `ArrowUp`:
            enemy.speed.y = -10;
            break;
    }
});
