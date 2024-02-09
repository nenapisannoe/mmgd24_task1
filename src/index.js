import Rectangle from "./rectangle";

const canvasWidth = window.innerWidth; 
const canvasHeight = window.innerHeight; 

const canvas = document.getElementById("cnvs");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rect = new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, 1, 0);

const gameState = {rects:
        [new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, 1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0)
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

    function drawRectangle(rect, color) {
        context.beginPath();
        context.rect(rect.x, rect.y, rect.w, rect.h);
        context.fillStyle = color;
        context.fill();
    }

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw
    gameState.rects.forEach(r=>{
        drawRectangle(r, "BLack")
    })

    drawRectangle(rect, "Green");

}

function update(tick) {

    gameState.rects.forEach(r=>{
        r.x += r.vx
        r.y += r.vy
            
        
        if (r.x <= 0 || r.x + r.w >= canvasWidth) {
            r.vx *= -1; 
        }

        if (r.y <= 0 || r.y + r.h >= canvasHeight) {
            r.vy *= -1; 
        }

    })


    rect.x += rect.vx
    rect.y += rect.vy

    if (rect.x <= 0 || rect.x + rect.w >= canvasWidth) {
        rect.vx *= -1; 
    }

    if (rect.y <= 0 || rect.y + rect.h >= canvasHeight) {
        rect.vy *= -1; 
    }

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
