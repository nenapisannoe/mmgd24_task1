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
    }

    get left() {
        return this.x - (this.s / 2)
    }

    intersects(otherTriangle) {
        const thisAABB = {
            left: this.left,
            right: this.left + this.s,
            top: this.y - this.s,
            bottom: this.y + this.s
        };

        const otherAABB = {
            left: otherTriangle.left,
            right: otherTriangle.left + otherTriangle.s,
            top: otherTriangle.y - otherTriangle.s,
            bottom: otherTriangle.y + otherTriangle.s
        };

        const horizontalOverlap = thisAABB.right > otherAABB.left && thisAABB.left < otherAABB.right;

        const verticalOverlap = thisAABB.bottom > otherAABB.top && thisAABB.top < otherAABB.bottom;

        return horizontalOverlap && verticalOverlap;
    }



}