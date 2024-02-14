import Rectangle from "./rectangle";
import Circle from "./circle";

const canvasWidth = window.innerWidth; 
const canvasHeight = window.innerHeight; 

const canvas = document.getElementById("cnvs");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gameState = {rects:
        [new Rectangle(200,200,20,20, -1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, 1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, 1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0),
            new Rectangle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),20,20, -1, 0)
        ],
        circles:
            [
                new Circle(100,100,10, 1, 0),
                new Circle(200,100,10, -1, 0),
                new Circle(100,200,10, 1, 0),
                new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, 1, 0),
                new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, -1, 0),
                new Circle(getRandomInt(0, canvasWidth),getRandomInt(0, canvasHeight),10, -1, 0)
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

    function drawCircle(circle, color) {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }

    

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)

    // draw
    gameState.rects.forEach(r=>{
        drawRectangle(r, "Black")
    })

    gameState.circles.forEach(c=>{
        drawCircle(c, "Blue")
    })


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

        gameState.rects.forEach(otherRect => {
            if(r!= otherRect && r.intersects(otherRect))
            {
                r.vx *= -1;
                r.vy *= -1;
                otherRect.vx *= -1;
                otherRect.vy *= -1;
            }
        }) 
        
        gameState.circles.forEach(circle => {
            if(r.intersectsCircle(circle))
            {
                r.vx *= -1;
                r.vy *= -1;
                circle.vx *= -1;
                circle.vy *= -1;
            }
        }) 

    })

    gameState.circles.forEach(c=>{
        c.x += c.vx
        c.y += c.vy
            
        
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
                otherCircle.vx *= -1;
                otherCircle.vy *= -1;
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
