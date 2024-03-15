export default class Triangle {
    constructor(s, x, y, vx, vy) {
        this.s = s
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.hits = 0
        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    }

    draw(context)
    {

        if(this.hits >= 3)
        return;


        const vertex1X = this.x;       
        const vertex1Y = this.y - this.s;  
        const vertex2X = this.x - this.s; 
        const vertex2Y = this.y + this.s;  
        const vertex3X = this.x + this.s;  
        const vertex3Y = this.y + this.s;  

        context.beginPath();
        
        context.moveTo(vertex1X, vertex1Y);
        
        context.lineTo(vertex2X, vertex2Y);
        context.lineTo(vertex3X, vertex3Y);
        
        context.fillStyle = this.color;
        context.fill();

         const thisAABB = {
            left: this.left,
            right: this.right,
            top: this.y - this.s,
            bottom: this.y + this.s
        };

        context.strokeStyle = 'red'; 
        context.strokeRect(thisAABB.left, thisAABB.top, thisAABB.right - thisAABB.left, thisAABB.bottom - thisAABB.top); 

    }

    get left() {
        return this.x - this.s
    }

    get right() {
        return this.x + this.s
    }

    intersects(otherTriangle) {
        const thisAABB = {
            left: this.left,
            right: this.right,
            top: this.y - this.s,
            bottom: this.y + this.s
        };

        const otherAABB = {
            left: otherTriangle.left,
            right: otherTriangle.right,
            top: otherTriangle.y - otherTriangle.s,
            bottom: otherTriangle.y + otherTriangle.s
        };

        const horizontalOverlap = thisAABB.right > otherAABB.left && thisAABB.left < otherAABB.right;

        const verticalOverlap = thisAABB.bottom > otherAABB.top && thisAABB.top < otherAABB.bottom;

        return horizontalOverlap && verticalOverlap;
    }



}