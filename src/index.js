import Rectangle from "./rectangle";
import Circle from "./circle";
import Triangle from "./triangle";
import Pentagon from "./pentagon";

const canvasWidth = window.innerWidth; 
const canvasHeight = window.innerHeight; 

const canvas = document.getElementById("cnvs");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gameState = {triangles:
    [
        new Triangle(10, 100,200, -1, 0),
        new Triangle(10, getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight), -1, 0),
        new Triangle(10, getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight), -1, 0),
        new Triangle(10, getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight), 1, 0),
        new Triangle(10, getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight), 1, 0)
    ],
    circles:
    [
        new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, 1, 0),
        new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, -1, 0),
        new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, 1, 0),
        new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, 1, 0),
        new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, -1, 0),
        new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, -1, 0)
    ],
    pentagones:
    [
        new Pentagon(10,100,100, 1, 0),
        new Pentagon(10,getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight), -1, 0),
        new Pentagon(10,getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight), -1, 0),
        new Pentagon(10,getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight), 1, 0)
    ]
};

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}



function draw(tFrame) {
    const context = canvas.getContext('2d');


    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw

    gameState.circles.forEach(c=>{
        c.draw(context)
    })

    gameState.triangles.forEach(t=>{
        t.draw(context)
    })

    gameState.pentagones.forEach(p=>{
        p.draw(context)
    })



}

function update(tick) {


    gameState.circles.forEach(c=>{
        c.x += c.vx;
        c.y += c.vy;

        if (c.x <= 0 || c.x + c.r >= canvasWidth) {
            c.vx *= -1; 
        }

        if (c.y <= 0 || c.y + c.r >= canvasHeight) {
            c.vy *= -1; 
        }

        gameState.circles.forEach(otherCircle => {
            if(c!= otherCircle && c.intersects(otherCircle))
            {
                c.vx *= -1;
                c.vy *= -1;
                c.hits+=1;
                c.newColor();
                otherCircle.vx *= -1;
                otherCircle.vy *= -1;
                otherCircle.hits +=1;
                otherCircle.newColor();

            }
        }) 

    })



    gameState.triangles.forEach(t=>{
        t.x += t.vx
        t.y += t.vy

        if (t.x <= 0 || t.x + t.s >= canvasWidth) {
            t.vx *= -1; 
        }

        if (t.y <= 0 || t.y + t.s >= canvasHeight) {
            t.vy *= -1; 
        }

        gameState.triangles.forEach(otherTriangle => {
            if(t!= otherTriangle && t.intersects(otherTriangle))
            {
                t.vx *= -1;
                t.vy *= -1;
                t.hits+=1;
                t.newColor();
                otherTriangle.vx *= -1;
                otherTriangle.vy *= -1;
                otherTriangle.hits +=1;
                otherTriangle.newColor();

            }
        }) 
    })

    gameState.pentagones.forEach(p=>{
        p.x += p.vx
        p.y += p.vy

        if (p.left <= 0 || p.right >= canvasWidth) {
            p.vx *= -1; 
        }

        if (p.y <= 0 || p.y + p.s >= canvasHeight) {
            p.vy *= -1; 
        } 

        gameState.pentagones.forEach(otherPentagon => {
            if(p!= otherPentagon && p.intersects(otherPentagon))
            {
                p.vx *= -1;
                p.vy *= -1;
                p.hits+=1;
                p.newColor();

                otherPentagon.vx *= -1;
                otherPentagon.vy *= -1;
                otherPentagon.hits +=1;
                otherPentagon.newColor();

            }
        }) 

        gameState.triangles.forEach(triangle => {
            if(p.intersects(triangle))
            {
                p.vx *= -1;
                p.vy *= -1;
                p.hits+=1;
                p.newColor();
                
                triangle.vx *= -1;
                triangle.vy *= -1;
                triangle.hits +=1;
                triangle.newColor();

            }
        }) 
 
    })


}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms

}

setup();
run();
